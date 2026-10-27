import { Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { AuthRequest } from "../../middleware/auth";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        mobile: true,
        email: true,
        role: true,
        profilePic: true,
        createdAt: true,
      },
    });

    if (!user) {
      return responseHandler.notFound(res, "User profile not found");
    }

    return responseHandler.success(res, "Profile retrieved", {
      user,
      ...user,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
