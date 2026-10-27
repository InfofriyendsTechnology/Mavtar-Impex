import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      paymentMethod,
      notes,
    } = req.body;

    const subtotal = items.reduce(
      (sum: number, item: any) => sum + Number(item.price) * Number(item.quantity),
      0
    );

    const shippingFee = subtotal >= 999 ? 0 : 99;
    const totalAmount = subtotal + shippingFee;

    const orderNumber = `MVT-${Math.floor(100000 + Math.random() * 900000)}`;

    const trackingSteps = [
      {
        status: "CONFIRMED",
        title: "Order Confirmed",
        time: new Date().toISOString(),
        completed: true,
      },
      {
        status: "IN_PRODUCTION",
        title: "Embroidering & Handcrafted Assembly",
        time: null,
        completed: false,
      },
      {
        status: "QUALITY_CHECK",
        title: "Quality & Packaging Inspection",
        time: null,
        completed: false,
      },
      {
        status: "SHIPPED",
        title: "Dispatched via Express Courier",
        time: null,
        completed: false,
      },
      {
        status: "DELIVERED",
        title: "Delivered to Customer",
        time: null,
        completed: false,
      },
    ];

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerEmail: customerEmail || "",
        customerPhone,
        shippingAddress,
        items,
        subtotal,
        shippingFee,
        totalAmount,
        paymentMethod: paymentMethod || "COD",
        paymentStatus: paymentMethod === "COD" ? "PENDING_COD" : "PAID",
        orderStatus: "CONFIRMED",
        trackingSteps,
        notes: notes || "",
      },
    });

    return responseHandler.created(res, MESSAGES.ORDER.CREATED, order);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
