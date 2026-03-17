const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // Fetch all orders and populate the 'user' field with name and email
  const orders = await Order.find({}).populate("user", "id name email");
  res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status || order.status;

    // Optional: Automatically set delivery flags if status is 'delivered'
    if (status === "delivered") {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    } else {
      // Reset if status changes away from delivered
      order.isDelivered = false;
      order.deliveredAt = undefined;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = {
  getOrders,
  updateOrderStatus,
  getOrderById,
};
