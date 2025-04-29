import React from "react";
import { StyleSheet, Text, View } from "react-native";

function DemoScreen() {
  return (
    <View style={styles.container}>
      <Text>Demo Screen</Text>
    </View>
  );
}

export default DemoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
