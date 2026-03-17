const express = require("express");
const router = express.Router();
const {
  getOrders,
  updateOrderStatus,
  getOrderById,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

// Route: /api/orders
// Access: Private/Admin
router.route("/").get(protect, admin, getOrders);

// Route: /api/orders/:id
// Access: Private/Admin
// Optional: Useful for fetching details for the Order Slide-over Panel
router.route("/:id").get(protect, admin, getOrderById);

// Route: /api/orders/:id/status
// Access: Private/Admin
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
