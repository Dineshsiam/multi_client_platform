import Message from "../models/merchantModel.js";

export const addMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const newMessage = await Message.create({ userId, message });
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
