const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const bcryptPassword = async (password,) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

const matchPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

const generateToken = (id) => {
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