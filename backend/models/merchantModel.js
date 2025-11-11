import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  userId: String,
  message: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
