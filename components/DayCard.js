import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

function DayCard(props) {
  const navigation = useNavigation();
  const { dayInfo } = props;

  const isRestDay = dayInfo.dayType === "rest";
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("ExercisesScreen", dayInfo?.exercises)
        }
      >
        <View style={styles.innerContainer}>
          <Text style={styles.dayInfo}>Day {dayInfo.day}</Text>
          {isRestDay && <Text>Rest</Text>}
        </View>
      </Pressable>
    </View>
  );
}

export default DayCard;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderWidth: 0.1,
    borderColor: "grey",
    marginBottom: 15,
    width: windowWidth * 0.85,
    borderRadius: 10,
    backgroundColor: "white",
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
});
