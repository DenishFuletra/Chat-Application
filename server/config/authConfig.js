const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const bcryptPassword = async (password,) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

const matchPassword = async (password, hashPassword) => {
    bcrypt.compare(password, hashPassword, function (err, result) {
        return result;
    });


}

const generateToken = (id) => {
    console.log(process.env.JWTSECRET);
    return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: "2h" })
}

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
    generateToken,
    generateOTP,
}