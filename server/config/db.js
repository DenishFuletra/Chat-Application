const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOURL);
    } catch (err) {
        console.log(err.message)
    }
};

module.exports = connectDB;
