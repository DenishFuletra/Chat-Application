const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const port = 7500;

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use((req, res, next) => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message });
});

const server = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    console.log('Connected to socket.io');

    socket.on('setUp', (user) => {
        socket.join(user.id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined room', room);
    });

    socket.on('typing', (room, user) => {
        console.log(room)
        console.log(user)
        socket.in(room).emit("typing", user);
        console.log('typing');

    })
    socket.on('stop typing', (room, user) => {
        socket.in(room).emit("stop typing", user);
        console.log('stop typing');

    })

    socket.on('new message', (newMessage) => {
        const chat = newMessage.chat;

        if (!chat.users) {
            console.log('Chat users are not available');
            return;
        }

        chat.users.forEach((user) => {
            if (user._id == newMessage.sender._id) {
                return;
            }

            socket.in(chat._id).emit('message received', newMessage);
            console.log('deny');
        });
    });
});

db()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log(err.message);
    });
