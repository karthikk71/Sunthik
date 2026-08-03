import express from "express";
import upload from "../middleware/upload.js";

import {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", upload.single("image"), createProduct);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.delete("/:id", deleteProduct);

export default router;
