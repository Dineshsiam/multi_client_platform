import Report from "../models/reportModel.js";

// Get all reports for a user
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new report
export const createReport = async (req, res) => {
  const { title, value } = req.body;

  if (!title || value === undefined) {
    return res.status(400).json({ message: "Title and value are required" });
  }

  try {
    const report = await Report.create({
      title,
      value,
      user: req.user._id,
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
