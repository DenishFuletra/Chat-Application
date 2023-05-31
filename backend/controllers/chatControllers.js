const Chat = require('../models/chatModel');
const User = require('../models/userModel');



const createGroupChat = async (req, res) => {
    try {
        if (!req.body.users || !req.body.name) {
            return res.status(400).send({ message: "Please fill all the details" });
        }
        let users = req.body.users;
        if (users.length < 2) {
            return res.status(400).send({ message: 'More than two users required for creating the group chat' });
        }

        users.push(req.user);

        const groupChat = await Chat.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user
        })

        const fullChat = await Chat.find({ _id: groupChat._id }).populate('users', '-password').populate('groupAdmin', '-password');

        return res.status(200).send(fullChat);
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
        }).populate('users', '-password').populate('latestMessage');

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name picture email',
        })

        if (isChat.length > 0) {
            res.status(200).send(isChat[0]);
        } else {
            let chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };
            try {
                const createdChat = await Chat.create(chatData);
                const fullChat = await Chat.findOne({ _id: createdChat.id }).populate('users', '-password');
                res.status(200).send(fullChat);
            } catch (err) {
                console.log(err.message);
            }
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

const fetchChat = async (req, res) => {
    try {
        let result = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } }).populate('users', '-password').populate('groupAdmin', '-password').populate('latestMessage').sort({ updatedAt: -1 })

        result = await User.populate(result, {
            path: 'latestMessage.sender',
            select: 'name email picture'
        })
        return res.status(200).send(result);


    }
    catch (err) {
        console.log(err.message);
    }
}

const a = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err.message);
    }
}


module.exports = {
    createGroupChat,
    accessChat,
    fetchChat
}