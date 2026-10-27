import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";

const defaultSettings = {
  storeName: "Mavtar Impex",
  ownerName: "Krish Vaghani",
  tagline: "Handcrafted Luxury Linen Bags & Royal Indian Embroidery",
  supportEmail: "contact@mavtarimpex.com",
  supportPhone: "+91 95127 53471",
  whatsappNumber: "919512753471",
  freeShippingThreshold: 999,
  standardShippingFee: 99,
  bannerText:
    "Handcrafted Luxury Linen Bags | Free Pan-India Delivery on Orders Above ₹999 | Use Code: MAVTAR10 for 10% OFF",
  address: "Surat, Gujarat, India - 395006",
};

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settingRecord = await prisma.setting.findUnique({
      where: { key: "general_settings" },
    });

    const settings = settingRecord ? settingRecord.value : defaultSettings;
    return responseHandler.success(res, "Settings retrieved", settings);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const updated = await prisma.setting.upsert({
      where: { key: "general_settings" },
      update: { value: req.body },
      create: { key: "general_settings", value: req.body },
    });

    return responseHandler.success(res, "Settings updated successfully", updated.value);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
