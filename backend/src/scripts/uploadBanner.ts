import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "pbnqazpy",
  api_key: process.env.CLOUDINARY_API_KEY || "636433964381783",
  api_secret: process.env.CLOUDINARY_API_SECRET || "zgkcxd4_xqwEiH6c4Oq1HwSZJqo",
});

async function uploadBanner() {
  const filePath = path.resolve(__dirname, "../../../frontend/src/assets/Banner.png");
  if (!fs.existsSync(filePath)) {
    console.error("Banner.png not found at:", filePath);
    process.exit(1);
  }

  console.log("Uploading Banner.png to Cloudinary mavtar/banners/hero_banner...");
  const res = await cloudinary.uploader.upload(filePath, {
    folder: "mavtar/banners",
    public_id: "hero_banner",
    overwrite: true,
    format: "webp",
    quality: "auto",
  });

  console.log("Upload Success!");
  console.log("Secure URL:", res.secure_url);
  console.log("Public ID:", res.public_id);
}

uploadBanner().catch((err) => {
  console.error("Upload error:", err);
  process.exit(1);
});
