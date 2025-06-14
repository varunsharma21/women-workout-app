import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, windowHeight } from "../constants";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-9652181513996596/3585542662";

function RestScreen({ restTime }) {
  return (
    <View style={styles.container}>
      <View style={styles.restingScreen}>
        <Text style={styles.title}>Rest Time</Text>
        <Text style={styles.timer}>{restTime}s</Text>
      </View>
      <View style={styles.bannerAdContainer}>
        <BannerAd
          style={styles.bannerAd}
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          // requestOptions={{
          //   networkExtras: {
          //     collapsible: "bottom",
          //   },
          // }}
        />
      </View>
    </View>
  );
}

export default RestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    // backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  restingScreen: {
    padding: 50,
    borderWidth: 10,
    borderRadius: "50%",
    borderColor: colors.pink100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  timer: {
    fontSize: 52,
    fontWeight: "700",
  },
  bannerAdContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});
