const User = require('../models/userModel')
const { bcryptPassword, matchPassword, generateToken, generateOTP } = require('../config/authConfig');
const OTP = require('../models/otpModel');
const sendEmail = require('../config/nodeMailer');

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
                        picture: existUser.picture,
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

const getAllUsers = async (req, res) => {
    try {
        const keywords = req.query.search ?
            {
                $or: [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } },
                ],
            } : {};

        const users = await User.find(keywords).select('-password').find({ _id: { $ne: req.user._id } })
        return res.send(users);
    }
    catch (err) {
        console.log(err.message);
    }
}

const resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const existUser = await User.find({ _id: req.user._id });
        //console.log(existUser[0].password);

        if (await matchPassword(oldPassword, existUser[0].password) === false) {
            return res.status(400).send({ message: 'Old password does not match with the Existing password' })
        }
        const password = await bcryptPassword(newPassword);

        const result = await User.findByIdAndUpdate(req.user._id, { password: password });
        return res.status(200).send({ message: 'Your password has been successfully updated' })

    }
    catch (err) {
        console.log(err.message);
    }
}

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(404).send({ message: 'Please provide Email' })
        }
        const otp = generateOTP();
        const emailSend = await sendEmail(email, otp);
        console.log(emailSend);
        if (emailSend) {
            await OTP.create({ email: email, otp: otp });
            return res.status(201).send({ message: 'OTP sent successfully to given email address' });
        }
        return res.status(500).send({ message: 'Internal Server Error' });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: err.message });
    }
}

module.exports = {
    registerUser,
    authUser,
    getAllUsers,
    resetPassword,
    sendOTP
}