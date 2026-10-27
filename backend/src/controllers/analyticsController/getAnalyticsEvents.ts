import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";

export const getAnalyticsEvents = async (req: Request, res: Response) => {
  try {
    const [
      totalEvents,
      splashClicks,
      socialClicks,
      googleLogins,
      customerLogins,
      addToCartEvents,
      totalOrders,
      totalInquiries,
      orders,
      recentEvents,
    ] = await Promise.all([
      prisma.analyticsEvent.count(),
      prisma.analyticsEvent.count({ where: { type: "SPLASH_ENTER" } }),
      prisma.analyticsEvent.count({ where: { type: "SOCIAL_LINK_CLICK" } }),
      prisma.analyticsEvent.count({ where: { type: "GOOGLE_LOGIN" } }),
      prisma.analyticsEvent.count({ where: { type: "CUSTOMER_LOGIN" } }),
      prisma.analyticsEvent.count({ where: { type: "ADD_TO_CART" } }),
      prisma.order.count(),
      prisma.inquiry.count(),
      prisma.order.findMany({ select: { totalAmount: true, createdAt: true } }),
      prisma.analyticsEvent.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
    const totalLogins = googleLogins + customerLogins;

    // Social link breakdown by target (Instagram, WhatsApp, etc.)
    const socialBreakdown = await prisma.analyticsEvent.groupBy({
      by: ["target"],
      where: { type: "SOCIAL_LINK_CLICK" },
      _count: { id: true },
    });

    // 7-Day CRM Timeline computation
    const now = new Date();
    const timeline = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const startOfDay = new Date(d.setHours(0, 0, 0, 0));
      const endOfDay = new Date(d.setHours(23, 59, 59, 999));

      const [dayVisits, dayCarts] = await Promise.all([
        prisma.analyticsEvent.count({
          where: {
            type: "SPLASH_ENTER",
            createdAt: { gte: startOfDay, lte: endOfDay },
          },
        }),
        prisma.analyticsEvent.count({
          where: {
            type: "ADD_TO_CART",
            createdAt: { gte: startOfDay, lte: endOfDay },
          },
        }),
      ]);

      const dayOrders = orders.filter(
        (o) => new Date(o.createdAt) >= startOfDay && new Date(o.createdAt) <= endOfDay
      ).length;

      const dayName = startOfDay.toLocaleDateString("en-US", { weekday: "short" });
      timeline.push({
        date: startOfDay.toISOString().split("T")[0],
        day: dayName,
        visits: dayVisits || (i === 0 ? splashClicks : 0),
        carts: dayCarts || (i === 0 ? addToCartEvents : 0),
        orders: dayOrders || (i === 0 ? totalOrders : 0),
      });
    }

    // Top-down CRM Conversion Funnel Stages
    const topVisits = Math.max(splashClicks, totalEvents, 1);
    const topCarts = Math.max(addToCartEvents, 1);
    const topLeads = Math.max(totalInquiries + totalLogins, 1);
    const topOrders = Math.max(totalOrders, 1);

    const funnel = [
      {
        stage: "1. Storefront Visitors",
        count: splashClicks,
        percentage: 100,
        subtext: "Unique visitors who entered the storefront",
        color: "#18181B",
      },
      {
        stage: "2. Social & Link Touches",
        count: socialClicks,
        percentage: Math.round((socialClicks / topVisits) * 100) || 0,
        subtext: "Instagram & WhatsApp direct touches",
        color: "#3F3F46",
      },
      {
        stage: "3. High-Intent Cart Adds",
        count: addToCartEvents,
        percentage: Math.round((addToCartEvents / topVisits) * 100) || 0,
        subtext: "Patrons who added bag to shopping cart",
        color: "#52525B",
      },
      {
        stage: "4. Customer Inquiries & Leads",
        count: totalInquiries + totalLogins,
        percentage: Math.round(((totalInquiries + totalLogins) / topVisits) * 100) || 0,
        subtext: "Bespoke bulk requests and patron sign-ins",
        color: "#71717A",
      },
      {
        stage: "5. Confirmed Client Orders",
        count: totalOrders,
        percentage: Math.round((totalOrders / topVisits) * 100) || 0,
        subtext: `Orders placed • ₹${totalRevenue.toLocaleString()} Revenue`,
        color: "#18181B",
      },
    ];

    return responseHandler.success(res, "Analytics events and CRM pipeline fetched successfully", {
      summary: {
        totalEvents,
        splashClicks,
        socialClicks,
        googleLogins,
        customerLogins,
        totalLogins,
        addToCartEvents,
        totalOrders,
        totalRevenue,
      },
      funnel,
      timeline,
      socialBreakdown: socialBreakdown.map((item) => ({
        target: item.target || "unknown",
        clicks: item._count.id,
      })),
      recentEvents,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
