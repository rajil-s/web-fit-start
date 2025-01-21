const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendOtp = require("../service/sendOtp");
require('dotenv').config();
const asyncHandler = require('express-async-handler');


const createUser = async (req, res) => {
    console.log(req.body);

    const { fname, lname, email, password, phone, height, weight, age, gender} = req.body;

    if (!fname || !lname || !email || !password || !phone || !height || !weight || !age || !gender) {
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.json({
                "success": false,
                "message": "User Already Exists!"
            });
        }

        const randomSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, randomSalt);

        const user = new User({
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            password: hashedPassword,
            height: height,
            weight: weight,
            age: age,
            gender: gender
        });

        await user.save();

        return res.json({
            "success": true,
            "message": "User Created Successfully!"
        });

    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.json({
                "success": false,
                "message": "Internal Server Error!"
            });
        }
    }
}

const loginUser = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            "success": false,
            "message": "Please enter all fields!"
        });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.json({
                "success": false,
                "message": "User doesn't exist!!"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.json({
                "success": false,
                "message": "Password not matched!"
            });
        }

        const token = await jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Optional: token expiry time
        );

        return res.json({
            "success": true,
            "message": "User Logged in Successfully",
            "token": token,
            "userData": user
        });

    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.json({
                "success": false,
                "message": "Internal Server Error!"
            });
        }
    }
}


const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}

const getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password");
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(200).json(user);
  });

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find and update user, return the new document
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        res.status(201).json({
            success: true,
            message: "User updated!",
            user: updatedUser  // Change 'product' to 'user'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};

//Forgot password by using phone number
const forgotPassword = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({
            "success": false,
            "message": "Please enter phone number!"
        })
    }
    try {
        const user = await User.findOne({ phone: phone })
        if (!user) {
            return res.status(400).json({
                "success": false,
                "message": "User not found!"
            })
        }

        const OTP = Math.floor(100000 + Math.random() * 900000)

        const expiryDate = Date.now() + 360000

        user.resetPasswordOTP = OTP
        user.resetPasswordExpires = expiryDate
        await user.save()

        const isSent = await sendOtp(phone, OTP)
        if (!isSent) {
            return res.status(400).json({
                "success": false,
                "message": "Error sending OTP code!"
            })
        }

        return res.status(200).json({
            "success": true,
            "message": "OTP sent successfully!"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "success": false,
            "message": "Internal Server Error!"
        })
    }
}

const verifyOtpAndSetPassword = async (req, res) => {
    const {phone, otp, newPassword} = req.body;
    if(!phone || !otp || !newPassword){
        return res.status(400).json({
            "success": false,
            "message": "Please enter all fields!"
        })
    }

    try {
        const user = await User.findOne({phone: phone})
        
        if(user.resetPasswordOTP != otp){
            return res.status(400).json({
                "success": false,
                "message": "Invalid OTP!"
            })
        }

        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                "success": false,
                "message": "OTP Expired!"
            })
        }

        //password hashing
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, randomSalt)

        user.password = hashedPassword
        await user.save()

        return res.status(200).json({
            "success": true,
            "message": "OTP verified and password updated successfully!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            "success": false,
            "message": "Internal Server Error!"
        })
    }
}


//exporting
module.exports = {
    createUser,
    loginUser,
    getSingleUser,
    updateUser,
    forgotPassword,
    verifyOtpAndSetPassword,
    getMe
}