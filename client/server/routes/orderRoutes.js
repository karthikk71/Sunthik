import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Place Order
router.post("/place", protect, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id });

    if (cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const items = cart.map((item) => ({
      productId: item.productId,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
    });

    await Cart.deleteMany({ user: req.user.id });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get My Orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;