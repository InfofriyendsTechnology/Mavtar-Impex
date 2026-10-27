import { Router } from "express";
import {
  getDashboardStats,
  trackEvent,
  getAnalyticsEvents,
} from "../controllers/analyticsController";
import { authenticate } from "../middleware/auth";

const router = Router();

// Public event tracking endpoint
router.post("/track", trackEvent);

// Protected admin endpoints
router.get("/dashboard", authenticate, getDashboardStats);
router.get("/events", authenticate, getAnalyticsEvents);

export default router;
