const mongoose = require("mongoose");

const user = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  address: {
    required: false,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  date_of_birth: {
    required: false,
    type: Date,
  },
  password: { type: String, required: true },

  roles: { type: Array, required: true },
});

module.exports = mongoose.model("users", user);
