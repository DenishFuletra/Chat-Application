const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes')
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);

db().then(() => {
    app.listen(7000, () => {
        console.log('server listening on http://localhost7000')
    });
}).catch((err) => {
    console.log(err.message)
})