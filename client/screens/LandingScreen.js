import React, { useCallback, useContext } from "react";
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
import { posters, windowWidth } from "../constants";
// import { StatusBar } from "expo-status-bar";

function LandingScreen() {
  const ctx = useContext(workoutContext);
  const { workoutPlans, isLoading } = ctx;
  const navigation = useNavigation();

  const loseWeightAndFatWorkoutPlan = workoutPlans[0];
  const getTonedBodyWorkoutPlan = workoutPlans[0];

  console.log(loseWeightAndFatWorkoutPlan?.name);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.workoutPlansText}>Women Workout</Text>
        <View style={styles.container}>
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
                loseWeightAndFatWorkoutPlan,
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
          <Pressable
            style={styles.pressableContainer}
            onPress={() =>
              navigation.navigate("DayScreen", {
                loseWeightAndFatWorkoutPlan,
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
    justifyContent: "center",
    alignItems: "center",
  },
  workoutPlansText: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: (windowWidth - 330) / 2,
  },
  image: {
    width: 330,
    height: 220,
    borderRadius: 5,
  },
  pressableContainer: {
    overflow: "hidden",
    borderRadius: 5,
    marginTop: 15,
  },
});
