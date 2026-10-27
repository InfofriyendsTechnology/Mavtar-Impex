import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id },
    });
    return responseHandler.success(res, MESSAGES.CATEGORY.DELETED, { id });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
