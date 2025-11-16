import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
