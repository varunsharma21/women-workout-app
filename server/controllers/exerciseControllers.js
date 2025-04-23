const Exercise = require("./../models/exerciseModel");

exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();

    res.status(200).json({
      status: "success",
      length: exercises.length,
      data: {
        exercises,
      },
    });
  } catch (err) {
    console.log("🔥 Error in controller:", err);
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
