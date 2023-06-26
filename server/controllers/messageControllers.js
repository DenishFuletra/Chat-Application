const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const message = require('../models/messageModel');
const sendMessage = async (req, res) => {
    try {

        const { content, chatId } = req.body;
        if (!content || !chatId) {
            return res.sent(400).send({ message: 'Invalid data passed into request!' })
        }

        let newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId
        }

        let message = await Message.create(newMessage);

        message = await message.populate('sender', 'name pic').execPopulate();
        message = await message.populate('chat').execPopulate();
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email',
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        return res.status(200).send(message);

    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

module.exports = {
    sendMessage
}