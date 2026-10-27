import Joi from "joi";

export const createInquirySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().allow("", null).optional(),
  phone: Joi.string().required(),
  organization: Joi.string().allow("", null).optional(),
  quantity: Joi.string().allow("", null).optional(),
  bagType: Joi.string().allow("", null).optional(),
  message: Joi.string().required(),
});
