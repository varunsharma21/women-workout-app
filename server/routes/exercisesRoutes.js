const express = require("express");
const exerciseControllers = require("./../controllers/exerciseControllers");

const router = express.Router();

router.route("/").get(exerciseControllers.getAllExercises);

module.exports = router;
