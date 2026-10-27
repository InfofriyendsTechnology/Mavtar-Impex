import { Request, Response } from "express";
import responseHandler from "../../utils/responseHandler";
import cloudinary, { MAVTAR_CLOUD_ROOT, cleanupIfEmpty } from "../../utils/cloudinaryHelper";
import prisma from "../../utils/prisma";

export const deleteBucketFile = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return responseHandler.badRequest(res, "public_id is required");
    }

    await cloudinary.uploader.destroy(public_id, { invalidate: true });

    // Auto-clean folder if empty
    const folderPath = public_id.substring(0, public_id.lastIndexOf("/"));
    if (folderPath) {
      await cleanupIfEmpty(folderPath);
    }

    return responseHandler.success(res, "File deleted successfully", {
      public_id,
    });
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    return responseHandler.internalServerError(res, error);
  }
};
