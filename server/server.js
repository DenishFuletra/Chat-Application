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

app.use('/api/mesage', messageRoutes);

app.use((req, res, next) => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message });
});

db().then(() => {
    app.listen(7000, '0.0.0.0', () => {
        console.log('server listening on http://localhost7000')
    });
    server.timeout = 10000; // Set timeout to 60 seconds
    server.headersTimeout = 10000; // Set headers timeout to 65 seconds
}).catch((err) => {
    console.log(err.message)
})