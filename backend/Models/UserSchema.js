import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    roles: {
        type: [String],
        default: ["buyer"]
    },

    isVerified: {
        type: Boolean,
        default: false
    },

   otp: {
    type: String,
    default: null
},

   otpExpires: {
    type: Date,
    default: null
  },

    resetPasswordToken: {
        type: String,
        default: null
    },

    resetPasswordExpires: {
        type: Date,
        default: null
    },

    profileImage: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});
const User=mongoose.model("User", userSchema)
export default User