const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
    {

        email: { type: String, required: true, trim: true, unique: false },
        otp: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)


const otp = mongoose.model("OTP", otpSchema);

module.exports = otp;