import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DayCard from "../components/DayCard";
import { posters } from "../constants";
import { StatusBar } from "expo-status-bar";

function DaysScreen({ route, navigation }) {
  const workoutPlanInfo = route.params;

  let workoutPlan;

  // Select a plan here.
  if (workoutPlanInfo?.loseWeightAndFatWorkoutPlan) {
    workoutPlan = workoutPlanInfo?.loseWeightAndFatWorkoutPlan;
    console.log("DaysScreen: ", workoutPlan?.name);
  } else if (workoutPlanInfo?.getMusclesWorkoutPlan) {
    workoutPlan = workoutPlanInfo?.getMusclesWorkoutPlan;
    console.log("DaysScreen: ", workoutPlan?.name);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerTintColor: "white",
    });
  }, [navigation]);

  // console.log(workoutPlan);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={workoutPlanInfo.image} />
      </View>
      <FlatList
        data={workoutPlan?.days}
        keyExtractor={(item) => item?.day}
        renderItem={({ item }) => <DayCard dayInfo={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default DaysScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: windowWidth,
    height: windowHeight * 0.4,
    marginBottom: 25,
    // aspectRatio: 1,
  },
});
