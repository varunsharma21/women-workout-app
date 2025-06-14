import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ExerciseCard from "../components/ExerciseCard";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
  StatusBar,
} from "expo-status-bar";
import { colors, posters } from "../constants";
import PrimaryButton from "../components/UI/PrimaryButton";
import { useFocusEffect } from "@react-navigation/native";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-9652181513996596/4853719851";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

function ExercisesScreen({ route, navigation }) {
  const { exercises, workoutPlanId, day } = route.params;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
        interstitial.show();
      }
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerTintColor: "white",
      statusBarTranslucent: true,
      statusBarColor: "transparent",
    });
  }, []);

  const handleStartWorkout = () => {
    const exercisesWithWorkoutInfo = exercises.map((exercise) => ({
      ...exercise,
      workoutPlanId,
      day,
    }));
    navigation.navigate("WorkoutPlayer", exercisesWithWorkoutInfo);
  };

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle("light");
      setStatusBarBackgroundColor("black"); // optional for Android
    }, [])
  );

  return (
    <>
      {/* <StatusBar style="light" backgroundColor="#000" /> */}
      <View style={styles.container}>
        <Image source={posters.plankLady} style={styles.exerciseImage} />
        {exercises && (
          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <ExerciseCard exerciseInfo={item?.exerciseId} />
            )}
            keyExtractor={(item, index) => `${item.exerciseId?._id}-${index}`}
            showsVerticalScrollIndicator={false}
          />
        )}
        {exercises && (
          <Pressable style={styles.button} onPress={handleStartWorkout}>
            <View>
              <Text style={styles.buttonTitle}>Start</Text>
            </View>
          </Pressable>
        )}
        {!exercises && (
          <View style={styles.restContainer}>
            <Image source={require("./../assets/icons/tea.png")} />
            <Text style={styles.restText}>Rest Day</Text>
          </View>
        )}
      </View>
    </>
  );
}

export default ExercisesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  exerciseImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.pink100,
    padding: 15,
    marginTop: 20,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  restContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "grey",
    marginTop: 100,
  },
});
