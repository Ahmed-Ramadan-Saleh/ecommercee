const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

// Route: /api/products
router
  .route("/")
  .get(getProducts) // Public access
  .post(protect, admin, createProduct); // Admin only

// Route: /api/products/:id
router
  .route("/:id")
  .get(getProductById) // Public access
  .put(protect, admin, updateProduct) // Admin only
  .delete(protect, admin, deleteProduct); // Admin only

module.exports = router;
