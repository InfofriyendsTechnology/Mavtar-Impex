import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authenticate } from "../middleware/auth";
import validator from "../utils/validators";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected Admin routes
router.post("/", authenticate, validator({ body: createProductSchema }), createProduct);
router.put("/:id", authenticate, validator({ body: updateProductSchema }), updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
