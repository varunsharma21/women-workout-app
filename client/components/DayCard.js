import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { completedWorkoutsContext } from "../store/CompletedWorkoutsContextProvider";

function DayCard(props) {
  const navigation = useNavigation();
  const { dayInfo, workoutPlanId, onPress } = props;
  const { isWorkoutCompleted } = useContext(completedWorkoutsContext);

  //   console.log(dayInfo);

  const isRestDay = dayInfo.dayType === "rest";
  const isCompleted = isWorkoutCompleted(workoutPlanId, dayInfo.day);

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.container}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.dayInfo}>Day {dayInfo.day}</Text>
            {dayInfo?.exercises?.length > 0 && (
              <Text style={styles.exerciseCount}>
                {dayInfo?.exercises.length} Exercises
              </Text>
            )}
            {isRestDay && <Text style={styles.exerciseCount}>Rest</Text>}
            {/* {dayInfo?.exercises?.length === 0 && (
              <Text style={styles.exerciseCount}>Rest</Text>
            )} */}
          </View>
          <View style={styles.rightContainer}>
            {isRestDay && (
              <Image
                style={styles.restIcon}
                source={require("./../assets/icons/tea.png")}
              />
            )}
            {/* {isRestDay && <Text style={styles.workoutDay}>Rest</Text>} */}
            {isCompleted && (
              <Image
                style={{ height: 50, width: 50 }}
                source={require("./../assets/icons/tick.png")}
              />
            )}
          </View>
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
    borderWidth: 0.2,
    borderColor: "grey",
    backgroundColor: colors.dayCardColor,
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
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  restIcon: {
    height: 40,
    width: 40,
  },
});
