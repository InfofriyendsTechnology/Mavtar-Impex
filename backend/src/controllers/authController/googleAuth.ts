import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { credential, email: directEmail, name: directName, googleId: directGoogleId, avatar: directAvatar } = req.body;

    let email = directEmail;
    let name = directName;
    let googleId = directGoogleId;
    let avatar = directAvatar;

    // If client sent Google Identity Services JWT credential string
    if (credential && typeof credential === "string") {
      try {
        const parts = credential.split(".");
        if (parts.length === 3) {
          const payloadJson = Buffer.from(parts[1], "base64").toString("utf-8");
          const payload = JSON.parse(payloadJson);
          email = payload.email || email;
          name = payload.name || name || "Valued Patron";
          googleId = payload.sub || googleId;
          avatar = payload.picture || avatar;
        }
      } catch (decodeErr) {
        console.warn("Could not parse Google credential JWT payload:", decodeErr);
      }
    }

    if (!email && !googleId) {
      return responseHandler.badRequest(res, "Valid Google profile or credential is required");
    }

    const sanitizedEmail = email ? String(email).toLowerCase().trim() : null;
    const sanitizedGoogleId = googleId ? String(googleId).trim() : null;

    // Find existing user by googleId or email
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(sanitizedGoogleId ? [{ googleId: sanitizedGoogleId }] : []),
          ...(sanitizedEmail ? [{ email: sanitizedEmail }] : []),
        ],
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || "Valued Patron",
          email: sanitizedEmail,
          googleId: sanitizedGoogleId,
          avatar: avatar || null,
          profilePic: avatar || null,
          role: "CUSTOMER",
          authProvider: "GOOGLE",
        },
      });
    } else {
      // Update googleId and avatar if not present
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: user.googleId || sanitizedGoogleId,
          avatar: user.avatar || avatar,
          profilePic: user.profilePic || avatar,
          authProvider: user.authProvider || "GOOGLE",
        },
      });
    }

    // Log the analytics login event
    try {
      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "";
      const userAgent = (req.headers["user-agent"] as string) || "";
      await prisma.analyticsEvent.create({
        data: {
          type: "GOOGLE_LOGIN",
          target: user.email || user.id,
          metadata: { userId: user.id, name: user.name, provider: "google" },
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

    return responseHandler.success(res, "Google authentication successful", {
      token,
      user: userPayload,
      ...userPayload,
    });
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
