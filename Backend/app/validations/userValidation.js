const Joi = require("joi");


exports.registrationValidation = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

exports.loginValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required() 
})