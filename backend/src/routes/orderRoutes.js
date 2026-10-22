import { Router } from "express";
import {
  createOrder,
  getOrders,
  trackOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", createOrder);
router.get("/track/:identifier", trackOrder);
router.get("/", authenticateAdmin, getOrders);
router.put("/:id/status", authenticateAdmin, updateOrderStatus);

export default router;
