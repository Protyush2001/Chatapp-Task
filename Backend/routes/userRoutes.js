const express = require("express");
const router = express.Router();
const userCtlr = require("../app/controllers/userController");
const auth = require("../middleware/auth");

router.get("/",auth,userCtlr.getAllUsers);

module.exports = router;