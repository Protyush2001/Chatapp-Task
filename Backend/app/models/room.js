const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    isGroup:{
        type:Boolean,
        default:false
    },
    isPublic:{
        type:Boolean,
        default:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:"true"
        }
    ]
},{timestamps:true});

const Room = mongoose.model("Room",roomSchema);

module.exports = Room;