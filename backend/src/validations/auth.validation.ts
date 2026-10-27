import Joi from "joi";

export const loginSchema = Joi.object({
  mobile: Joi.string().allow("", null).optional(),
  identifier: Joi.string().allow("", null).optional(),
  email: Joi.string().allow("", null).optional(),
  password: Joi.string().required(),
}).or("mobile", "identifier", "email");
