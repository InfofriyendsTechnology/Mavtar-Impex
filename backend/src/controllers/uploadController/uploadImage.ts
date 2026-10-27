import { Request, Response } from "express";
import responseHandler from "../../utils/responseHandler";
import cloudinary, { getAssetFolder } from "../../utils/cloudinaryHelper";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, folder, public_id } = req.body;

    if (!image) {
      return responseHandler.badRequest(res, "Image data or URL is required");
    }

    const targetFolder = folder || getAssetFolder("products");

    // Upload base64 or URL to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: targetFolder,
      public_id,
      format: "webp",
      transformation: [{ quality: "auto:good", fetch_format: "webp" }],
      overwrite: true,
      invalidate: true,
    });

    return responseHandler.success(res, "Image uploaded successfully to Cloud", {
      url: uploadRes.secure_url,
      public_id: uploadRes.public_id,
      format: uploadRes.format,
      bytes: uploadRes.bytes,
      width: uploadRes.width,
      height: uploadRes.height,
    });
  } catch (error) {
    console.error("Cloud Upload Error:", error);
    return responseHandler.internalServerError(res, error);
  }
};
