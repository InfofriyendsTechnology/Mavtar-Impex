import { Router } from "express";
import { db } from "../data/db.js";
import responseHandler from "../utils/responseHandler.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const settings = await db.getSettings();
    return responseHandler.success(res, "Settings retrieved", settings);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
});

router.put("/", authenticateAdmin, async (req, res) => {
  try {
    const updated = await db.updateSettings(req.body);
    return responseHandler.success(res, "Settings updated successfully", updated);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await db.getCategories();
    return responseHandler.success(res, "Categories retrieved", categories);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
});

export default router;
