import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id }, { orderNumber: id }],
      },
    });

    if (!order) {
      return responseHandler.notFound(res, MESSAGES.ORDER.NOT_FOUND);
    }

    return responseHandler.success(res, MESSAGES.ORDER.FETCH_ONE, order);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
