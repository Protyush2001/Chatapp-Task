const express = require("express");
const router = express.Router();
const messageController = require("../app/controllers/messageController");
const auth = require("../middleware/auth");

router.post("/send",auth,messageController.sendMessage);
router.get("/:roomId",auth,messageController.getMessages);

module.exports = router;