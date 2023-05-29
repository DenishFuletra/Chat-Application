const Chat = require('../models/chatModel');
const User = require('../models/userModel');



const createGroup = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err.message);
    }
}
const accessChat = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send({ message: 'Please provide user ID' });
        }

        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }

            ]
        }).populate('users,"-password').populate('latestMessage');

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name pic email',
        })

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            let chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };
        }

        const createdChat = await Chat.create(chatData);

        const fullChat = await Chat.findOne({ _id: createdChat.id }).populate('users,"-password')

    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    createGroup,
    accessChat
}