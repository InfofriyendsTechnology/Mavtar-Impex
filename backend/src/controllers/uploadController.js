import { uploadToCloudinary } from "../config/cloudinary.js";
import responseHandler from "../utils/responseHandler.js";

export const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      const url = await uploadToCloudinary(req.file.buffer);
      return responseHandler.success(res, "Image uploaded successfully", { url });
    } else if (req.body.image) {
      const url = await uploadToCloudinary(req.body.image);
      return responseHandler.success(res, "Image uploaded successfully", { url });
    } else {
      return responseHandler.badRequest(res, "No image file or image base64 provided");
    }
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
