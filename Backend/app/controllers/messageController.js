const Message = require("../models/message");
const msgCtlr = {};
const Room = require("../models/room");

msgCtlr.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { roomId, content } = req.body;

    if (!roomId || !content) {
      return res
        .status(400)
        .json({ message: "RoomId and content are required" });
    }

    const room = await Room.findById(roomId);

if (!room.users.includes(req.user.id)) {
  return res.status(403).json({ message: "Access denied" });
}


    const message = await Message.create({
      sender: senderId,
      room: roomId,
      content,
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "username email"
    );
    return res.status(201).json(populatedMessage);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

msgCtlr.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ room: roomId })
      .populate("sender", "username email")
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = msgCtlr;
