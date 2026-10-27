import { Request, Response } from "express";
import responseHandler from "../../utils/responseHandler";
import cloudinary, { MAVTAR_CLOUD_ROOT } from "../../utils/cloudinaryHelper";

export const getBucketStats = async (req: Request, res: Response) => {
  try {
    const resources = await cloudinary.api.resources({
      type: "upload",
      prefix: `${MAVTAR_CLOUD_ROOT}/`,
      max_results: 500,
    });

    // Sum exact bytes of all files in mavtar prefix
    const exactBytes = resources.resources.reduce(
      (total: number, file: any) => total + (file.bytes || 0),
      0
    );

    // Cloudinary Free Tier Limit is 25 GB (25 Credits)
    const TOTAL_LIMIT_BYTES = 25 * 1024 * 1024 * 1024;
    const freeBytes = TOTAL_LIMIT_BYTES - exactBytes;

    return responseHandler.success(res, "Bucket stats fetched", {
      usage: exactBytes,
      total: TOTAL_LIMIT_BYTES,
      free: Math.max(0, freeBytes),
      fileCount: resources.resources.length,
    });
  } catch (error) {
    console.error("Cloudinary Stats Error:", error);
    return responseHandler.internalServerError(res, error);
  }
};
