import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }, { sku: id }],
      },
    });

    if (!product) {
      return responseHandler.notFound(res, MESSAGES.PRODUCT.NOT_FOUND);
    }

    return responseHandler.success(res, MESSAGES.PRODUCT.FETCH_ONE, product);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
