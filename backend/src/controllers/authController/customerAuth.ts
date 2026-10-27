import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";

export const customerAuth = async (req: Request, res: Response) => {
  try {
    const { name, identifier, mobile, email, password } = req.body;
    const inputIdentifier = (identifier || mobile || email || "").toString().trim();

    if (!inputIdentifier) {
      return responseHandler.badRequest(res, "Mobile number or email is required");
    }

    const isEmail = inputIdentifier.includes("@");
    const sanitizedEmail = isEmail ? inputIdentifier.toLowerCase() : null;
    const sanitizedMobile = !isEmail ? inputIdentifier.replace(/\D/g, "").slice(-10) : null;

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(sanitizedMobile ? [{ mobile: sanitizedMobile }] : []),
          ...(sanitizedEmail ? [{ email: sanitizedEmail }] : []),
        ],
      },
    });

    if (!user) {
      // Create new customer account
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
      user = await prisma.user.create({
        data: {
          name: (name || "Valued Patron").trim(),
          mobile: sanitizedMobile,
          email: sanitizedEmail,
          password: hashedPassword,
          role: "CUSTOMER",
          authProvider: "LOCAL",
        },
      });
    } else {
      // If user already exists and provided password, verify if user has password
      if (password && user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return responseHandler.unauthorized(res, "Incorrect password");
        }
      }
      // If name provided and existing name was default, update it
      if (name && (!user.name || user.name === "Valued Patron")) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { name: name.trim() },
        });
      }
    }

    // Log the analytics login event
    try {
      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "";
      const userAgent = (req.headers["user-agent"] as string) || "";
      await prisma.analyticsEvent.create({
        data: {
          type: "CUSTOMER_LOGIN",
          target: user.mobile || user.email || user.id,
          metadata: { userId: user.id, name: user.name, provider: "local" },
          ip,
          userAgent,
        },
      });
    } catch (e) {
      console.warn("Analytics log failed:", e);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
      process.env.JWT_SECRET || "MavtarImpexSuperSecretKey2026",
      { expiresIn: "30d" }
    );

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      avatar: user.avatar || user.profilePic,
      authProvider: user.authProvider,
    };

    return responseHandler.success(res, `Welcome, ${user.name}!`, {
      token,
      user: userPayload,
      ...userPayload,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
