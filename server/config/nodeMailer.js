require('dotenv').config();

const nodemailer = require('nodemailer');
//console.log(process.env.EMAIL);

const transporter = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});


const sendEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Sign-in credentials',
        text: `Your Signin OTP for Chat-App is ${otp}.`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // console.error('Error:', error);
                reject(error);
            } else {
                //console.log('Email sent:', info.response);
                resolve(info.response);
            }
        });
    });
};









module.exports = sendEmail;