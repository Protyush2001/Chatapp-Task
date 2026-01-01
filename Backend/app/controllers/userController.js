const User = require("../models/user");
const userCtlr = {};

userCtlr.getAllUsers = async (req,res) => {
    try{
        const users = await User.find();
        return res.status(200).json(users);
    }catch(err){
        return res.status(500).json({message: "Server error"});
    }
}

module.exports = userCtlr;