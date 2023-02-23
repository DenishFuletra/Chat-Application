const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is started");
});
