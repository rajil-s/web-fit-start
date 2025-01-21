const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fname:{
        type: String,
        required: true,
    },

    lname:{
        type: String,
        required: true,
    },

    phone:{
        type: Number,
        unique: true,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    height:{
        type: String,
        required: true,
    },

    weight:{
        type: String,
        required: true,
    },

    age:{
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },
    resetPasswordOTP:{
        type: Number,
        default: null
    },

    resetPasswordExpires:{
        type: Date,
        default: null
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;