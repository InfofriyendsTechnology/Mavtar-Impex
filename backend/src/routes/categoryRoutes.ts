import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", getAllCategories);
router.post("/", authenticate, createCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
