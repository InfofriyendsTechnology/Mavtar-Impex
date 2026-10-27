import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const existing = await prisma.order.findUnique({
      where: { id },
    });

    if (!existing) {
      return responseHandler.notFound(res, MESSAGES.ORDER.NOT_FOUND);
    }

    const updatedSteps = Array.isArray(existing.trackingSteps)
      ? (existing.trackingSteps as any[]).map((step) => {
          if (step.status === orderStatus) {
            return { ...step, completed: true, time: new Date().toISOString() };
          }
          return step;
        })
      : existing.trackingSteps;

    const updated = await prisma.order.update({
      where: { id },
      data: {
        orderStatus: orderStatus || existing.orderStatus,
        paymentStatus: paymentStatus || existing.paymentStatus,
        trackingSteps: (updatedSteps || []) as any,
      },
    });

    return responseHandler.success(res, MESSAGES.ORDER.UPDATED, updated);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
