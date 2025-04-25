import React, { useContext } from "react";
import { workoutContext } from "../store/WorkoutPlanContextProvider";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function LandingScreen() {
  const ctx = useContext(workoutContext);
  const { workoutPlans, isLoading } = ctx;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Pressable onPress={() => console.log("Pressed!")}>
          <ImageBackground
            style={styles.image}
            resizeMode="cover"
            source={require("./../assets/images/lose-weight.png")}
            imageStyle={styles.image}
          >
            <Text>hiiiiii</Text>
          </ImageBackground>
        </Pressable>
        <Pressable onPress={() => console.log("Pressed!")}>
          <ImageBackground
            style={styles.image}
            resizeMode="cover"
            source={require("./../assets/images/strength-training.png")}
            imageStyle={styles.image}
          >
            <Text>hiiiiii</Text>
          </ImageBackground>
        </Pressable>
        <Pressable onPress={() => console.log("Pressed!")}>
          <ImageBackground
            style={styles.image}
            resizeMode="cover"
            source={require("./../assets/images/thigh-training.png")}
            imageStyle={styles.image}
          >
            <Text>hiiiiii</Text>
          </ImageBackground>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
  },
  image: {
    width: 330,
    height: 220,
    borderRadius: 10,
    marginBottom: 25,
  },
});

// if (workoutPlans?.[0]?.days?.[0]?.exercises?.[0]?.exerciseId) {
//   console.log(
//     "workout: ",
//     workoutPlans[0].days[7].exercises[0]?.exerciseId.exerciseName
//   );
// }

// return (
//   <View>
//     {workoutPlans?.[0]?.days?.[29]?.exercises?.map((exercise, idx) => (
//       <Text key={idx}>{exercise.exerciseId?.exerciseName}</Text>
//     ))}
//   </View>
// );
