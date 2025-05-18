import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import WorkoutPlanContextProvider, {
  workoutContext,
} from "./store/WorkoutPlanContextProvider";
import LandingScreen from "./screens/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportsScreen from "./screens/ReportsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import DaysScreen from "./screens/DaysScreen";
import ExercisesScreen from "./screens/ExercisesScreen";
import { useContext, useEffect, useState } from "react";
import UserInfoFormScreen from "./screens/UserInfoFormScreen";
import { userInfoContext } from "./store/UserInfoContextProvider";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorageUtils";
import WorkoutPlayerScreen from "./screens/WorkoutPlayerScreen";
import CompletedWorkoutsContextProvider from "./store/CompletedWorkoutsContextProvider";
import WorkoutCompleteScreen from "./screens/WorkoutCompleteScreen";
import { colors } from "./constants";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <>
      {/* <StatusBar style="light" backgroundColor="#000" /> */}
      <BottomTab.Navigator screenOptions={{ tabBarActiveTintColor: "#f46c99" }}>
        <BottomTab.Screen
          name="workouts"
          component={LandingScreen}
          options={{
            headerStyle: {
              backgroundColor: "white",
              elevation: 2,
            },
            title: "Women Workouts",
            tabBarLabel: "Workouts",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/dumbbell.png")
                    : require("./assets/icons/dumbbell-grey.png")
                }
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
            ),
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
              marginLeft: 0,
            },
            // headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="reports"
          component={ReportsScreen}
          options={{
            title: "Reports",
            tabBarLabel: "Reports",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/reports.png")
                    : require("./assets/icons/reports-grey.png")
                }
                style={{ width: 38, height: 38 }}
                resizeMode="contain"
              />
            ),
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
              marginLeft: 0,
            },
            headerStyle: { backgroundColor: "white", elevation: 0 },
            // headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size, focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/settings.png")
                    : require("./assets/icons/settings-grey.png")
                }
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            ),
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: "bold",
              marginLeft: 0,
            },
            headerStyle: {
              backgroundColor: "white",
              elevation: 0,
              elevation: 2,
            },
            // headerShown: false,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

export default function App() {
  const { setUserInfo, setIsFormSubmitted, isFormSubmitted } =
    useContext(userInfoContext);

  const [isLoading, setIsLoading] = useState(true);

  /////////////////////// FOR REMOVING LOCAL STORAGE
  // useEffect(() => {
  //   const removeLocalStorage = async () => {
  //     await removeFromLocalStorage("userInfoLocal");
  //     await removeFromLocalStorage("workoutCount");
  //     await removeFromLocalStorage("completedWorkouts");
  //     await removeFromLocalStorage("weights");
  //   };

  //   removeLocalStorage();
  // }, []);
  ///////////////////////

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getFromLocalStorage("userInfoLocal");
      // console.log("userInfoLocal: ", userInfo);

      if (userInfo) {
        setUserInfo({
          name: userInfo.name,
          age: userInfo.age,
          height: userInfo.height,
          weight: userInfo.weight,
          waist: userInfo.waist,
        });
        setIsFormSubmitted(userInfo.isFormSubmitted);
      }
      setIsLoading(false);
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {/***************** USE SPLASH SCREEN HERE LATER ********************/}
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <CompletedWorkoutsContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "white",
            contentStyle: { backgroundColor: "white" },
          }}
        >
          {!isFormSubmitted && (
            <Stack.Screen
              name="UserInfoFormScreen"
              component={UserInfoFormScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
          <Stack.Screen
            name="Workout"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="DayScreen" component={DaysScreen} />
          <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
          <Stack.Screen
            name="WorkoutPlayer"
            component={WorkoutPlayerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkoutCompleteScreen"
            component={WorkoutCompleteScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CompletedWorkoutsContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
