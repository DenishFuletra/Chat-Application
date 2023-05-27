const User = require('../models/userModel')
const { bcryptPassword, matchPassword, generateToken } = require('../config/authConfig');




const registerUser = async (req, res) => {
    try {
        let { name, email, password, profile } = req.body;

        if (!name || !email || !password) {
            res.status(400).send({ message: 'Please Enter all required fields' })
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).send({ message: 'User already exists' })
        }
        password = await bcryptPassword(password);
        const user = await User.create({ name, email, password, profile });
        if (user) {
            return res.status(201).send({
                message: 'User Successfully registered', userData: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            })

        } else {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(404).send({ message: 'No user Found! Please Register with your email address' })
        } else if (existUser) {
            if (await matchPassword(password, existUser.password)) {
                return res.status(200).send({
                    message: 'Login successfully',
                    userData: {
                        id: existUser._id,
                        name: existUser.name,
                        email: existUser.email,
                        token: generateToken(existUser._id)
                    }
                })
            } else {
                return res.status(400).send({ message: 'Invalid username or password' });
            }
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    registerUser,
    authUser
}