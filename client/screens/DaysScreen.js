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
import DayCard from "../components/DayCard";
import { posters } from "../constants";
import { StatusBar } from "expo-status-bar";

function DaysScreen({ route, navigation }) {
  const workoutPlan = route.params;
  // console.log(workoutPlan?.loseWeightAndFatWorkoutPlan?.days);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerTintColor: "white",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={workoutPlan.image} />
      </View>
      <FlatList
        data={workoutPlan?.loseWeightAndFatWorkoutPlan?.days}
        keyExtractor={(item) => item?.day}
        renderItem={({ item }) => <DayCard dayInfo={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default DaysScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: windowWidth,
    height: windowHeight * 0.4,
    marginBottom: 25,
    // aspectRatio: 1,
  },
});
