const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authCtlr = {};

authCtlr.signup = async(req,res)=>{
    try{
        const {username,email,password} = req.body;

        // First we will check that if the user is existed in the db or not...
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        // Creating the User -- 
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.status(201).json({
            message:"signup successfully",
            user:{
                id:user._id,
                username: user.username,
                email:user.email
            }
        })
    }catch(error){
        return res.status(500).json({message:"Server error"});
    }
}

authCtlr.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'7d'});

        console.log("Login Successful");
        return res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Errro"});
    }
}

module.exports = authCtlr;