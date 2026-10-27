import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return responseHandler.notFound(res, MESSAGES.PRODUCT.NOT_FOUND);
    }

    await prisma.product.delete({
      where: { id },
    });

    return responseHandler.success(res, MESSAGES.PRODUCT.DELETED, { id });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
