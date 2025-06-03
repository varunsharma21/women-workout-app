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
import { windowHeight, windowWidth } from "../constants";
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
    color = "#187d18";
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
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.heading}>Height</Text>
            <Text style={styles.value}>{height} cm</Text>
          </View>

          <TouchableOpacity style={styles.detail} onPress={handleWeightPress}>
            <Text style={styles.heading}>
              Weight{" "}
              <Image
                style={{ height: 15, width: 15 }}
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

        <View style={styles.bmiContainer}>
          <Text style={[styles.heading, { fontSize: 24 }]}>BMI</Text>
          <View style={styles.bmi}>
            <Text style={styles.value}>{bmi}</Text>
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
          <Text style={[styles.heading, { marginTop: 10, fontSize: 20 }]}>
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
    backgroundColor: "#efeded",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 1,
    width: windowWidth * 0.35,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
    fontWeight: "400",
    color: "grey",
    marginTop: 5,
  },
  bmiContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
});

/************************************************************* *******************************************************/
// import React, { useContext } from "react";
// import { ScrollView, StyleSheet, Text, View } from "react-native";
// import { workoutContext } from "../store/WorkoutPlanContextProvider";
// import { userInfoContext } from "../store/UserInfoContextProvider";
// import { getFromLocalStorage } from "../utils/localStorageUtils";
// import { windowHeight } from "../constants";

// function ReportsScreen() {
//   const { userInfo } = useContext(userInfoContext);
//   // const userInfo = getFromLocalStorage("userInfoLocal");
//   // console.log(userInfo);

//   const { name, age, height, weight, waist } = userInfo;

//   const bmi = (weight / (height / 100) ** 2).toFixed(2);

//   let result = "",
//     color = "";
//   if (bmi < 18.5) {
//     result = "Underweight";
//     color = "#3440a6";
//   } else if (bmi >= 18.5 && bmi <= 24.9) {
//     result = "Healthy";
//     color = "#187d18";
//   } else if (bmi >= 25 && bmi <= 29.9) {
//     result = "Overweight";
//     color = "#dddd15";
//   } else if (bmi >= 30 && bmi <= 34.9) {
//     result = "Obese";
//     color = "#e43a3a";
//   } else if (bmi >= 35) {
//     result = "Extremely obese";
//     color = "#b40000";
//   }

//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       <View style={styles.container}>
//         {/* <Text style={styles.mainHeading}>Reports</Text> */}
//         <View style={styles.detailsContainer}>
//           <View style={styles.detail}>
//             <Text style={styles.heading}>Height</Text>
//             <Text style={styles.value}>{height} cm</Text>
//           </View>
//           <View style={styles.detail}>
//             <Text style={styles.heading}>Weight</Text>
//             <Text style={styles.value}>{weight} kg</Text>
//           </View>
//           <View style={styles.detail}>
//             <Text style={styles.heading}>Waist</Text>
//             <Text style={styles.value}>{waist} cm</Text>
//           </View>
//         </View>
//         <View style={styles.bmiContainer}>
//           <Text style={[styles.heading, { fontSize: 24 }]}>BMI</Text>
//           <View style={styles.bmi}>
//             <Text style={styles.value}>{bmi}</Text>
//             <View
//               style={{
//                 height: 15,
//                 width: 35,
//                 backgroundColor: color,
//                 borderRadius: 10,
//                 marginLeft: 10,
//                 marginTop: 6,
//                 alignSelf: "center",
//               }}
//             ></View>
//           </View>
//           <Text style={[styles.heading, { marginTop: 10, fontSize: 20 }]}>
//             {result}
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// export default ReportsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: windowHeight - 0,
//     padding: 20,
//     backgroundColor: "white",
//   },
//   mainHeading: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   detailsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     padding: 20,
//     borderWidth: 0.3,
//     borderColor: "grey",
//     backgroundColor: "white",
//     borderRadius: 10,
//     elevation: 2,
//   },
//   detail: {
//     backgroundColor: "#efeded",
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     elevation: 1,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   value: {
//     fontSize: 18,
//     fontWeight: "400",
//     color: "grey",
//     marginTop: 5,
//   },
//   bmiContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//     padding: 20,
//     borderWidth: 0.3,
//     borderColor: "grey",
//     backgroundColor: "white",
//     borderRadius: 10,
//     elevation: 2,
//   },
//   bmi: {
//     flexDirection: "row",
//   },
// });
