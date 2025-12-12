// models/Outlet.js
import mongoose from "mongoose";

const OutletSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: String,
  city: { type: String, required: true },
  state: String,
  lat: Number,
  lng: Number,
  openingHours: String,
});

export default mongoose.model("Outlet", OutletSchema);