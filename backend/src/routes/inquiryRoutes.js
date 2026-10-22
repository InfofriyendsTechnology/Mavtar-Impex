import { Router } from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
} from "../controllers/inquiryController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", createInquiry);
router.get("/", authenticateAdmin, getInquiries);
router.put("/:id/status", authenticateAdmin, updateInquiryStatus);

export default router;
