import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, windowWidth } from "../../constants";

function PrimaryButton({ children }) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => console.log("Pressed start button")}
    >
      <View>
        <Text style={styles.title}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f46c99",
    padding: 15,
    position: "absolute",
    bottom: 20,
    left: (windowWidth - windowWidth * 0.8) / 2,
    width: windowWidth * 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
