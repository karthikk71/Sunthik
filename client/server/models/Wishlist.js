import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    title: String,
    price: Number,
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Wishlist", wishlistSchema);