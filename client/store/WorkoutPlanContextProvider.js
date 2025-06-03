import { createContext, useEffect, useState } from "react";
import cacheLottieFiles from "../utils/cacheLottieFiles";
import workoutPlansJson from "./../assets/data/workouts.json";

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
    console.log("🔄 fetchWorkoutPlans started...");
    setWorkoutPlansLoading(true);

    try {
      console.log("📦 Reading local JSON data...");

      const transformedData = workoutPlansJson.data.workoutPlans.map(
        (workoutPlan) => {
          return {
            id: workoutPlan._id,
            name: workoutPlan.name,
            category: workoutPlan.category,
            days: workoutPlan.days,
          };
        }
      );

      console.log("✅ Transformed data available");

      setWorkoutPlans(transformedData);
      console.log("🏋️‍♂️ Workout plans set successfully.");
    } catch (err) {
      console.log(
        "💥 Error caught while reading local workout plans:",
        err.message
      );
      setWorkoutPlanError(err.message);
    }

    setWorkoutPlansLoading(false);
    console.log("✅ fetchWorkoutPlans ended. Loading set to false.");
  };

  /******************************
  const fetchWorkoutPlans = async () => {
    console.log("🔄 fetchWorkoutPlans started...");
    setWorkoutPlansLoading(true);
    try {
      console.log("🚀 Inside try block, initiating fetch...");

      const response = await fetch(
        "https://raw.githubusercontent.com/varunsharma21/ww-json/main/workout-plans.json"
      );

      console.log("📡 Fetch completed. Status:", response.status);

      if (!response.ok) {
        console.log("❌ Response not OK:", response.status);
        throw new Error("Something is wrong with workout plans!");
      }

      const data = await response.json();
      console.log("📦 Raw data received:");

      const transformedData = data.data.workoutPlans.map((workoutPlan) => {
        return {
          id: workoutPlan._id,
          name: workoutPlan.name,
          category: workoutPlan.category,
          days: workoutPlan.days,
        };
      });

      console.log("✅ Transformed data available");

      setWorkoutPlans(transformedData);
      console.log("🏋️‍♂️ Workout plans set successfully.");
    } catch (err) {
      console.log("💥 Error caught while fetching workout plans:", err.message);
      setWorkoutPlanError(err.message);
    }
    setWorkoutPlansLoading(false);
    console.log("✅ fetchWorkoutPlans ended. Loading set to false.");
  };

  **************************/

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

// import { createContext, useEffect, useState } from "react";
// import cacheLottieFiles from "../utils/cacheLottieFiles";

// export const workoutContext = createContext("");

// function WorkoutPlanContextProvider({ children }) {
//   const [isWorkoutPlansLoading, setWorkoutPlansLoading] = useState(true);
//   const [workoutPlanError, setWorkoutPlanError] = useState(null);
//   const [workoutPlans, setWorkoutPlans] = useState([]);
//   const [isExercisesLoading, setIsExercisesLoading] = useState(true);
//   const [exercisesError, setExercisesError] = useState(null);
//   const [exercises, setExercises] = useState([]);

//   const fetchAllExercises = async () => {
//     setIsExercisesLoading(true);
//     try {
//       const response = await fetch(
//         "http://192.168.29.224:5500/api/v1/exercises/"
//       );

//       if (!response.ok) {
//         throw new Error("Something is wrong with exercises!");
//       }

//       const data = await response.json();
//       console.log("hi from exercises");

//       const transformedData = data.data.exercises.map((exercise) => {
//         return {
//           id: exercise._id,
//           exerciseName: exercise.exerciseName,
//           lottieLink: exercise.lottieLink,
//           youtubeVideoId: exercise.youtubeVideoId,
//           youtubeLink: exercise.youtubeLink,
//           instructions: exercise.instructions,
//         };
//       });
//       setExercises(transformedData);
//       cacheLottieFiles(transformedData);
//     } catch (err) {
//       setExercisesError(err.message);
//     }
//     setIsExercisesLoading(false);
//   };

//   const fetchWorkoutPlans = async () => {
//     console.log("Fetching Started...");
//     setWorkoutPlansLoading(true);
//     try {
//       console.log("In try block");
//       const response = await fetch(
//         "http://192.168.29.224:5500/api/v1/workouts/"
//       );

//       if (!response.ok) {
//         console.log("response is not ok", response.status);
//         throw new Error("Something is wrong with workout plans!");
//       }

//       console.log("Hi from workout fetcher");
//       const data = await response.json();

//       const transformedData = data.data.workoutPlans.map((workoutPlan) => {
//         return {
//           id: workoutPlan._id,
//           name: workoutPlan.name,
//           category: workoutPlan.category,
//           days: workoutPlan.days,
//         };
//       });
//       setWorkoutPlans(transformedData);
//       console.log("Workouts fetched!");
//     } catch (err) {
//       setWorkoutPlanError(err.message);
//     }
//     setWorkoutPlansLoading(false);
//   };

//   useEffect(() => {
//     // fetchAllExercises();
//     fetchWorkoutPlans();
//   }, []);

//   // Consider removing setState functions.
//   const initialValue = {
//     isWorkoutPlansLoading,
//     setWorkoutPlansLoading,
//     workoutPlanError,
//     setWorkoutPlanError,
//     workoutPlans,
//     setWorkoutPlans,
//     isExercisesLoading,
//     setIsExercisesLoading,
//     exercisesError,
//     setExercisesError,
//     exercises,
//     setExercises,
//   };

//   return (
//     <workoutContext.Provider value={initialValue}>
//       {children}
//     </workoutContext.Provider>
//   );
// }

// export default WorkoutPlanContextProvider;
