import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalInquiries,
      recentOrders,
      lowStockProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.inquiry.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.findMany({
        where: { stock: { lte: 10 } },
        take: 5,
        orderBy: { stock: "asc" },
      }),
    ]);

    const orders = await prisma.order.findMany();
    const totalRevenue = orders.reduce(
      (sum, ord) => sum + (ord.totalAmount || 0),
      0
    );
    const pendingOrdersCount = orders.filter(
      (o) => o.orderStatus === "CONFIRMED" || o.orderStatus === "IN_PRODUCTION"
    ).length;
    const pendingInquiriesCount = await prisma.inquiry.count({
      where: { status: "PENDING" },
    });

    const statsObj = {
      totalProducts,
      totalOrders,
      pendingOrdersCount,
      totalInquiries,
      pendingInquiriesCount,
      totalRevenue,
    };

    return responseHandler.success(res, "Analytics fetched successfully", {
      ...statsObj,
      stats: statsObj,
      recentOrders,
      lowStockProducts,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
