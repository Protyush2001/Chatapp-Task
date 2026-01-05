

const Room = require("../models/room");
const roomCtlr = {};


roomCtlr.createRoom = async (req, res) => {
  try {
    const creatorId = req.user.id;
    const { name, users } = req.body;

    if (!name || !users?.length) {
      return res.status(400).json({ message: "Room name & users required" });
    }

    const uniqueUsers = [...new Set([...users, creatorId])];

    const room = await Room.create({
      name,
      isGroup: true,
      isPublic: false,
      users: uniqueUsers
    });

    const populatedRoom = await Room.findById(room._id)
      .populate("users", "username email");

    res.status(201).json(populatedRoom);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

roomCtlr.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      users: req.user.id
    });

    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

roomCtlr.createDM = async (req, res) => {
  try {
    const user1 = req.user.id;
    const { userId } = req.body;

   
    let room = await Room.findOne({
      isGroup: false,
      users: { $all: [user1, userId], $size: 2 }
    }).populate("users", "username email");

    if (room) {
      return res.status(200).json(room);
    }


    room = await Room.create({
      isGroup: false,
      users: [user1, userId]
    });

    const populatedRoom = await Room.findById(room._id)
      .populate("users", "username email");

    res.status(201).json(populatedRoom);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = roomCtlr;
