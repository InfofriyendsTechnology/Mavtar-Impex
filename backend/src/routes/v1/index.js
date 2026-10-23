import { Router } from "express";
import authRoutes from "../authRoutes.js";
import productRoutes from "../productRoutes.js";
import orderRoutes from "../orderRoutes.js";
import inquiryRoutes from "../inquiryRoutes.js";
import analyticsRoutes from "../analyticsRoutes.js";
import uploadRoutes from "../uploadRoutes.js";
import settingsRoutes from "../settingsRoutes.js";

const v1Router = Router();

// Health Check for v1
v1Router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    version: "v1",
    company: "Mavtar Impex",
    service: "E-Commerce & Executive Admin API",
    time: new Date().toISOString(),
  });
});

// Mount v1 Resource Routes
v1Router.use("/auth", authRoutes);
v1Router.use("/products", productRoutes);
v1Router.use("/orders", orderRoutes);
v1Router.use("/inquiries", inquiryRoutes);
v1Router.use("/analytics", analyticsRoutes);
v1Router.use("/upload", uploadRoutes);
v1Router.use("/settings", settingsRoutes);

export default v1Router;
