import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const getAllInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return responseHandler.success(res, MESSAGES.INQUIRY.FETCH_ALL, inquiries);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
