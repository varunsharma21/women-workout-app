import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { lottieMap } from "../utils/lottieMap";

function ExerciseCard(props) {
  const { exerciseInfo } = props;

  const exerciseName = exerciseInfo?.exerciseName;
  const source = lottieMap[exerciseName];

  if (!source) return null;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableContainer}
        android_ripple={{ color: "#ccc" }}
      >
        <LottieView
          source={source}
          loop
          autoPlay
          style={{ height: 100, width: 100 }}
        />
        <View style={styles.exerciseName}>
          <Text style={styles.text}>{exerciseInfo?.exerciseName}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ExerciseCard;

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.2,
    borderRadius: 10,
    marginBottom: 10,
    width: windowWidth * 0.9,
    height: 100,
    backgroundColor: "white",
    overflow: "hidden",
  },
  pressableContainer: {
    flexDirection: "row",
  },
  exerciseName: {
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});
