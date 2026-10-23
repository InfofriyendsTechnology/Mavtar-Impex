import express from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Global Root & Health Checks
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    company: "Mavtar Impex",
    service: "Luxury Linen Bags E-Commerce & Admin API",
    version: "1.0.0",
    docs: "/api/v1/health",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    company: "Mavtar Impex",
    service: "E-Commerce & Admin API",
    time: new Date().toISOString(),
  });
});

// Mount Central Modular Routes (/api and /api/v1)
app.use("/api", rootRouter);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error occurred",
  });
});

export default app;
