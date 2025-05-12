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
// import { StatusBar } from "expo-status-bar";

function LandingScreen() {
  const ctx = useContext(workoutContext);
  const { workoutPlans, isLoading } = ctx;
  const navigation = useNavigation();

  const loseWeightAndFatWorkoutPlan = workoutPlans?.[0];
  const getMusclesWorkoutPlan = workoutPlans?.[1];
  const demo1 = workoutPlans?.[2];

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* <Text style={styles.heading}>Women Workout</Text> */}
          <Text style={styles.workoutPlansText}>FULL BODY WORKOUT</Text>
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
                  image: posters.loseWeight,
                })
              }
            >
              <ImageBackground
                style={styles.image}
                resizeMode="cover"
                source={posters.loseWeight}
                imageStyle={styles.image}
              >
                <Text>hiiiiii</Text>
              </ImageBackground>
            </Pressable>
            <Pressable
              style={styles.pressableContainer}
              onPress={() =>
                navigation.navigate("DayScreen", {
                  getMusclesWorkoutPlan,
                  image: posters.tonedBody,
                })
              }
            >
              <ImageBackground
                style={styles.image}
                resizeMode="cover"
                source={posters.tonedBody}
                imageStyle={styles.image}
              >
                <Text>hiiiiii</Text>
              </ImageBackground>
            </Pressable>
          </ScrollView>
          <Text style={styles.workoutPlansText}>LEGS WORKOUT</Text>
          <Pressable
            style={styles.pressableContainer}
            onPress={() =>
              navigation.navigate("DayScreen", {
                demo1,
                image: posters.thighTraining,
              })
            }
          >
            <ImageBackground
              style={styles.image}
              resizeMode="cover"
              source={posters.thighTraining}
              imageStyle={styles.image}
            >
              <Text>hiiiiii</Text>
            </ImageBackground>
          </Pressable>
          <Text style={styles.workoutPlansText}>ARM WORKOUT</Text>
          <Pressable
            style={styles.pressableContainer}
            onPress={() =>
              navigation.navigate("DayScreen", {
                loseWeightAndFatWorkoutPlan,
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
    fontSize: 24,
    fontWeight: "bold",
  },
  workoutPlansText: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 35,
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
});
