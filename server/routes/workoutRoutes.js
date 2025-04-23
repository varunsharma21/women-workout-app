const express = require("express");
const workoutPlanControllers = require("./../controllers/workoutPlanControllers");

const router = express.Router();

router.route("/").get(workoutPlanControllers.getAllWorkoutPlans);

module.exports = router;
