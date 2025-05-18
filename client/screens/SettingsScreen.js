import React, { Fragment, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { workoutContext } from "../store/WorkoutPlanContextProvider";
import DemoLottieFileCard from "./../components/DemoLottieFileCard";
import { windowHeight } from "../constants";

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
        <Text style={styles.heading}>Support Us</Text>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={styles.innerContainer}
        >
          <Image
            style={styles.icon}
            source={require("./../assets/icons/star-golden.png")}
          />
          <Text style={styles.innerContainerText}>Rate Us</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={styles.innerContainer}
        >
          <Image
            style={styles.icon}
            source={require("./../assets/icons/share-green.png")}
          />
          <Text style={styles.innerContainerText}>Share with Friends</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    backgroundColor: "white",
    padding: 20,
  },
  heading: {
    fontSize: 18,
    color: "grey",
  },
  innerContainer: {
    height: windowHeight * 0.08,
    borderBottomWidth: 0.5,
    borderColor: "grey",
    alignItems: "center",

    flexDirection: "row",
  },
  icon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  innerContainerText: {
    fontSize: 17,
    paddingLeft: 10,
  },
});
