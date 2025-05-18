import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { saveToLocalStorage } from "../utils/localStorageUtils";
import { userInfoContext } from "../store/UserInfoContextProvider";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

function WorkoutCompleteScreen() {
  const { setWorkoutCount, workoutCount } = useContext(userInfoContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Workout Completed</Text> */}
      <LottieView
        autoPlay
        loop={true}
        source={require("./../assets/other-animations/fire.json")}
        style={styles.lottieStyle}
      />
      <Text style={styles.workoutCount}>{workoutCount}</Text>
      <Text style={styles.h1}> Workout done!</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Workout")}
      >
        <Text style={styles.buttonTitle}>Cool !!</Text>
      </Pressable>
    </View>
  );
}

export default WorkoutCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieStyle: {
    height: 300,
    width: 300,
  },
  workoutCount: {
    marginBottom: 10,
    fontSize: 54,
    fontWeight: "bold",
  },
  h1: {
    fontSize: 24,
  },
  button: {
    backgroundColor: "#f46c99",
    padding: 15,
    marginTop: 20,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
