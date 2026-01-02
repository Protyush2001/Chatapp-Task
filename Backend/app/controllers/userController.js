const User = require("../models/user");

const userCtlr = {};

userCtlr.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {}, 
      "_id username email"
    );

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = userCtlr;
