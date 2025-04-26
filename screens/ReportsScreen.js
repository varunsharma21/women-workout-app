import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { workoutContext } from "../store/WorkoutPlanContextProvider";

function ReportsScreen() {
  return (
    <ScrollView>
      <View style={styles.container}></View>
    </ScrollView>
  );
}

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
