import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, organization, quantity, bagType, message } =
      req.body;

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email: email || "",
        phone,
        organization: organization || "",
        quantity: quantity || "1-50",
        bagType: bagType || "Royal Heritage Tote",
        message,
        status: "PENDING",
      },
    });

    return responseHandler.created(res, MESSAGES.INQUIRY.CREATED, inquiry);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
