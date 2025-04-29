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
import { useContext, useState } from "react";
import DemoScreen from "./screens/DemoScreen";
import UserInfoFormScreen from "./screens/UserInfoFormScreen";
import { userInfoContext } from "./store/UserInfoContextProvider";

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
            title: "Workouts",
            tabBarLabel: "Workouts",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barbell" size={size} color={color} />
            ),
            headerShown: false,
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
            headerShown: false,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
}

export default function App() {
  const { setIsFormSubmitted, isFormSubmitted } = useContext(userInfoContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
});
