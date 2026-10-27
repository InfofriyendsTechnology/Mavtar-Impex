import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    return responseHandler.success(res, MESSAGES.INQUIRY.UPDATED, updated);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
