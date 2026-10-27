import { Router } from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import orderRoutes from "./orderRoutes";
import inquiryRoutes from "./inquiryRoutes";
import analyticsRoutes from "./analyticsRoutes";
import bucketRoutes from "./bucketRoutes";
import uploadRoutes from "./uploadRoutes";
import settingsRoutes from "./settingsRoutes";

const router = Router();

// Modular domain routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);
router.use("/inquiries", inquiryRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/bucket", bucketRoutes);
router.use("/upload", uploadRoutes);
router.use("/settings", settingsRoutes);

export default router;
