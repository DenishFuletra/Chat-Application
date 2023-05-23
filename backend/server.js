const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(7000, () => {
    try {
        console.log("server is running on port 7000");
    }
    catch (err) {
        console.log(err);
    }
})