import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

export const login = async (req: Request, res: Response) => {
  try {
    const input = (req.body.mobile || req.body.identifier || req.body.email || "").toString().trim();
    const { password } = req.body;

    if (!input || !password) {
      return responseHandler.badRequest(res, "Mobile/Username and password are required");
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { mobile: input },
          { email: { equals: input, mode: "insensitive" } },
          { name: { contains: input, mode: "insensitive" } },
        ],
      },
    });

    if (!user || !user.password) {
      return responseHandler.unauthorized(
        res,
        MESSAGES.AUTH.INVALID_CREDENTIALS
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseHandler.unauthorized(
        res,
        MESSAGES.AUTH.INVALID_CREDENTIALS
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        mobile: user.mobile,
        role: user.role,
      },
      process.env.JWT_SECRET || "MavtarImpexSuperSecretKey2026",
      { expiresIn: "7d" }
    );

    const userPayload = {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      role: user.role,
    };

    return responseHandler.success(res, MESSAGES.AUTH.LOGIN_SUCCESS, {
      token,
      user: userPayload,
      ...userPayload,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
