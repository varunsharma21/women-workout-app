import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ExercisesScreen({ route, navigation }) {
  const exercises = route.params;
  // console.log(exercises);

  return (
    <View style={styles.container}>
      {exercises.map((exercise) => (
        <Text>{exercise?.exerciseId?.exerciseName}</Text>
      ))}
    </View>
  );
}

export default ExercisesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
