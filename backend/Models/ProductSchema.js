import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,

    price: { type: Number, required: true },

    category: String,
    brand: String,

    images: [String],

    stock: { type: Number, default: 0 },

    // 🔥 Variants system (size, color, etc.)
    variants: [
      {
        size: String,
        color: String,
        storage: String,
        weight: String,
        price: Number,
        stock: Number
      }
    ],

    // optional extra info
    attributes: {
      type: Object,
      default: {}
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);