import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return responseHandler.success(res, MESSAGES.ORDER.FETCH_ALL, orders);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
