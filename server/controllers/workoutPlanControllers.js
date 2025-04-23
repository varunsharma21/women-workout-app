const WorkoutPlan = require("./../models/workoutModel");

exports.getAllWorkoutPlans = async (req, res) => {
  try {
    // const rawPlans = await WorkoutPlan.find(); // no populate
    // console.log("🔍 Raw workout plans from DB:", rawPlans);

    const workoutPlans = await WorkoutPlan.find().populate(
      "days.exercises.exerciseId"
    );

    res.status(200).json({
      status: "success",
      length: workoutPlans.length,
      data: {
        workoutPlans,
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
