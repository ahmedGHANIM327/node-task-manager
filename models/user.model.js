const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

// Connection
/*mongoose.connect(process.env.DB_CONNECTION_URL)
    .then(() => console.log("connected to mongodb ..."))
    .catch((err) => console.error("can't connect ...",err))*/

// Collection Schema
const userSchema = new mongoose.Schema({
    name: {type:String,required:true,minlength: 4},
    email: {type:String,required:true,minlength: 4,unique:true},
    password: {type:String,required:true,minlength: 4}
});

const User = mongoose.model('users',userSchema);

// Joi password complexity options
const complexityOptions = {
    min: 8, // Minimum password length
    max: 30, // Maximum password length
    lowerCase: 1, // Require at least 1 lowercase letter
    upperCase: 1, // Require at least 1 uppercase letter
    numeric: 1, // Require at least 1 digit
    symbol: 1, // Require at least 1 special character
    requirementCount: 4, // Total number of requirements above that must be met
};

function validateUser(user) {
    const userValidationSchema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(4).email().required(),
        password: passwordComplexity(complexityOptions).required(),
    });

    return userValidationSchema.validate(user);
}

function validateUserLogin(user) {
    const userValidationSchema = Joi.object({
        email: Joi.string().min(4).email().required(),
        password: Joi.string().required(),
    });

    return userValidationSchema.validate(user);
}

module.exports = {
    User,
    validateUser,
    validateUserLogin
}