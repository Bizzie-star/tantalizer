// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import Outlet from "./models/Outlet.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ========== AUTO SEED TANTALIZERS MENU ON START ==========
const seedMenu = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    const menu = [
      { name: "Roasted Chicken", price: 4000, category: "Chicken", image: "/menu/roasted-chicken.jpg" },
      { name: "Barbecue Chicken", price: 5500, category: "Chicken", image: "/menu/barbecue.jpg" },
      { name: "Chinese Fried Rice", price: 5000, category: "Rice", image: "/menu/chineserice.jpg" },
      { name: "Jollof Rice & Stew", price: 3000, category: "Rice", image: "/menu/jollofrice.jpg" },
      { name: "French Fries", price: 2500, category: "Sides", image: "/menu/fries.jpg" },
      { name: "Coconut Rice", price: 2500, category: "Rice", image: "/menu/coconutrice.jpg" },
      { name: "Spaghetti Jollof", price: 2500, category: "Pasta", image: "/menu/spaghetti.jpg" },
      { name: "Pounded Yam & Egusi", price: 4500, category: "Swallow", image: "/menu/pounded-yam.jpg" },
      { name: "Moi Moi", price: 1500, category: "Sides", image: "/menu/moimoi.jpg" },
      { name: "Pepper Soup (Goat)", price: 6000, category: "Soup", image: "/menu/peppersoup.jpg" },
      { name: "Chapman", price: 2000, category: "Drinks", image: "/menu/chapman.jpg" },
      { name: "Zobo", price: 1500, category: "Drinks", image: "/menu/zobo.jpg" },
    ];

    await Product.insertMany(menu);
    console.log("Tantalizers Menu Seeded!");
  }
};

// ========== ROUTES ==========
app.get("/api/menu", async (req, res) => {
  try {
    const products = await Product.find().sort({ category: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/outlets", async (req, res) => {
  const { city } = req.query;
  try {
    let outlets = await Outlet.find();
    if (city) {
      outlets = outlets.filter(o => o.city.toLowerCase().includes(city.toLowerCase()));
    }
    res.json(outlets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Tantalizers Backend Running! Menu: /api/menu | Outlets: /api/outlets");
});

// ========== CONNECT DB & START SERVER ==========
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await seedMenu(); // Auto seed menu on first run
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
      console.log("Special Delicacies → http://localhost:5000/api/menu");
    });
  })
  .catch(err => console.log("DB Error:", err));