import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authenticateAdmin, createProduct);
router.put("/:id", authenticateAdmin, updateProduct);
router.delete("/:id", authenticateAdmin, deleteProduct);

export default router;
