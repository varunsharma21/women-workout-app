import LottieView from "lottie-react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import WorkoutScreen from "./WorkoutScreen";
import { colors } from "./../constants";
import { completedWorkoutsContext } from "../store/CompletedWorkoutsContextProvider";
import WorkoutCompleteScreen from "./WorkoutCompleteScreen";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageUtils";
import { userInfoContext } from "../store/UserInfoContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { useRef } from "react";
import RestScreen from "./RestScreen";

function WorkoutPlayerScreen({ route, navigation }) {
  const exercises = route.params || [];
  const { workoutCount, setWorkoutCount } = useContext(userInfoContext);
  const { markWorkoutAsCompleted } = useContext(completedWorkoutsContext);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(30);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
  const [error, setError] = useState(null);

  //   console.log(exercises);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTintColor: "grey",
    });
  }, []);

  const soundRef = useRef(null);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./../assets/short-whistle-audio.wav")
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handleWorkoutCompletion = () => {
    try {
      if (!exercises?.[0]?.workoutPlanId || !exercises?.[0]?.day) {
        throw new Error("Missing workout information");
      }
      markWorkoutAsCompleted(exercises[0].workoutPlanId, exercises[0].day);
      setIsWorkoutComplete(true);
    } catch (err) {
      setError("Failed to mark workout as completed");
      console.error("Workout completion error:", err);
    }
  };

  useEffect(() => {
    let timer;
    if (isResting) {
      timer = setInterval(() => {
        setRestTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsResting(false);
            playSound();
            setRestTime(30);
            setCurrentExerciseIndex((prevIndex) => {
              const nextIndex = prevIndex + 1;
              if (nextIndex >= exercises.length) {
                handleWorkoutCompletion();
                return prevIndex;
              }
              return nextIndex;
            });
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isResting]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  useEffect(() => {
    if (!isWorkoutComplete) return;

    const updateAndFetchWorkoutCount = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("workoutCount");
        const currentCount = storedValue ? parseInt(storedValue) : 0;
        const newCount = currentCount + 1;
        await saveToLocalStorage("workoutCount", newCount);

        const updatedCount = await getFromLocalStorage("workoutCount");
        if (updatedCount !== null) {
          setWorkoutCount(updatedCount);
        }
      } catch (e) {
        console.error("Error updating workout count", e);
      }
    };

    updateAndFetchWorkoutCount();
  }, [isWorkoutComplete]);

  if (isWorkoutComplete) {
    return <WorkoutCompleteScreen />;
  }

  if (!exercises || exercises.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No exercises found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  // if (currentExerciseIndex >= exercises.length) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text style={styles.completionText}>Workout Complete 🎉</Text>
  //       <Button title="Back to Home" onPress={() => navigation.goBack()} />
  //     </View>
  //   );
  // }

  const currentExercise = exercises[currentExerciseIndex]?.exerciseId;
  const isLastExercise = currentExerciseIndex === exercises.length - 1;

  if (!currentExercise) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Invalid exercise data</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const reps = exercises[currentExerciseIndex]?.reps;
  const time = exercises[currentExerciseIndex]?.time;

  const exerciseInfo = {
    currentExercise,
    exercises,
    isResting,
    setIsResting: (value) => {
      if (isLastExercise) {
        handleWorkoutCompletion();
      } else {
        setIsResting(value);
      }
    },
    reps,
    time,
    restTime,
  };

  return (
    <View style={styles.centered}>
      {isResting ? (
        <RestScreen restTime={restTime} />
      ) : (
        <WorkoutScreen exerciseInfo={exerciseInfo} />
      )}
    </View>
  );
}

export default WorkoutPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  timer: {
    fontSize: 52,
    fontWeight: "700",
  },
  restingScreen: {
    padding: 50,
    borderWidth: 10,
    borderColor: colors.primaryButtonColor,
    borderRadius: "50%",
    borderColor: "#f46c99",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  completionText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
