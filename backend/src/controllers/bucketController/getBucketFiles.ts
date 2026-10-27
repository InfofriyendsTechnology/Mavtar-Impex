import { Request, Response } from "express";
import responseHandler from "../../utils/responseHandler";
import cloudinary, { MAVTAR_CLOUD_ROOT } from "../../utils/cloudinaryHelper";

export const getBucketFiles = async (req: Request, res: Response) => {
  try {
    const path = (req.query.path as string) || MAVTAR_CLOUD_ROOT;
    const prefix = `${path}/`;

    const resources = await cloudinary.api
      .resources({
        type: "upload",
        prefix: prefix,
        max_results: 500,
      })
      .catch(() => ({ resources: [] }));

    // Filter so only files strictly in THIS folder are returned
    const strictFiles = (resources.resources || []).filter((file: any) => {
      const remainingPath = file.public_id.replace(prefix, "");
      return !remainingPath.includes("/");
    });

    return responseHandler.success(res, "Files fetched", strictFiles);
  } catch (error) {
    console.error("Cloudinary Files Error:", error);
    return responseHandler.internalServerError(res, error);
  }
};
