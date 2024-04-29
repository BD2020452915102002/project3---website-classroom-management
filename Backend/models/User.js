const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 30,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 200,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 8,
      maxLength: 1024,
    },
    role: {
      type: String,
      default: "student",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
