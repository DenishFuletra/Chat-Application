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

        message = await message.populate('sender', 'name picture');
        message = await message.populate('chat');
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
const getAllMessages = async (req, res) => {
    try {

        const result = await Message.find({ chat: req.params.chatId }).populate('sender', 'name picture').populate('chat');
        return res.status(200).send(result);

    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

module.exports = {
    sendMessage,
    getAllMessages
}