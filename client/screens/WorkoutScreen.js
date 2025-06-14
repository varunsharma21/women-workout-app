import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, windowHeight, windowWidth } from "../constants";
import LottieView from "lottie-react-native";
import { lottieMap } from "../utils/lottieMap";

function WorkoutScreen(props) {
  const {
    exercises,
    currentExercise,
    isResting,
    setIsResting,
    restTime,
    reps,
    time,
  } = props.exerciseInfo;
  const source = lottieMap[currentExercise?.exerciseName];

  return (
    <View style={styles.container}>
      <View style={styles.lottieFileContainer}>
        <LottieView source={source} autoPlay loop style={styles.lottieFile} />
      </View>
      {reps && (
        <Text style={styles.reps}>
          × {reps} <Text style={styles.title}></Text>
        </Text>
      )}
      {time && <Text style={styles.reps}>{time}s </Text>}
      <Text style={styles.title}>{currentExercise?.exerciseName}</Text>
      <Text style={styles.instructionTitle}>Instructions</Text>
      <Text style={styles.instructions}>
        - {currentExercise?.instructions[0]}
      </Text>
      <Text style={styles.instructions}>
        - {currentExercise?.instructions[1]}
      </Text>

      <Pressable style={styles.nextButton} onPress={() => setIsResting(true)}>
        <View>
          <Text style={styles.buttonTitle}>Next</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: 20,
  },
  lottieFile: {
    height: windowHeight * 0.4,
    width: windowWidth * 0.9,
    marginTop: 10,
  },
  lottieFileContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
    marginBottom: 20,
  },
  reps: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 7,
    // color: "grey",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  instructionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 0,
    color: "grey",
  },
  instructions: {
    fontSize: 18,
    marginBottom: 0,
    color: "grey",
  },
  nextButton: {
    backgroundColor: colors.pink100,
    padding: 15,
    marginTop: 20,
    // position: "absolute",
    // bottom: 20,
    // left: (windowWidth - windowWidth * 0.5) / 2,
    width: windowWidth * 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    alignSelf: "flex-end",
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
