import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const userInfoContext = createContext({});

function UserInfoContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    waist: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [workoutCount, setWorkoutCount] = useState(0);
  const [weights, setWeights] = useState([]);

  // Load weights from AsyncStorage on mount
  useEffect(() => {
    const loadWeights = async () => {
      try {
        const storedWeights = await AsyncStorage.getItem("weights");
        if (storedWeights) {
          setWeights(JSON.parse(storedWeights));
        }
      } catch (err) {
        console.error("Error loading weights from storage:", err);
      }
    };
    loadWeights();
  }, []);

  // When form is submitted and userInfo.weight is available, add to weights and store
  useEffect(() => {
    const saveInitialWeight = async () => {
      if (isFormSubmitted && userInfo.weight && weights.length === 0) {
        const initialWeightArray = [userInfo.weight];
        setWeights(initialWeightArray);
        await AsyncStorage.setItem(
          "weights",
          JSON.stringify(initialWeightArray)
        );
      }
    };
    saveInitialWeight();
  }, [isFormSubmitted]);

  // Save weights to AsyncStorage whenever weights change
  useEffect(() => {
    const storeWeights = async () => {
      try {
        await AsyncStorage.setItem("weights", JSON.stringify(weights));
      } catch (err) {
        console.error("Error saving weights to storage:", err);
      }
    };
    if (weights.length > 0) {
      storeWeights();
    }
  }, [weights]);

  const userFormInfo = {
    userInfo,
    setUserInfo,
    isFormSubmitted,
    setIsFormSubmitted,
    workoutCount,
    setWorkoutCount,
    weights,
    setWeights,
  };

  return (
    <userInfoContext.Provider value={userFormInfo}>
      {children}
    </userInfoContext.Provider>
  );
}

export default UserInfoContextProvider;
