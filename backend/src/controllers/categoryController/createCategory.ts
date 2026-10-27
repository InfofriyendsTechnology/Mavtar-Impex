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

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body;
    const slug = slugify(name);

    const existing = await prisma.category.findUnique({
      where: { slug },
    });

    if (existing) {
      return responseHandler.badRequest(res, "Category with this name already exists");
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || "",
        image: image || "",
      },
    });

    return responseHandler.created(res, MESSAGES.CATEGORY.CREATED, category);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
