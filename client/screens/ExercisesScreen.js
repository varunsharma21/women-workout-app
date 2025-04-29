import React, { useLayoutEffect } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import ExerciseCard from "../components/ExerciseCard";
import { StatusBar } from "expo-status-bar";

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

  // console.log(exercises);

  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/plank-lady-white.jpg")}
        style={styles.exerciseImage}
      />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard exerciseInfo={item?.exerciseId} />
        )}
        keyExtractor={(item, index) => `${item.exerciseId?._id}-${index}`}
        showsVerticalScrollIndicator={false}
      />
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
});
