import Product from "../Models/ProductSchema.js";

const parseJSONField = (field, fallback) => {
  if (!field) return fallback;
  if (typeof field !== "string") return field;

  try {
    return JSON.parse(field);
  } catch (error) {
    return fallback;
  }
};

const getUploadedImageUrls = (req) => {
  if (!req.files?.length) return [];

  return req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/uploads/products/${file.filename}`;
  });
};

const buildProductPayload = (req) => {
  const uploadedImages = getUploadedImageUrls(req);

  return {
    ...req.body,
    price: Number(req.body.price),
    stock: Number(req.body.stock) || 0,
    images: uploadedImages.length
      ? uploadedImages
      : parseJSONField(req.body.images, []),
    variants: parseJSONField(req.body.variants, []),
    attributes: parseJSONField(req.body.attributes, {}),
  };
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(buildProductPayload(req));

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { search, category, brand, minPrice, maxPrice } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const payload = buildProductPayload(req);

    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
