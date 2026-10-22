import { Router } from "express";
import { getDashboardAnalytics } from "../controllers/analyticsController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateAdmin, getDashboardAnalytics);

export default router;
