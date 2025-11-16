import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/reports", reportRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
