import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from "../controllers/orderController";
import { authenticate } from "../middleware/auth";
import validator from "../utils/validators";
import { createOrderSchema } from "../validations/order.validation";

const router = Router();

// Public checkout & tracking
router.post("/", validator({ body: createOrderSchema }), createOrder);
router.get("/:id", getOrderById);

// Protected Admin order management
router.get("/", authenticate, getAllOrders);
router.patch("/:id/status", authenticate, updateOrderStatus);
router.put("/:id/status", authenticate, updateOrderStatus);

export default router;
