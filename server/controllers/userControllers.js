const User = require('../models/userModel')
const { bcryptPassword, matchPassword, accessToken, generateOTP, generateRefreshToken } = require('../config/authConfig');
const OTP = require('../models/otpModel');
const sendEmail = require('../config/nodeMailer');
require('dotenv').config();
const axios = require('axios');
const qs = require('qs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        //console.log(req.body);
        let { name, email, password, profile, otp } = req.body;

        if (!name || !email || !password || !otp) {
            res.status(400).send({ message: 'Please Enter all required fields' })
        }

        const databaseOTP = await OTP.findOne({ email: email }).sort({ _id: -1 }).limit(1);

        if (databaseOTP.otp != otp) {
            return res.status(400).send({ message: 'Please provide a valid OTP' })
        }

        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).send({ message: 'User already exists' })
        }
        password = await bcryptPassword(password);
        const user = await User.create({ name, email, password, profile });
        if (user) {
            await OTP.deleteOne({ _id: databaseOTP._id });
            return res.status(201).send({
                message: 'User Successfully registered', userData: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profile: user.profile
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
        // console.log('exist', existUser);
        if (!existUser) {
            return res.status(404).send({ message: 'No user Found! Please Register with your email address' })
        } else if (existUser) {
            // console.log('deny')
            if (await matchPassword(password, existUser.password)) {
                return res.status(200).send({
                    message: 'Login successfully',
                    userData: {
                        id: existUser._id,
                        name: existUser.name,
                        email: existUser.email,
                        profile: existUser.profile,
                        token: accessToken(existUser._id, existUser.name, existUser.email),
                        refresh_token: generateRefreshToken(existUser._id, existUser.name, existUser.email)
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
        console.log(email);
        if (!email) {
            return res.status(404).send({ message: 'Please provide Email' })
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).send({ message: 'User already exists' })
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

const googleAuth = async (req, res) => {
    try {
        const code = req.query.code;

        if (!code) {
            return res.status(400).send('Authorization code missing');
        }

        const url = 'https://oauth2.googleapis.com/token';
        const data = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
            grant_type: 'authorization_code'
        };

        try {
            const response = await axios.post(url, qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });

            const { id_token, access_token } = response.data;

            const userDataResponse = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            console.log(userDataResponse);

            if (!userDataResponse.data.verified_email) {
                return res.status(403).send({ message: 'Google account is not verified' });
            }

            let existUser = await User.findOne({ email: userDataResponse.data.email }).select('-password');

            if (!existUser) {
                existUser = await User.create({
                    name: userDataResponse.data.name,
                    email: userDataResponse.data.email,
                    profile: userDataResponse.data.picture,
                });
            }

            //console.log(existUser)

            res.cookie('id', existUser._id);
            res.cookie('name', existUser.name);
            res.cookie('email', existUser.email);
            res.cookie('profile', existUser.profile);
            res.cookie('token', accessToken(existUser._id));
            res.cookie('refresh_token', generateRefreshToken(existUser._id))

            return res.redirect('http://localhost:3000/chats');

        } catch (error) {
            console.log('Error during token exchange:', error.message);
            return res.status(500).send('Error during token exchange');
        }
    } catch (err) {
        console.log('Error in googleAuth:', err.message);
        return res.status(500).send('Internal server error');
    }
};


const refreshToken = async (req, res) => {
    try {
        console.log(process.env.JWTSECRET);
        console.log("req.body", req.body);
        const { token, refreshToken } = req.body;
        const refreshTokeUser = await jwt.decode(refreshToken, process.env.JWTSECRET);
        const tokenUser = await jwt.decode(token, process.env.JWTSECRET);
        console.log("refreshTokeUser", refreshTokeUser);
        console.log("tokenUser", tokenUser);
        if (refreshTokeUser.id === tokenUser.id && refreshTokeUser.email === tokenUser.email) {
            const existUser = await User.findOne({ _id: refreshTokeUser.id });
            if (!existUser) {
                return res.status(404).send({ message: 'No user Found! Please Login again!' })
            }
            return res.status(200).send({
                userData: {
                    id: existUser._id,
                    name: `${existUser.name}/deny`,
                    email: existUser.email,
                    profile: existUser.profile,
                    token: accessToken(existUser._id, existUser.name, existUser.email),
                    refresh_token: generateRefreshToken(existUser._id, existUser.name, existUser.email)
                }
            })
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
};


module.exports = {
    registerUser,
    authUser,
    getAllUsers,
    resetPassword,
    sendOTP,
    googleAuth,
    refreshToken
}