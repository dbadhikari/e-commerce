import User from "../Models/UserSchema.js";
import bcrypt from "bcrypt";
import { sendOTPEmail } from "../utils/sendEmail.js";
import generateToken from "../utils/token.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isExist = await User.findOne({ email });

        if (isExist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000
        });

        await newUser.save();

        await sendOTPEmail(email, otp);

        res.status(201).json({
            success: true,
            message: "OTP sent to email"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const token =generateToken(user._id)

        res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
         });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};