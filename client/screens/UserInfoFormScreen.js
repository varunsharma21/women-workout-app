import React, { useContext, useLayoutEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { userInfoContext } from "../store/UserInfoContextProvider";
import { saveToLocalStorage } from "../utils/localStorageUtils";

function UserInfoFormScreen({ navigation }) {
  const { userInfo, setUserInfo, setIsFormSubmitted, isFormSubmitted } =
    useContext(userInfoContext);

  const [localForm, setLocalForm] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    waist: "",
  });

  const handleInputChange = (field, value) => {
    setLocalForm({
      ...localForm,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    const { name, age, height, weight, waist } = localForm;

    if (!name || !age || !height || !weight || !waist) {
      Alert.alert("Please fill all the fields");
      return;
    }
    // Isabella

    const userInfoLocal = {
      name,
      age,
      height,
      weight,
      waist,
      isFormSubmitted: true,
    };

    setUserInfo({ name, age, height, weight, waist });
    setIsFormSubmitted(true);

    console.log(userInfoLocal);
    console.log("Storing in local storage...");

    saveToLocalStorage("userInfoLocal", userInfoLocal);
    navigation.navigate("Workout");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Let Us Know You",
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Let Us Know You</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={localForm.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholder="Full name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={localForm.age}
          onChangeText={(text) => handleInputChange("age", text)}
          placeholder="Enter age"
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          value={localForm.height}
          onChangeText={(text) => handleInputChange("height", text)}
          placeholder="Height in cm"
          keyboardType="number-pad"
          maxLength={3}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          value={localForm.weight}
          onChangeText={(text) => handleInputChange("weight", text)}
          placeholder="Weight in kg"
          keyboardType="number-pad"
          maxLength={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Waist</Text>
        <TextInput
          style={styles.input}
          value={localForm.waist}
          onChangeText={(text) => handleInputChange("waist", text)}
          placeholder="Waist in cm"
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Make Me Stronger!</Text>
      </Pressable>
    </ScrollView>
  );
}

export default UserInfoFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#f46c99",
    padding: 15,
    marginTop: 20,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    alignSelf: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
