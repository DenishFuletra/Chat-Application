const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();
const db = require('./config/db');

const app = express();

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
const server = app.listen(7500, '0.0.0.0', () => {
    console.log('Server listening on http://localhost:7500');
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', (socket) => {
    console.log('Connected to socket.io');

    socket.on('setUp', (user) => {
        socket.join(user.id);
        //console.log(user.id);
        socket.emit('connected');
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined room', room);
    })

    socket.on('new message', (newMessage) => {
        console.log(newMessage);
        var chat = newMessage.chat;

        if (!chat.users) {
            console.log('chat users is not available');
            return;
        }

        chat.users.forEach(user => {
            if (user._id == newMessage.sender._id) {
                return;
            }
            console.log('deny')
            socket.in(user._id).emit('message received', newMessage);
        })

    });
})

db()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log(err.message);
    });
