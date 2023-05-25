const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: "10d" })
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profile } = req.body;

        if (!name || !email || !password) {
            res.status(400).send('Please Enter all required fields')
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).send('User already exists')
        }
        const user = await User.create({ name, email, password, profile });
        if (user) {
            return res.status(201).send({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            return res.status(500).send('Internal Server Error');
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    registerUser
}