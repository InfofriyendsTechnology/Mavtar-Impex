import { PrismaClient } from "@prisma/client";

// Ensure DATABASE_URL always targets the mavtar schema in Neon PostgreSQL
const getDatabaseUrl = (): string => {
  let url = process.env.DATABASE_URL || "";
  if (!url) return url;

  if (!url.includes("schema=")) {
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}schema=mavtar`;
    process.env.DATABASE_URL = url;
  }
  return url;
};

const resolvedUrl = getDatabaseUrl();

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedUrl,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
