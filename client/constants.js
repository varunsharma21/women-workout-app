import { Dimensions } from "react-native";

export const posters = {
  fullBodyBeginner: require("./assets/images/full-body-beginner-pastel.png"),
  fullBodyIntermediate: require("./assets/images/full-body-intermediate-pastel.png"),
  thighTrainingBeginner: require("./assets/images/thigh-training-beginner-pastel.png"),
  thighTrainingIntermediate: require("./assets/images/thigh-training-intermediate-pastel-2.png"),
  dumbbellTraining: require("./assets/images/dumbbell-training-pastel.png"),
  plankLady: require("./assets/images/plank-lady-white.jpg"),
};

export const colors = {
  dayCardColor: "#faf9f9",
  exerciseColorCard: "#faf9f9",
  pink100: "#f46c99 ",
  pink200: "#EC407A ",
};

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
