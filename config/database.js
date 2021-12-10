const mongoose = require("mongoose");
const config = require("./config");

exports.connect = () => {
  mongoose
    .connect(config.DATABASE_URL)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error when connecting to the server");
      console.log(err);
      process.exit();
    });
};
