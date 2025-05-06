import React, { Fragment, useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { workoutContext } from "../store/WorkoutPlanContextProvider";
import DemoLottieFileCard from "./../components/DemoLottieFileCard";

const exercises = [
  "Bicycle Crunches",
  "Burpees Exercise",
  "Crunches Exercise",
  "Curtsy Lunges",
  "Jumping Jacks",
  "Knee Push-ups",
  "Lunges Exercise",
  "Plank Exercise",
  "Plie Squats",
  "Side Lunges",
  "Squat Jumps",
  "Squats Exercise",
  "Standing Side Bends",
  "Step-ups",
  "Wall Sits",
];

function SettingsScreen() {
  const { workoutPlans } = useContext(workoutContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        {exercises?.map((exercise, idx) => (
          <Fragment key={idx}>
            <DemoLottieFileCard exerciseName={exercise} />
            <Text key={idx}>{exercise || "Exercise not Found"}</Text>
          </Fragment>
        ))}
      </View>
      {/* <View style={styles.container}>
        {workoutPlans?.[0]?.days?.[18]?.exercises?.map((exercise, idx) => (
          <Fragment key={idx}>
            <DemoLottieFileCard
              exerciseName={exercise?.exerciseId?.exerciseName}
            />
            <Text key={idx}>
              {exercise?.exerciseId?.exerciseName || "Exercise not Found"}
            </Text>
          </Fragment>
        ))}
      </View> */}
    </ScrollView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
