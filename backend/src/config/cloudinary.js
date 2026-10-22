import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "pbnqazpy",
  api_key: process.env.CLOUDINARY_API_KEY || "636433964381783",
  api_secret: process.env.CLOUDINARY_API_SECRET || "zgkcxd4_xqwEiH6c4Oq1HwSZJqo",
});

export const uploadToCloudinary = async (fileBufferOrBase64, folder = "mavtar_impex/products") => {
  try {
    if (typeof fileBufferOrBase64 === "string" && fileBufferOrBase64.startsWith("http")) {
      return fileBufferOrBase64;
    }

    const uploadOptions = {
      folder,
      resource_type: "auto",
      transformation: [{ quality: "auto:good", fetch_format: "auto" }],
    };

    if (typeof fileBufferOrBase64 === "string") {
      const res = await cloudinary.uploader.upload(fileBufferOrBase64, uploadOptions);
      return res.secure_url;
    } else if (Buffer.isBuffer(fileBufferOrBase64)) {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        });
        stream.end(fileBufferOrBase64);
      });
    }
    throw new Error("Invalid file format for upload");
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};

export default cloudinary;
