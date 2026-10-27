import { Request, Response } from "express";
import responseHandler from "../../utils/responseHandler";
import cloudinary, { MAVTAR_CLOUD_ROOT, cleanupIfEmpty } from "../../utils/cloudinaryHelper";

export const getBucketFolders = async (req: Request, res: Response) => {
  try {
    const { path } = req.query;
    let folders;

    if (!path || path === "" || path === "/") {
      folders = await cloudinary.api.sub_folders(MAVTAR_CLOUD_ROOT).catch(async () => {
        // If root folder does not exist yet, return empty list
        return { folders: [] };
      });
    } else {
      folders = await cloudinary.api.sub_folders(path as string);
    }

    const folderList = folders.folders || [];
    const validFolders = [];

    for (const f of folderList) {
      try {
        const sub = await cloudinary.api
          .sub_folders(f.path)
          .catch(() => ({ folders: [] }));
        const files = await cloudinary.api
          .resources({ type: "upload", prefix: `${f.path}/`, max_results: 1 })
          .catch(() => ({ resources: [] }));

        if (
          (sub.folders && sub.folders.length > 0) ||
          (files.resources && files.resources.length > 0)
        ) {
          validFolders.push(f);
        } else {
          await cleanupIfEmpty(f.path);
        }
      } catch (err) {
        validFolders.push(f);
      }
    }

    validFolders.sort((a: any, b: any) => a.name.localeCompare(b.name));

    return responseHandler.success(res, "Folders fetched", validFolders);
  } catch (error: any) {
    console.error("Cloudinary Folders Error:", error);
    if (error?.http_code === 404) {
      return responseHandler.success(res, "Folders fetched", []);
    }
    return responseHandler.internalServerError(res, error);
  }
};
