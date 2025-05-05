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
import ExerciseCard from "../components/ExerciseCard";
import { StatusBar } from "expo-status-bar";
import { posters } from "../constants";
import PrimaryButton from "../components/UI/PrimaryButton";

function ExercisesScreen({ route, navigation }) {
  const exercises = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerTintColor: "white",
      statusBarTranslucent: true,
      statusBarColor: "transparent",
    });
  }, []);

  console.log("Exercise Screen: ", exercises);

  return (
    <View style={styles.container}>
      <Image source={posters.plankLady} style={styles.exerciseImage} />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard exerciseInfo={item?.exerciseId} />
        )}
        keyExtractor={(item, index) => `${item.exerciseId?._id}-${index}`}
        showsVerticalScrollIndicator={false}
      />
      {exercises && (
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("WorkoutPlayer", exercises)}
        >
          <View>
            <Text style={styles.buttonTitle}>Start</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

export default ExercisesScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  exerciseImage: {
    width: windowWidth,
    height: windowHeight * 0.25,
    marginBottom: 15,
    inspectRatio: 1,
  },
  button: {
    backgroundColor: "#f46c99",
    padding: 15,
    position: "absolute",
    bottom: 20,
    left: (windowWidth - windowWidth * 0.8) / 2,
    width: windowWidth * 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
