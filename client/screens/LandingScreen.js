import React, { useCallback, useContext, useLayoutEffect } from "react";
import { workoutContext } from "../store/WorkoutPlanContextProvider";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { posters, windowHeight, windowWidth } from "../constants";
import { StatusBar } from "expo-status-bar";
// import { StatusBar } from "expo-status-bar";

function LandingScreen() {
  const ctx = useContext(workoutContext);
  const { workoutPlans, isLoading } = ctx;
  const navigation = useNavigation();

  // FULL BODY WORKOUTS
  const loseWeightAndFatWorkoutPlan = workoutPlans?.[0];
  const getMusclesWorkoutPlan = workoutPlans?.[1];

  // LEG WORKOUTS
  const LegsWorkoutBeginner = workoutPlans?.[2];
  const LegsWorkoutIntermediate = workoutPlans?.[3];

  // console.log("LandindScreen: ", loseWeightAndFatWorkoutPlan?.name);
  // console.log("LandindScreen: ", getMusclesWorkoutPlan?.name);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerStyle: { marginLeft: (windowWidth - 330) / 2 },
  //     headerTitleStyle: {
  //       fontSize: 20,
  //       fontWeight: "600",
  //     },
  //   });
  // }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* <Text style={styles.heading}>Women Workout</Text> */}
          <Text style={styles.workoutPlansTextFirst}>FULL BODY WORKOUT</Text>
          <ScrollView
            style={styles.horizontalListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Pressable
              style={styles.pressableContainer}
              onPress={() =>
                navigation.navigate("DayScreen", {
                  loseWeightAndFatWorkoutPlan,
                  image: posters.fullBodyBeginner,
                })
              }
            >
              <ImageBackground
                style={styles.image}
                resizeMode="cover"
                source={posters.fullBodyBeginner}
                imageStyle={styles.image}
              >
                <View style={styles.posterTextContainer}>
                  <Text style={styles.posterText}>FLAT</Text>
                  <Text style={styles.posterText}>STOMACH</Text>
                </View>
              </ImageBackground>
            </Pressable>
            <Pressable
              style={styles.pressableContainer}
              onPress={() =>
                navigation.navigate("DayScreen", {
                  getMusclesWorkoutPlan,
                  image: posters.fullBodyIntermediate,
                })
              }
            >
              <ImageBackground
                style={styles.image}
                resizeMode="cover"
                source={posters.fullBodyIntermediate}
                imageStyle={styles.image}
              >
                <View style={styles.posterTextContainer}>
                  <Text style={styles.posterText}>RIPPED</Text>
                  <Text style={styles.posterText}>CORE</Text>
                </View>
              </ImageBackground>
            </Pressable>
          </ScrollView>
          <Text style={styles.workoutPlansText}>LEGS WORKOUT</Text>
          <ScrollView
            style={styles.horizontalListContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Pressable
              style={styles.pressableContainer}
              onPress={() =>
                navigation.navigate("DayScreen", {
                  LegsWorkoutBeginner,
                  image: posters.thighTrainingBeginner,
                })
              }
            >
              <ImageBackground
                style={styles.image}
                resizeMode="cover"
                source={posters.thighTrainingBeginner}
                imageStyle={styles.image}
              >
                <View style={styles.posterTextContainer}>
                  <Text style={styles.posterText}>SLIM</Text>
                  <Text style={styles.posterText}>THIGHS</Text>
                </View>
              </ImageBackground>
            </Pressable>
            <Pressable
              style={styles.pressableContainer}
              onPress={() =>
                navigation.navigate("DayScreen", {
                  LegsWorkoutIntermediate,
                  image: posters.thighTrainingIntermediate,
                })
              }
            >
              <ImageBackground
                style={styles.image}
                resizeMode="cover"
                source={posters.thighTrainingIntermediate}
                imageStyle={styles.image}
              >
                <View style={styles.posterTextContainer}>
                  <Text style={styles.posterText}>THIGH</Text>
                  <Text style={styles.posterText}>STRENGTH</Text>
                </View>
              </ImageBackground>
            </Pressable>
          </ScrollView>
          <Text style={styles.workoutPlansText}>ARM WORKOUT</Text>
          <Pressable
            style={styles.pressableContainer}
            onPress={() =>
              navigation.navigate("DayScreen", {
                LegsWorkoutIntermediate,
                image: posters.dumbbellTraining,
              })
            }
          >
            <ImageBackground
              style={styles.image}
              resizeMode="cover"
              source={posters.dumbbellTraining}
              imageStyle={styles.image}
            >
              <Text>hiiiiii</Text>
            </ImageBackground>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 50,
    paddingLeft: 30,
  },
  heading: {
    paddingTop: 40,
    fontSize: 20,
    fontWeight: "bold",
  },
  workoutPlansTextFirst: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 17,
    marginBottom: 10,
    color: "#424242",
  },
  workoutPlansText: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 37,
    marginBottom: 10,

    color: "#424242",
  },
  image: {
    // width: 330,
    // height: 220,

    // Smaller image sizes
    width: 270,
    height: 180,
    borderRadius: 5,
  },
  pressableContainer: {
    overflow: "hidden",
    // Smaller image sizes
    width: 270,
    height: 180,
    borderRadius: 5,
    marginTop: 0,
    marginRight: 20,
  },
  horizontalListContainer: {
    flexDirection: "row",
  },
  posterText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  posterTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 30,
    paddingBottom: 40,
    // alignItems: "center",
    // borderWidth: 2,
  },
});
