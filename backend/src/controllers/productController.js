import { db } from "../data/db.js";
import responseHandler from "../utils/responseHandler.js";

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export const getProducts = async (req, res) => {
  try {
    let products = await db.getProducts();
    const { category, search, minPrice, maxPrice, featured, sort } = req.query;

    if (category && category !== "all") {
      products = products.filter(
        (p) =>
          p.categorySlug === category ||
          p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.fabric && p.fabric.toLowerCase().includes(q)) ||
          (p.embroideryType && p.embroideryType.toLowerCase().includes(q))
      );
    }

    if (minPrice) {
      products = products.filter((p) => Number(p.price) >= Number(minPrice));
    }

    if (maxPrice) {
      products = products.filter((p) => Number(p.price) <= Number(maxPrice));
    }

    if (featured === "true") {
      products = products.filter((p) => p.isFeatured);
    }

    if (sort === "price-low") {
      products.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "price-high") {
      products.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "popular") {
      products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Default: newest first
      products.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return responseHandler.success(res, "Products retrieved successfully", products);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.getProductById(id);
    if (!product) {
      return responseHandler.notFound(res, "Product not found");
    }
    return responseHandler.success(res, "Product retrieved", product);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
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
      images,
      isFeatured,
      isBestSeller,
    } = req.body;

    if (!title || !price) {
      return responseHandler.badRequest(res, "Product title and price are required");
    }

    const id = "prod_" + Date.now();
    const slug = slugify(title) + "-" + Math.random().toString(36).substring(2, 6);

    const newProduct = {
      id,
      title,
      slug,
      description: description || "",
      shortDescription: shortDescription || "",
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.4),
      stock: stock !== undefined ? Number(stock) : 50,
      category: category || "Royal Heritage Embroidery",
      categorySlug: categorySlug || "royal-heritage",
      fabric: fabric || "100% Pure Organic Linen",
      embroideryType: embroideryType || "Zari & Velvet Applique Embroidery",
      dimensions: dimensions || "14\"H x 16\"W x 5\"D (Handle Drop: 9\")",
      closure: closure || "Heavy Magnetic Snap Button & Premium Inner Zip",
      lining: lining || "Water-Resistant Organic Cotton Lining",
      careInstructions: careInstructions || "Dry clean or gentle cold spot clean only. Do not bleach.",
      images: Array.isArray(images) && images.length > 0 ? images : ["/products/bag-royal-elephant.jpg"],
      isFeatured: Boolean(isFeatured),
      isBestSeller: Boolean(isBestSeller),
      rating: 4.9,
      reviewsCount: 18,
      sku: "MAVTAR-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
    };

    await db.saveProduct(newProduct);
    return responseHandler.created(res, "Product created successfully", newProduct);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.getProductById(id);
    if (!existing) {
      return responseHandler.notFound(res, "Product not found");
    }

    const updated = {
      ...existing,
      ...req.body,
      price: req.body.price !== undefined ? Number(req.body.price) : existing.price,
      originalPrice: req.body.originalPrice !== undefined ? Number(req.body.originalPrice) : existing.originalPrice,
      stock: req.body.stock !== undefined ? Number(req.body.stock) : existing.stock,
      updatedAt: new Date().toISOString(),
    };

    await db.saveProduct(updated);
    return responseHandler.success(res, "Product updated successfully", updated);
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.getProductById(id);
    if (!existing) {
      return responseHandler.notFound(res, "Product not found");
    }

    await db.deleteProduct(id);
    return responseHandler.success(res, "Product deleted successfully");
  } catch (error) {
    return responseHandler.internalServerError(res, error);
  }
};
