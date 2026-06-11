import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../Controller/ProductController.js";
import uploadProductImages from "../middleware/uploadProductImages.js";

const ProductRoutes = express.Router();

ProductRoutes.post("/", uploadProductImages.array("images", 8), createProduct);
ProductRoutes.get("/", getAllProducts);
ProductRoutes.get("/:id", getProductById);
ProductRoutes.put("/:id", uploadProductImages.array("images", 8), updateProduct);
ProductRoutes.delete("/:id", deleteProduct);

export default ProductRoutes;
