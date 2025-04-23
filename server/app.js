const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const workoutPlansRouter = require("./routes/workoutRoutes");
const exercisesRouter = require("./routes/exercisesRoutes");

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Hello from the middleware 1 of women-workout-app.");
  next();
});

// Routes
app.use("/api/v1/workouts", workoutPlansRouter);
app.use("/api/v1/exercises", exercisesRouter);

module.exports = app;
