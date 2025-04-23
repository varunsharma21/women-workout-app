const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    unique: true,
    required: [true, "An exercise must be given."],
    trim: true,
  },
  lottieLink: {
    type: String,
    unique: true,
    required: [true, "A lottie link must be given."],
    trim: true,
  },
  youtubeVideoId: {
    type: String,
    unique: true,
    required: [true, "A lottie link must be given."],
    trim: true,
  },
  youtubeLink: {
    type: String,
    unique: true,
    required: [true, "A lottie link must be given."],
    trim: true,
  },
  instructions: {
    type: [String],
    required: [true, "Instructions must be given"],
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
