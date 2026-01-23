const User = require("../models/user");

const userCtlr = {};

userCtlr.getAllUsers = async (req, res) => {
  // try {
  //   const users = await User.find(
  //     {}, 
  //     "_id username email"
  //   );

  //   return res.status(200).json(users);
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).json({ message: "Server error" });
  // }

      try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const users = await User.find()
        .select("-password")
        .skip(skip)
        .limit(limit);
        return res.status(200).json(users);
    }catch(err){
        return res.status(400).json({message:"Something went wrong"});
    }
};

module.exports = userCtlr;
