import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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
import DemoScreen from "./screens/DemoScreen";
import UserInfoFormScreen from "./screens/UserInfoFormScreen";
import { userInfoContext } from "./store/UserInfoContextProvider";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./utils/localStorageUtils";
import { windowWidth, colors } from "./constants";
import WorkoutPlayerScreen from "./screens/WorkoutPlayerScreen";

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <>
      <StatusBar style="dark" />
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="workouts"
          component={LandingScreen}
          options={{
            headerStyle: { backgroundColor: "white", elevation: 0 },
            title: "Women Workouts",
            tabBarLabel: "Workouts",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barbell" size={size} color={color} />
            ),
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "600",
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
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "600",
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
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "600",
              marginLeft: 0,
            },
            headerStyle: {
              backgroundColor: "white",
              elevation: 0,
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

  /////////////////////// FOR REMOVING 'userInfoLocal' FROM LOCAL STORAGE
  // useEffect(() => {
  // const removeLocalStorage = async () => {
  //   await removeFromLocalStorage("userInfoLocal");
  // };

  //   removeLocalStorage();
  // }, []);

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
      </Stack.Navigator>
    </NavigationContainer>
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
