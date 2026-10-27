import { Request, Response } from "express";
import responseHandler from "../../utils/responseHandler";
import cloudinary, { MAVTAR_CLOUD_ROOT } from "../../utils/cloudinaryHelper";

export const deleteBucketFolder = async (req: Request, res: Response) => {
  try {
    const { path } = req.body;
    if (!path) {
      return responseHandler.badRequest(res, "Folder path is required");
    }

    if (path === MAVTAR_CLOUD_ROOT) {
      return responseHandler.badRequest(res, "Cannot delete root system folder");
    }

    // Delete any remaining files in folder
    await cloudinary.api
      .delete_resources_by_prefix(`${path}/`, { invalidate: true })
      .catch(() => {});

    // Delete any subfolders
    const sub = await cloudinary.api
      .sub_folders(path)
      .catch(() => ({ folders: [] }));
    for (const sf of sub.folders || []) {
      await cloudinary.api.delete_folder(sf.path).catch(() => {});
    }

    const delRes = await cloudinary.api.delete_folder(path);
    return responseHandler.success(res, "Folder deleted successfully", {
      path,
      delRes,
    });
  } catch (error: any) {
    console.error("Cloudinary Folder Delete Error:", error);
    return responseHandler.internalServerError(
      res,
      error.error || error.message || error
    );
  }
};
