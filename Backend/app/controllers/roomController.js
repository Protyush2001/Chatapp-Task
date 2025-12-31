const Room = require("../models/room");
const roomCtlr = {};

roomCtlr.createRoom = async (Req,res) => {
    try{
        const loggedInUserId = req.user.id;
        const {userId} = req.body;

        if(!userId){
            return res.status(400).json({message:"userId not found"});
        }

        let room = await Room.findOne({
            isGroup:false,
            users:{$all:[loggedInUserId,userId]}
        }).populate("users","username email");

        if(room){
            return res.status(200).json(room);
        }
        room = await Room.create({
            isGroup:false,
            users:[loggedInUserId,userId]
        });

        const populatedRoom = await Room.findById(room._id).populate("users","username email");

        return res.status(201).json(populatedRoom);
        
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Server error"});
    }
};

roomCtlr.getRooms = async (req,res) =>{
    try{
        const userId = req.user.id;

        const rooms = await Room.find({
            users: userId
        }).populate("users","username email")
        .sort({updatedAt: -1});
        return res.status(200).json(rooms);
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"server error"});
    }
}

module.exports = roomCtlr;