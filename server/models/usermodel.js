const mongoose = require("mongoose");

//First Create the Schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  availableMoney: {
    type: Number,
    default: 5000,
  },
});

//Create a model from the scheme

const User = mongoose.model("User", userSchema);
module.exports = User;
