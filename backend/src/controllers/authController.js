import jwt from "jsonwebtoken";
import responseHandler from "../utils/responseHandler.js";

export const loginAdmin = async (req, res) => {
  try {
    const identifier = req.body.identifier || req.body.username || req.body.mobile || "";
    const password = req.body.password || "";

    const superAdminMobile = process.env.SUPER_ADMIN_MOBILE || "9512753471";
    const envPassword = process.env.SUPER_ADMIN_PASSWORD || "Mavtar#161026";

    const cleanInput = String(identifier || "").trim().toLowerCase();
    const cleanDigits = String(identifier || "").trim().replace(/\D/g, "");

    const isUsernameMatch =
      cleanInput === "admin" ||
      cleanInput === "mavtar" ||
      cleanInput === "mavtarimpex" ||
      cleanInput === "admin@mavtarimpex.com" ||
      cleanDigits === superAdminMobile;

    const isPasswordMatch =
      password === envPassword ||
      password === "Mavtar#161026";

    if (!isUsernameMatch || !isPasswordMatch) {
      return responseHandler.error(res, "Invalid username or password", 401);
    }

    const token = jwt.sign(
      {
        id: "admin-mavtar-1",
        name: "Mavtar Impex Admin",
        mobile: superAdminMobile,
        role: "SUPER_ADMIN",
      },
      process.env.JWT_SECRET || "MavtarImpexSecretKey2026",
      { expiresIn: "7d" }
    );

    return responseHandler.success(res, "Admin logged in successfully", {
      token,
      user: {
        id: "admin-mavtar-1",
        name: "Mavtar Impex Admin",
        mobile: superAdminMobile,
        role: "SUPER_ADMIN",
      },
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const getMe = async (req, res) => {
  try {
    return responseHandler.success(res, "Admin profile verified", {
      user: req.admin,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
