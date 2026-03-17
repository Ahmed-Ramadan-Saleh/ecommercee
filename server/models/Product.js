const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    images: [String],
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    style: { type: String },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
