import express from "express";
import Outlet from "../models/Outlet.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const outlets = await Outlet.find();
    res.json(outlets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;