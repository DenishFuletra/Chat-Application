const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, trim: true },
        profile: { type: String, default: "https://img.freepik.com/free-icon/user_318-563642.jpg" },
    },
    {
        timestamps: true
    }
)


const user = mongoose.model("User", userSchema);

module.exports = user;