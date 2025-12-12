import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;