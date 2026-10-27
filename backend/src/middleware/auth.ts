import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import responseHandler from "../utils/responseHandler";
import { MESSAGES } from "../utils/messages";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    mobile: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return responseHandler.unauthorized(res, MESSAGES.AUTH.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "MavtarImpexSuperSecretKey2026"
    ) as any;

    req.user = {
      id: decoded.id,
      mobile: decoded.mobile,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return responseHandler.unauthorized(res, MESSAGES.AUTH.UNAUTHORIZED);
  }
};

export const requireSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "SUPER_ADMIN") {
    return responseHandler.forbidden(res, MESSAGES.AUTH.FORBIDDEN);
  }
  next();
};
