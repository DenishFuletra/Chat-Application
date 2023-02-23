const mongoose = require("mongoose");

const UserModels = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      type: String,
      default:
        "https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserModels);

module.exports = User;