const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const database = async () => {
  const result = await mongoose.connect(process.env.MONGOURL);
  return result;
};

module.exports = database;
