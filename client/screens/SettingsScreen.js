import React, { Fragment, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { workoutContext } from "../store/WorkoutPlanContextProvider";
import { windowHeight } from "../constants";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : "ca-app-pub-9652181513996596/9706505567";

function SettingsScreen() {
  const { workoutPlans } = useContext(workoutContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <Text style={styles.heading}>Support Us</Text>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={styles.innerContainer}
          >
            <Image
              style={styles.icon}
              source={require("./../assets/icons/star.png")}
            />
            <Text style={styles.innerContainerText}>Rate Us</Text>
          </Pressable>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={styles.innerContainer}
          >
            <Image
              style={styles.icon}
              source={require("./../assets/icons/share.png")}
            />
            <Text style={styles.innerContainerText}>Share with Friends</Text>
          </Pressable>
        </View>
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
    </ScrollView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 18,
    color: "grey",
  },
  middleContainer: {
    padding: 20,
  },
  innerContainer: {
    height: windowHeight * 0.08,
    borderBottomWidth: 0.5,
    borderColor: "grey",
    alignItems: "center",

    flexDirection: "row",
  },
  icon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  innerContainerText: {
    fontSize: 17,
    paddingLeft: 10,
  },
  bannerAd: {
    padding: 0,
    height: 450,
  },
});
