import { db } from "../data/db.js";
import responseHandler from "../utils/responseHandler.js";

export const createInquiry = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerEmail,
      inquiryType,
      quantityNeeded,
      customEmbroideryText,
      targetEventDate,
      message,
    } = req.body;

    if (!customerName || !customerPhone || !message) {
      return responseHandler.badRequest(res, "Name, phone number, and inquiry message are required");
    }

    const inquiry = {
      id: "inq_" + Date.now(),
      customerName,
      customerPhone,
      customerEmail: customerEmail || "",
      inquiryType: inquiryType || "BULK_WEDDING_FAVORS",
      quantityNeeded: quantityNeeded ? Number(quantityNeeded) : 50,
      customEmbroideryText: customEmbroideryText || "",
      targetEventDate: targetEventDate || "",
      message,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    await db.saveInquiry(inquiry);
    return responseHandler.created(res, "Inquiry submitted! Our master craft team will contact you shortly.", inquiry);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await db.getInquiries();
    return responseHandler.success(res, "Inquiries retrieved", inquiries);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const inquiries = await db.getInquiries();
    const target = inquiries.find((i) => i.id === id);
    if (!target) {
      return responseHandler.notFound(res, "Inquiry not found");
    }

    if (status) target.status = status;
    if (adminNotes !== undefined) target.adminNotes = adminNotes;

    await db.saveInquiry(target);
    return responseHandler.success(res, "Inquiry updated successfully", target);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
