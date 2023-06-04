const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);

app.use('/api/chat', chatRoutes);

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
}).catch((err) => {
    console.log(err.message)
})