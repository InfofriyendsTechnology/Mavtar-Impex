import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
    });
    return responseHandler.success(res, MESSAGES.CATEGORY.FETCH_ALL, categories);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
