const mongoose = require("../db/mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [4, "name should atleast have 4 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(val) {
      if (validator.isEmail(val) == false) throw new Error("Invalid Email");
    },
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
