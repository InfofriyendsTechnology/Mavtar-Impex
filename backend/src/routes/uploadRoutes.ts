import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";
import { authenticate } from "../middleware/auth";

const router = Router();

// Upload to cloud (authenticated)
router.post("/", authenticate, uploadImage);

export default router;
