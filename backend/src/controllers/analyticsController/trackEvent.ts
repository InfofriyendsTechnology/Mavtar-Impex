import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";

export const trackEvent = async (req: Request, res: Response) => {
  try {
    const { type, target, metadata } = req.body;

    if (!type) {
      return responseHandler.badRequest(res, "Event type is required");
    }

    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.socket.remoteAddress ||
      "";
    const userAgent = (req.headers["user-agent"] as string) || "";

    const event = await prisma.analyticsEvent.create({
      data: {
        type: String(type).toUpperCase(),
        target: target ? String(target) : null,
        metadata: metadata || {},
        ip,
        userAgent,
      },
    });

    return responseHandler.success(res, "Event tracked successfully", {
      id: event.id,
      type: event.type,
      target: event.target,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
