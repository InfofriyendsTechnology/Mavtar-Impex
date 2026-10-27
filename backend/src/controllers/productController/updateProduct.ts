import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return responseHandler.notFound(res, MESSAGES.PRODUCT.NOT_FOUND);
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...req.body,
        price: req.body.price !== undefined ? Number(req.body.price) : undefined,
        originalPrice:
          req.body.originalPrice !== undefined
            ? Number(req.body.originalPrice)
            : undefined,
        stock: req.body.stock !== undefined ? Number(req.body.stock) : undefined,
      },
    });

    return responseHandler.success(res, MESSAGES.PRODUCT.UPDATED, updated);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
