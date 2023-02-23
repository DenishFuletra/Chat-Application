const mongoose = require("mongoose");

const MessageModels = mongoose.Schema(
  {
    sender: {
      typr: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: { type: String, trim: true },
    chat: {
      typr: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("message", MessageModels);

module.exports = Message;
