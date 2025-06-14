import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import { workoutContext } from "../store/WorkoutPlanContextProvider";
import { userInfoContext } from "../store/UserInfoContextProvider";
import { colors, windowHeight, windowWidth } from "../constants";
import Chart from "../components/Chart";

function ReportsScreen() {
  const { userInfo, setUserInfo, weights, setWeights } =
    useContext(userInfoContext);

  const { height, weight, waist } = userInfo;

  const [editing, setEditing] = useState(false);
  const [newWeight, setNewWeight] = useState("");

  const bmi = (weight / (height / 100) ** 2).toFixed(2);

  let result = "",
    color = "";
  if (bmi < 18.5) {
    result = "Underweight";
    color = "#3440a6";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    result = "Healthy";
    color = "#569b56";
  } else if (bmi >= 25 && bmi <= 29.9) {
    result = "Overweight";
    color = "#dddd15";
  } else if (bmi >= 30 && bmi <= 34.9) {
    result = "Obese";
    color = "#e43a3a";
  } else if (bmi >= 35) {
    result = "Extremely obese";
    color = "#b40000";
  }

  const handleWeightPress = () => {
    setEditing(true);
  };

  const submitNewWeight = async () => {
    const weightValue = parseFloat(newWeight);
    if (!isNaN(weightValue) && weightValue > 0) {
      setUserInfo((prev) => ({ ...prev, weight: weightValue }));
      setWeights((prev) => [...prev, weightValue.toString()]);
      setEditing(false);
      setNewWeight("");
    } else {
      Alert.alert("Invalid Input", "Please enter a valid number.");
    }
  };

  console.log("Weights Array: ", weights);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* <Text style={styles.sectionTitle}>Details</Text> */}
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.heading}>Height</Text>
            <Text style={styles.value}>{height} cm</Text>
          </View>

          <TouchableOpacity style={styles.detail} onPress={handleWeightPress}>
            <Text style={styles.heading}>
              Weight{" "}
              <Image
                style={{ height: 20, width: 20 }}
                source={require("./../assets/icons/edit.png")}
              />
            </Text>
            {editing ? (
              <>
                <TextInput
                  style={[
                    styles.value,
                    {
                      borderBottomWidth: 1,
                      width: 60,
                      textAlign: "center",
                      borderBottomColor: "white",
                    },
                  ]}
                  keyboardType="numeric"
                  value={newWeight}
                  onChangeText={setNewWeight}
                  onSubmitEditing={submitNewWeight}
                  autoFocus
                />
                <Text style={[styles.value, { fontSize: 12 }]}>Tap Enter</Text>
              </>
            ) : (
              // <Text style={styles.value}>{weights[weights.length - 1]} kg</Text>
              <Text style={styles.value}>
                {parseFloat(weights[weights.length - 1]).toFixed(1)} kg
              </Text>
            )}
          </TouchableOpacity>

          {/* <View style={styles.detail}>
            <Text style={styles.heading}>Waist</Text>
            <Text style={styles.value}>{waist} cm</Text>
          </View> */}
        </View>

        <Text style={styles.sectionTitle}>BMI</Text>
        <View style={styles.bmiContainer}>
          {/* <Text style={[styles.heading, { fontSize: 20 }]}>BMI</Text> */}
          <View style={styles.bmi}>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <View
              style={{
                height: 15,
                width: 35,
                backgroundColor: color,
                borderRadius: 10,
                marginLeft: 10,
                marginTop: 6,
                alignSelf: "center",
              }}
            ></View>
          </View>
          <Text
            style={[
              styles.heading,
              { marginTop: 10, fontSize: 24, fontWeight: "bold" },
            ]}
          >
            {result}
          </Text>
        </View>
        {/* graph */}
        <Chart />
      </View>
    </ScrollView>
  );
}

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight - 0,
    padding: 20,
    backgroundColor: "white",
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    borderWidth: 0.3,
    borderColor: "grey",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 1,
  },
  detail: {
    // backgroundColor: colors.pink100,
    backgroundColor: "#f0f0f0",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 1,
    width: windowWidth * 0.35,
  },
  heading: {
    fontSize: 18,
    fontWeight: "400",
    // color: "white",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "white",
    marginTop: 5,
  },
  bmiValue: {
    fontSize: 18,
    fontWeight: "bold",
    // color: "white",
    marginTop: 5,
  },
  bmiContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    padding: 20,
    borderWidth: 0.3,
    borderColor: "grey",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 1,
  },
  bmi: {
    flexDirection: "row",
  },
  graphContainer: {
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "grey",
    marginVertical: 10,
  },
});
