import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rootRoutes from "./routes/index";
import responseHandler from "./utils/responseHandler";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

// Global Health Check
app.get("/api/health", (req, res) => {
  return responseHandler.success(res, "Mavtar Impex Backend API is running smoothly!", {
    version: "1.0.0",
    database: "Neon PostgreSQL (schema: mavtar)",
    cloud: "Cloudinary Active",
    time: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  return responseHandler.success(res, "Mavtar Impex Luxury Linen Bags API Server is active!");
});

// Central Routes Mount (both /api and /api/v1 supported)
app.use("/api/v1", rootRoutes);
app.use("/api", rootRoutes);

// 404 Handler
app.use((req, res) => {
  return responseHandler.notFound(res, `Route not found: ${req.method} ${req.originalUrl}`);
});

export default app;
