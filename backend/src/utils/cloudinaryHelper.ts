import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";

// Ensure cloudinary is configured
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "pbnqazpy",
  api_key: process.env.CLOUDINARY_API_KEY || "636433964381783",
  api_secret: process.env.CLOUDINARY_API_SECRET || "zgkcxd4_xqwEiH6c4Oq1HwSZJqo",
});

export const MAVTAR_CLOUD_ROOT = "mavtar";

export const getAssetFolder = (
  category: "products" | "categories" | "banners" | "profiles" | "lookbook" = "products"
): string => {
  return `${MAVTAR_CLOUD_ROOT}/${category}`;
};

export const cleanupIfEmpty = async (folderPath: string): Promise<void> => {
  if (!folderPath || folderPath === MAVTAR_CLOUD_ROOT) {
    return;
  }
  try {
    const sub = await cloudinary.api.sub_folders(folderPath).catch(() => ({ folders: [] }));
    const files = await cloudinary.api
      .resources({ type: "upload", prefix: `${folderPath}/`, max_results: 2 })
      .catch(() => ({ resources: [] }));

    if ((!sub.folders || sub.folders.length === 0) && (!files.resources || files.resources.length === 0)) {
      await cloudinary.api.delete_folder(folderPath);
      console.log("Automatically deleted empty folder:", folderPath);
      const parent = folderPath.substring(0, folderPath.lastIndexOf("/"));
      if (parent) {
        await cleanupIfEmpty(parent);
      }
    }
  } catch (err) {
    // Ignore if deletion failed or folder not empty
  }
};

export const uploadBase64Image = async (
  base64Data: string,
  folder: string,
  publicId?: string
): Promise<string> => {
  const options: any = {
    folder,
    format: "webp",
    transformation: [{ quality: "auto:good", fetch_format: "webp" }],
    overwrite: true,
    invalidate: true,
  };
  if (publicId) {
    options.public_id = publicId;
  }

  const res = await cloudinary.uploader.upload(base64Data, options);
  return res.secure_url;
};

export default cloudinary;
