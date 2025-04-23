const mongoose = require("mongoose");

const workoutPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Workout plan name must be given"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category must be given"],
      unique: true,
      trim: true,
    },
    days: [
      {
        day: {
          type: Number,
          required: true,
        },
        dayType: {
          type: String,
          required: [true, "Day type must be given"],
          trim: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        exercises: [
          {
            exerciseId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Exercise",
              required: true,
            },
            reps: {
              type: Number,
              nullable: true,
              required: true,
            },
            time: {
              type: Number,
              nullable: true,
              required: true,
            },
          },
        ],
      },
    ],
  }
  //   { collection: "workoutplans" }
);

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);
module.exports = WorkoutPlan;
