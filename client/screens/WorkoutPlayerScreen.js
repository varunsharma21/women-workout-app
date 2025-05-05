import LottieView from "lottie-react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import WorkoutScreen from "./WorkoutScreen";
import { colors } from "./../constants";

function WorkoutPlayerScreen({ route, navigation }) {
  const exercises = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(30);

  //   console.log(exercises);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTintColor: "grey",
    });
  }, []);

  useEffect(() => {
    let timer;
    if (isResting) {
      if (restTime > 0) {
        timer = setTimeout(() => setRestTime((prev) => prev - 1), 1000);
      } else {
        setIsResting(false);
        setRestTime(30);
        setCurrentIndex((prev) => prev + 1);
      }
    }
    return () => clearTimeout(timer);
  }, [isResting, restTime]);

  if (currentIndex >= exercises?.length) {
    return (
      <View style={styles.centered}>
        <Text>Workout Complete 🎉</Text>
        <Button title="Back to Home" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const currentExercise = exercises?.[currentIndex]?.exerciseId;

  // One will be definitely 'null' amongst reps and time.
  const reps = exercises?.[currentIndex]?.reps;
  const time = exercises?.[currentIndex]?.time;

  const exerciseInfo = {
    currentExercise,
    exercises,
    isResting,
    setIsResting,
    reps,
    time,
    restTime,
  };

  return (
    <View style={styles.centered}>
      {isResting ? (
        <View style={styles.restingScreen}>
          <Text style={styles.title}>Rest Time</Text>
          <Text style={styles.timer}>{restTime}s</Text>
        </View>
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
});
