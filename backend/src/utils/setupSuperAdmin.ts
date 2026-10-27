import bcrypt from "bcryptjs";
import prisma from "./prisma";

export const setupSuperAdmin = async () => {
  const mobile = process.env.SUPER_ADMIN_MOBILE || "9512753471";
  const rawPassword = process.env.SUPER_ADMIN_PASSWORD || "Mavtar#161026";
  const name = "Krish Vaghani (Super Admin)";
  const email = "contact@mavtarimpex.com";

  try {
    const existing = await prisma.user.findUnique({
      where: { mobile },
    });

    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    if (!existing) {
      await prisma.user.create({
        data: {
          mobile,
          name,
          email,
          password: hashedPassword,
          role: "SUPER_ADMIN",
        },
      });
      console.log(`[SuperAdmin] Initialized super admin account: ${mobile}`);
    } else {
      await prisma.user.update({
        where: { mobile },
        data: {
          password: hashedPassword,
          role: "SUPER_ADMIN",
        },
      });
      console.log(`[SuperAdmin] Verified super admin account: ${mobile}`);
    }
  } catch (err: any) {
    console.warn("[SuperAdmin] Notice during setup:", err.message);
  }
};
