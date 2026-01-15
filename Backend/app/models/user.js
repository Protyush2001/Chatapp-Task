
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true // added
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true // added
    }, 
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User;