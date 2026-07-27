import express from "express";
import Cart from "../models/Cart.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add to Cart
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, title, price, image } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user.id,
      productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();

      return res.json({
        success: true,
        message: "Quantity updated",
      });
    }

    const item = await Cart.create({
      user: req.user.id,
      productId,
      title,
      price,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Added to cart",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Cart
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id });

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Remove Item
router.delete("/:id", protect, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Item removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;