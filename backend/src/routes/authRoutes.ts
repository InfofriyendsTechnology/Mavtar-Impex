import { Router } from "express";
import {
  login,
  getProfile,
  googleAuth,
  customerAuth,
} from "../controllers/authController";
import { authenticate } from "../middleware/auth";
import validator from "../utils/validators";
import { loginSchema } from "../validations/auth.validation";

const router = Router();

// Admin credentials login
router.post("/login", validator({ body: loginSchema }), login);

// Customer social and direct auth
router.post("/google", googleAuth);
router.post("/customer-login", customerAuth);
router.post("/customer-register", customerAuth);

// Profile
router.get("/me", authenticate, getProfile);
router.get("/profile", authenticate, getProfile);

export default router;
