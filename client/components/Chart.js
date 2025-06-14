import React, { useContext } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { userInfoContext } from "../store/UserInfoContextProvider";
import { colors } from "../constants";

function Chart() {
  const { weights } = useContext(userInfoContext);
  console.log("Chart: ", weights);

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.title}>Weight</Text>
      <LineChart
        data={{
          labels: ["Time ---->"],
          datasets: [
            {
              data: weights.map((w) => Number(w)),
            },
          ],
        }}
        width={Dimensions.get("window").width * 0.9} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix="kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          // backgroundColor: "#e26a00",
          // backgroundGradientFrom: "#fb8c00",
          // backgroundGradientTo: "#ffa726",
          backgroundColor: "#f53977",
          backgroundGradientFrom: "#f46c99",
          backgroundGradientTo: "#f18cad",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#f18cad",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

export default Chart;

const styles = StyleSheet.create({
  graphContainer: {
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "grey",
  },
});
