import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, city, message } = req.body;
  // Here you can save to DB or send email
  console.log("New Franchise Inquiry:", req.body);
  res.json({ success: true, message: "Thank you! We will contact you soon." });
});

export default router;