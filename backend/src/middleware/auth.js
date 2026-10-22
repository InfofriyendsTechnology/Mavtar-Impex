import jwt from "jsonwebtoken";
import responseHandler from "../utils/responseHandler.js";

export const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return responseHandler.unauthorized(res, "Admin authentication required");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "MavtarImpexSecretKey2026"
    );

    req.admin = decoded;
    next();
  } catch (error) {
    return responseHandler.unauthorized(res, "Invalid or expired token");
  }
};
