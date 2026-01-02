const express = require("express");
const User = require("../app/models/user");
const router = express.Router();
const userCtlr = require("../app/controllers/userController");
const auth = require("../middleware/auth");

router.get("/",auth,userCtlr.getAllUsers);
router.get("/me",auth,async(req,res)=>{
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
})

module.exports = router;