import Joi from "joi";

export const createOrderSchema = Joi.object({
  customerName: Joi.string().required(),
  customerEmail: Joi.string().email().allow("", null).optional(),
  customerPhone: Joi.string().required(),
  shippingAddress: Joi.object({
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().allow("").optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    country: Joi.string().default("India"),
  }).required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().optional(),
        title: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().integer().min(1).required(),
        image: Joi.string().optional(),
      })
    )
    .min(1)
    .required(),
  paymentMethod: Joi.string().default("COD"),
  notes: Joi.string().allow("", null).optional(),
});
