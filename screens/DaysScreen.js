import React, { useLayoutEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import DayCard from "../components/DayCard";

function DaysScreen({ route, navigation }) {
  const workoutPlan = route.params;
  //   console.log(workoutPlan);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: workoutPlan?.name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Days Screen</Text>
      <FlatList
        data={workoutPlan?.days}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <DayCard dayInfo={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default DaysScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
