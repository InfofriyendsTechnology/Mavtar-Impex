import { db } from "../data/db.js";
import responseHandler from "../utils/responseHandler.js";

export const getDashboardAnalytics = async (req, res) => {
  try {
    const products = await db.getProducts();
    const orders = await db.getOrders();
    const inquiries = await db.getInquiries();

    let totalRevenue = 0;
    let pendingOrdersCount = 0;
    let deliveredOrdersCount = 0;

    for (const ord of orders) {
      if (ord.orderStatus !== "CANCELLED") {
        totalRevenue += Number(ord.totalAmount) || 0;
      }
      if (ord.orderStatus === "CONFIRMED" || ord.orderStatus === "IN_PRODUCTION") {
        pendingOrdersCount++;
      }
      if (ord.orderStatus === "DELIVERED") {
        deliveredOrdersCount++;
      }
    }

    const recentOrders = orders.slice(0, 5);
    const pendingInquiriesCount = inquiries.filter((i) => i.status === "NEW").length;

    return responseHandler.success(res, "Analytics data retrieved", {
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        pendingOrdersCount,
        deliveredOrdersCount,
        totalProducts: products.length,
        totalInquiries: inquiries.length,
        pendingInquiriesCount,
      },
      recentOrders,
      lowStockProducts: products.filter((p) => p.stock < 15),
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
