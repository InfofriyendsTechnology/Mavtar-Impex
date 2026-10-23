import { Router } from "express";
import v1Router from "./v1/index.js";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";
import inquiryRoutes from "./inquiryRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import settingsRoutes from "./settingsRoutes.js";

const rootRouter = Router();

// Versioned Route: /api/v1/*
rootRouter.use("/v1", v1Router);

// Backward-Compatible Direct Routes: /api/*
rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/orders", orderRoutes);
rootRouter.use("/inquiries", inquiryRoutes);
rootRouter.use("/analytics", analyticsRoutes);
rootRouter.use("/upload", uploadRoutes);
rootRouter.use("/settings", settingsRoutes);

export default rootRouter;
