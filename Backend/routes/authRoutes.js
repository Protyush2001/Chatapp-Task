const express = require('express');
const router = express.Router();
const authController = require("../app/controllers/authController");
const validate = require("../middlewares/validate");
const {loginValidation} = require("../app/validations/auth.validation");

const auth = require("../middleware/auth");
const { registrationValidation } = require('../app/validations/userValidation');



// router.post("/signup",authController.signup);
// router.post("/login",authController.login);

router.post("/signup",validate(registrationValidation),authController.signup);
router.post('/login',validate(loginValidation),authController.login)


module.exports = router;