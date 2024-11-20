const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./user");
//const { likeItem } = require("../controllers/dragonItems");

const dragonItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Please enter a valid URL",
    },
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  species: {
    type: String,
    required: true,
    enum: ["chromatic", "metallic"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("dragonItem", dragonItemSchema);
