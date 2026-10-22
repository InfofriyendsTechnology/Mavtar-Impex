import { db } from "../data/db.js";
import responseHandler from "../utils/responseHandler.js";

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      items,
      paymentMethod,
      notes,
    } = req.body;

    if (!customerName || !customerPhone || !addressLine1 || !city || !pincode || !items || items.length === 0) {
      return responseHandler.badRequest(res, "Please fill in all required shipping and product details");
    }

    const settings = await db.getSettings();
    let subtotal = 0;

    for (const item of items) {
      subtotal += (Number(item.price) || 0) * (Number(item.quantity) || 1);
    }

    const freeShippingMin = settings.freeShippingThreshold || 999;
    const shippingFee = subtotal >= freeShippingMin ? 0 : (settings.standardShippingFee || 99);
    const totalAmount = subtotal + shippingFee;

    const orderNumber = "MVT-" + Math.floor(100000 + Math.random() * 900000);
    const orderId = "ord_" + Date.now();

    const order = {
      id: orderId,
      orderNumber,
      customerName,
      customerEmail: customerEmail || "",
      customerPhone,
      shippingAddress: {
        addressLine1,
        addressLine2: addressLine2 || "",
        city,
        state: state || "Gujarat",
        pincode,
        country: "India",
      },
      items,
      subtotal,
      shippingFee,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: paymentMethod === "ONLINE_UPI" ? "PAID" : "PENDING_COD",
      orderStatus: "CONFIRMED",
      notes: notes || "",
      trackingSteps: [
        { status: "CONFIRMED", title: "Order Confirmed", time: new Date().toISOString(), completed: true },
        { status: "IN_PRODUCTION", title: "Embroidering & Handcrafted Assembly", time: null, completed: false },
        { status: "QUALITY_CHECK", title: "Quality & Packaging Inspection", time: null, completed: false },
        { status: "SHIPPED", title: "Dispatched via Express Courier", time: null, completed: false },
        { status: "DELIVERED", title: "Delivered to Customer", time: null, completed: false },
      ],
      createdAt: new Date().toISOString(),
    };

    await db.saveOrder(order);

    return responseHandler.created(res, "Order placed successfully! Thank you for choosing Mavtar Impex.", {
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      orderStatus: order.orderStatus,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await db.getOrders();
    const { status, search } = req.query;
    let filtered = [...orders];

    if (status && status !== "ALL") {
      filtered = filtered.filter((o) => o.orderStatus === status);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNumber?.toLowerCase().includes(q) ||
          o.customerName?.toLowerCase().includes(q) ||
          o.customerPhone?.includes(q)
      );
    }

    return responseHandler.success(res, "Orders retrieved successfully", filtered);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const trackOrder = async (req, res) => {
  try {
    const { identifier } = req.params;
    if (!identifier) {
      return responseHandler.badRequest(res, "Order Number or Mobile Number is required");
    }

    const order = await db.getOrderById(identifier);
    if (!order) {
      return responseHandler.notFound(res, "No order found with this Order ID or Mobile Number");
    }

    return responseHandler.success(res, "Order found", order);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, trackingNumber, paymentStatus, stepIndex } = req.body;

    const order = await db.getOrderById(id);
    if (!order) {
      return responseHandler.notFound(res, "Order not found");
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    if (stepIndex !== undefined && order.trackingSteps?.[stepIndex]) {
      order.trackingSteps[stepIndex].completed = true;
      order.trackingSteps[stepIndex].time = new Date().toISOString();
    }

    await db.saveOrder(order);
    return responseHandler.success(res, "Order status updated successfully", order);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
