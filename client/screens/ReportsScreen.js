import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { workoutContext } from "../store/WorkoutPlanContextProvider";
import { userInfoContext } from "../store/UserInfoContextProvider";

function ReportsScreen() {
  const { userInfo } = useContext(userInfoContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Name: {userInfo.name}</Text>
        <Text>Age: {userInfo.age}</Text>
        <Text>Height: {userInfo.height} cm</Text>
        <Text>Weight: {userInfo.weight} Kg</Text>
        <Text>Waist: {userInfo.waist} cm</Text>
      </View>
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
