import { createContext, useEffect, useState } from "react";
import cacheLottieFiles from "../utils/cacheLottieFiles";

export const workoutContext = createContext("");

function WorkoutPlanContextProvider({ children }) {
  const [isWorkoutPlansLoading, setWorkoutPlansLoading] = useState(true);
  const [workoutPlanError, setWorkoutPlanError] = useState(null);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [isExercisesLoading, setIsExercisesLoading] = useState(true);
  const [exercisesError, setExercisesError] = useState(null);
  const [exercises, setExercises] = useState([]);

  const fetchAllExercises = async () => {
    setIsExercisesLoading(true);
    try {
      const response = await fetch(
        "http://192.168.29.224:5500/api/v1/exercises/"
      );

      if (!response.ok) {
        throw new Error("Something is wrong with exercises!");
      }

      const data = await response.json();
      console.log("hi from exercises");

      const transformedData = data.data.exercises.map((exercise) => {
        return {
          id: exercise._id,
          exerciseName: exercise.exerciseName,
          lottieLink: exercise.lottieLink,
          youtubeVideoId: exercise.youtubeVideoId,
          youtubeLink: exercise.youtubeLink,
          instructions: exercise.instructions,
        };
      });
      setExercises(transformedData);
      cacheLottieFiles(transformedData);
    } catch (err) {
      setExercisesError(err.message);
    }
    setIsExercisesLoading(false);
  };

  const fetchWorkoutPlans = async () => {
    setWorkoutPlansLoading(true);
    try {
      const response = await fetch(
        "http://192.168.29.224:5500/api/v1/workouts/"
      );

      if (!response.ok) {
        throw new Error("Something is wrong with workout plans!");
      }

      const data = await response.json();
      console.log("Hi from workout fetcher");

      const transformedData = data.data.workoutPlans.map((workoutPlan) => {
        return {
          id: workoutPlan._id,
          name: workoutPlan.name,
          category: workoutPlan.category,
          days: workoutPlan.days,
        };
      });
      setWorkoutPlans(transformedData);
    } catch (err) {
      setWorkoutPlanError(err.message);
    }
    setWorkoutPlansLoading(false);
  };

  useEffect(() => {
    // fetchAllExercises();
    fetchWorkoutPlans();
  }, []);

  // Consider removing setState functions.
  const initialValue = {
    isWorkoutPlansLoading,
    setWorkoutPlansLoading,
    workoutPlanError,
    setWorkoutPlanError,
    workoutPlans,
    setWorkoutPlans,
    isExercisesLoading,
    setIsExercisesLoading,
    exercisesError,
    setExercisesError,
    exercises,
    setExercises,
  };

  return (
    <workoutContext.Provider value={initialValue}>
      {children}
    </workoutContext.Provider>
  );
}

export default WorkoutPlanContextProvider;
