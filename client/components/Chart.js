import React, { useContext } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { userInfoContext } from "../store/UserInfoContextProvider";

function Chart() {
  const { weights } = useContext(userInfoContext);
  console.log("Chart: ", weights);

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.title}>Weight</Text>
      <LineChart
        data={{
          labels: ["week 1", "week 2", "week 3", "week 4", "week 5", "week 6"],
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
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
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
