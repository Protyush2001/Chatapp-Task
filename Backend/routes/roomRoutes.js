const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roomCtlr = require("../app/controllers/roomController");

router.post("/createRoom",auth,roomCtlr.createRoom);
router.get("/",auth,roomCtlr.getRooms);
router.post("/dm",auth,roomCtlr.createDM);

module.exports = router;