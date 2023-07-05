const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
        user: 'dfuletra24@gmail.com',
        pass: 'hhstzhioujffrrma'
    }
});

const mailOptions = {
    from: 'dfuletra24@gmail.com',
    to: 'yogitakurude94@gmail.com',
    subject: 'Sign-in credentials',
    text: 'Your Signin OTP for Chat-App is 411045.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});