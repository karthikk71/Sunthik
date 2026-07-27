import express from "express";
import Wishlist from "../models/Wishlist.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add to Wishlist
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, title, price, image } = req.body;

    const exists = await Wishlist.findOne({
      user: req.user.id,
      productId,
    });

    if (exists) {
      return res.json({
        success: true,
        message: "Already in wishlist",
      });
    }

    const item = await Wishlist.create({
      user: req.user.id,
      productId,
      title,
      price,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Wishlist
router.get("/", protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    });

    res.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Remove Wishlist Item
router.delete("/:id", protect, async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;