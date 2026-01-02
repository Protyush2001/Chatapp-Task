// const Room = require("../models/room");
// const roomCtlr = {};



// // roomCtlr.createRoom = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const { name } = req.body;

// //     if (!name) {
// //       return res.status(400).json({ message: "Room name required" });
// //     }

// //     const room = await Room.create({
// //       name,
// //       isGroup: true,
// //       isPublic: true,
// //       users: [userId],
// //     });

// //     const populatedRoom = await Room.findById(room._id)
// //       .populate("users", "username email");

// //     return res.status(201).json(populatedRoom);
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ message: "Server error" });
// //   }
// // };

// roomCtlr.createRoom = async (req, res) => {
//   try {
//     const creatorId = req.user.id;
//     const { name, users } = req.body;

//     if (!name || !users?.length) {
//       return res.status(400).json({ message: "Room name & users required" });
//     }

//     const uniqueUsers = [...new Set([...users, creatorId])];

//     const room = await Room.create({
//       name,
//       isGroup: true,
//       isPublic: false,
//       users: uniqueUsers
//     });

//     const populatedRoom = await Room.findById(room._id)
//       .populate("users", "username email");

//     res.status(201).json(populatedRoom);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // roomCtlr.getRooms = async (req,res) =>{
// //     try{
// //         const userId = req.user.id;

// //         const rooms = await Room.find({
// //             $or: [
// //                 {isPublic:true},
// //                 {users: userId}
// //             ]
// //         }).populate("users","username email")
// //         .sort({updatedAt: -1});
// //         return res.status(200).json(rooms);
// //     }catch(err){
// //         console.error(err);
// //         return res.status(500).json({message:"server error"});
// //     }
// // }

// roomCtlr.getRooms = async (req, res) => {
//   const userId = req.user.id;

//   const rooms = await Room.find({
//     users: userId
//   })
//     .populate("users", "username email")
//     .sort({ updatedAt: -1 });

//   res.json(rooms);
// };


// roomCtlr.createDM = async (req, res) => {
//   const loggedInUserId = req.user.id;
//   const { userId } = req.body;

//   let room = await Room.findOne({
//     isGroup: false,
//     users: { $all: [loggedInUserId, userId] }
//   }).populate("users", "username email");

//   if (room) return res.json(room);

//   room = await Room.create({
//     isGroup: false,
//     users: [loggedInUserId, userId]
//   });

//   const populatedRoom = await Room.findById(room._id).populate(
//     "users",
//     "username email"
//   );

//   res.status(201).json(populatedRoom);
// };

// module.exports = roomCtlr;



//

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
  const loggedInUserId = req.user.id;
  const { userId } = req.body;

  let room = await Room.findOne({
    isGroup: false,
    users: { $all: [loggedInUserId, userId] }
  }).populate("users", "username email");

  if (room) return res.json(room);

  room = await Room.create({
    isGroup: false,
    users: [loggedInUserId, userId]
  });

  const populatedRoom = await Room.findById(room._id).populate(
    "users",
    "username email"
  );

  res.status(201).json(populatedRoom);
};

module.exports = roomCtlr;
