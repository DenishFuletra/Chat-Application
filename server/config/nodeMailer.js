const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'fuletradenish@gmail.com',
        pass: 'DENY2497@'
    }
});

const mailOptions = {
    from: 'fuletradenish@gmail.com',
    to: 'dfuletra24@gmail.com',
    subject: 'Hello from Nodemailer',
    text: 'This is a test email sent from Nodemailer with Gmail.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});