import { Router } from "express";
import {
  getAllInquiries,
  createInquiry,
  updateInquiryStatus,
} from "../controllers/inquiryController";
import { authenticate } from "../middleware/auth";
import validator from "../utils/validators";
import { createInquirySchema } from "../validations/inquiry.validation";

const router = Router();

// Public inquiry submission
router.post("/", validator({ body: createInquirySchema }), createInquiry);

// Protected Admin inquiries
router.get("/", authenticate, getAllInquiries);
router.patch("/:id/status", authenticate, updateInquiryStatus);
router.put("/:id/status", authenticate, updateInquiryStatus);

export default router;
