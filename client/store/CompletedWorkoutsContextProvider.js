import React, { createContext, useState, useEffect } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageUtils";

export const completedWorkoutsContext = createContext({});

function CompletedWorkoutsContextProvider({ children }) {
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCompletedWorkouts = async () => {
      try {
        setIsLoading(true);
        const savedWorkouts = await getFromLocalStorage("completedWorkouts");
        if (savedWorkouts && typeof savedWorkouts === "object") {
          setCompletedWorkouts(savedWorkouts);
        } else {
          setCompletedWorkouts({});
        }
      } catch (err) {
        console.error("Error loading completed workouts:", err);
        setError("Failed to load workout data");
        setCompletedWorkouts({});
      } finally {
        setIsLoading(false);
      }
    };
    loadCompletedWorkouts();
  }, []);

  const markWorkoutAsCompleted = async (workoutPlanId, dayNumber) => {
    try {
      if (!workoutPlanId || !dayNumber) {
        throw new Error("Invalid workout information");
      }

      const key = `${workoutPlanId}-${dayNumber}`;
      const updatedWorkouts = {
        ...completedWorkouts,
        [key]: true,
      };

      setCompletedWorkouts(updatedWorkouts);
      await saveToLocalStorage("completedWorkouts", updatedWorkouts);
    } catch (err) {
      console.error("Error marking workout as completed:", err);
      throw err;
    }
  };

  const isWorkoutCompleted = (workoutPlanId, dayNumber) => {
    try {
      if (!workoutPlanId || !dayNumber) {
        return false;
      }
      return completedWorkouts[`${workoutPlanId}-${dayNumber}`] || false;
    } catch (err) {
      console.error("Error checking workout completion:", err);
      return false;
    }
  };

  const contextValue = {
    completedWorkouts,
    markWorkoutAsCompleted,
    isWorkoutCompleted,
    isLoading,
    error,
  };

  return (
    <completedWorkoutsContext.Provider value={contextValue}>
      {children}
    </completedWorkoutsContext.Provider>
  );
}

export default CompletedWorkoutsContextProvider;
