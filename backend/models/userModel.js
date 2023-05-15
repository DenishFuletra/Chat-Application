const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: string, required: true },
        email: { type: string, required: true },
        password: { type: string, required: true },
        picture: { type: string, required: true, default: "https://img.freepik.com/free-icon/user_318-563642.jpg" },
    },
    {
        timestamps: true
    }
)


const user = mongoose.model("User", userSchema);

module.exports = user;