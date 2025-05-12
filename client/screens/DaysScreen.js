import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
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
  let workoutPlanId;

  // Select a plan here.
  if (workoutPlanInfo?.loseWeightAndFatWorkoutPlan) {
    workoutPlan = workoutPlanInfo?.loseWeightAndFatWorkoutPlan;
    workoutPlanId = workoutPlan?.id;
    console.log("DaysScreen: ", workoutPlan?.name);
  } else if (workoutPlanInfo?.getMusclesWorkoutPlan) {
    workoutPlan = workoutPlanInfo?.getMusclesWorkoutPlan;
    workoutPlanId = workoutPlan?.id;
    console.log("DaysScreen: ", workoutPlan?.name);
  } else if (workoutPlanInfo?.demo1) {
    workoutPlan = workoutPlanInfo?.demo1;
    workoutPlanId = workoutPlan?.id;
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
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={workoutPlanInfo.image}
          imageStyle={styles.image}
        >
          <View style={styles.imageTextContainer}></View>
        </ImageBackground>
        {/* <Image style={styles.image} source={workoutPlanInfo.image} /> */}
      </View>
      <FlatList
        data={workoutPlan?.days}
        keyExtractor={(item) => item?.day}
        renderItem={({ item }) => (
          <DayCard
            dayInfo={item}
            workoutPlanId={workoutPlanId}
            onPress={() =>
              navigation.navigate("ExercisesScreen", {
                exercises: item.exercises,
                workoutPlanId,
                day: item.day,
              })
            }
          />
        )}
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
  },
  imageTextContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    width: "50%",
  },
  imageTitle: {
    marginTop: 5,
    marginLeft: 0,
    fontSize: 24,
    fontWeight: "600",
    color: "#353535",
  },
});
