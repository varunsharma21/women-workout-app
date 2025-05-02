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

    // setLocalForm({
    //   name: "",
    //   age: "",
    //   height: "",
    //   weight: "",
    //   waist: "",
    // });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Let Us Know You",
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          value={localForm.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          value={localForm.age}
          onChangeText={(text) => handleInputChange("age", text)}
          placeholder="Enter your age"
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Height *</Text>
        <TextInput
          style={styles.input}
          value={localForm.height}
          onChangeText={(text) => handleInputChange("height", text)}
          placeholder="Enter your height in cm"
          keyboardType="number-pad"
          maxLength={3}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          value={localForm.weight}
          onChangeText={(text) => handleInputChange("weight", text)}
          placeholder="Enter your weight in kg"
          keyboardType="number-pad"
          maxLength={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Waist *</Text>
        <TextInput
          style={styles.input}
          value={localForm.waist}
          onChangeText={(text) => handleInputChange("waist", text)}
          placeholder="Enter your waist in cm"
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
    width: "40%",
    justifyContent: "center",
    alignSelf: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
