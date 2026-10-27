import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import responseHandler from "../../utils/responseHandler";
import { MESSAGES } from "../../utils/messages";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      price,
      originalPrice,
      stock,
      category,
      categorySlug,
      fabric,
      embroideryType,
      dimensions,
      closure,
      lining,
      careInstructions,
      shortDescription,
      description,
      images,
      isFeatured,
      isBestSeller,
      sku,
    } = req.body;

    const baseSlug = slugify(title);
    let finalSlug = baseSlug;
    let counter = 1;
    while (await prisma.product.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${baseSlug}-${counter++}`;
    }

    const generatedSku =
      sku ||
      `MVT-${category.substring(0, 3).toUpperCase()}-${Math.floor(
        100 + Math.random() * 900
      )}`;

    const newProduct = await prisma.product.create({
      data: {
        title,
        slug: finalSlug,
        sku: generatedSku,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        stock: Number(stock || 0),
        category,
        categorySlug: categorySlug || slugify(category),
        fabric: fabric || "",
        embroideryType: embroideryType || "",
        dimensions: dimensions || "",
        closure: closure || "",
        lining: lining || "",
        careInstructions: careInstructions || "",
        shortDescription: shortDescription || "",
        description,
        images: images || [],
        isFeatured: Boolean(isFeatured),
        isBestSeller: Boolean(isBestSeller),
      },
    });

    return responseHandler.created(
      res,
      MESSAGES.PRODUCT.CREATED,
      newProduct
    );
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
