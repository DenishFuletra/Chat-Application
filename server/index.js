const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectDb = require("./config/db.js");
const router = require("./Routes/Routes");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/user", router);

app.get("*", function (req, res) {
  res.status(404).send("<h1>Page not Found</h1");
});

const port = process.env.PORT;

ConnectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
