const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  activity: {
    type: String,
  },
  goals: {
    type: String,
  },
  workoutsplit: {
    type: String,
  },
  experience: {
    type: String,
  },
  Workouts: {
    type: Array,
  },
});

module.exports = mongoose.model("Users", userSchema);
