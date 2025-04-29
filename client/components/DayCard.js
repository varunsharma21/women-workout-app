import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

function DayCard(props) {
  const navigation = useNavigation();
  const { dayInfo } = props;

  //   console.log(dayInfo);

  const isRestDay = dayInfo.dayType === "rest";
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.container}
        android_ripple={{ color: "#ccc" }}
        onPress={() =>
          navigation.navigate("ExercisesScreen", dayInfo?.exercises)
        }
      >
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.dayInfo}>Day {dayInfo.day}</Text>
            {dayInfo?.exercises?.length > 0 && (
              <Text style={styles.exerciseCount}>
                {dayInfo?.exercises.length} Exercises
              </Text>
            )}
            {dayInfo?.exercises?.length === 0 && (
              <Text style={styles.exerciseCount}>Rest</Text>
            )}
          </View>
          {isRestDay && <Text style={styles.workoutDay}>Rest</Text>}
        </View>
      </Pressable>
    </View>
  );
}

export default DayCard;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    overflow: "hidden", // <--- Important: overflow hidden on wrapper
    marginBottom: 15,
    width: windowWidth * 0.9,
    backgroundColor: "white",
    borderWidth: 0.1,
    borderColor: "grey",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayInfo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciseCount: {
    color: "#a8a6a6",
    marginTop: 2,
  },
  workoutDay: {
    marginTop: 13,
  },
});
