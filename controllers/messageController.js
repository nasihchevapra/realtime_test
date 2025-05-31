const Message = require("../models/Message");


exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(messages.reverse()); // Reverse to show oldest first
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { text, user } = req.body;
    const newMessage = new Message({ text, user });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};