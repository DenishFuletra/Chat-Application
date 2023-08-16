const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const bcryptPassword = async (password,) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

const matchPassword = async (password, hashPassword) => {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
}

const accessToken = (id) => {
    console.log(process.env.JWTSECRET);
    return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: "10m" })
}

const generateRefreshToken = (id) => {
    console.log(process.env.JWTSECRET);
    return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: "7d" });
};

const generateOTP = () => {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}

module.exports = {
    bcryptPassword,
    matchPassword,
    accessToken,
    generateOTP,
    generateRefreshToken
}