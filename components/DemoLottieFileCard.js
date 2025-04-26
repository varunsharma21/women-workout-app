import React from "react";
import LottieView from "lottie-react-native";
import { lottieMap } from "../utils/lottieMap";

function DemoLottieFileCard({ exerciseName }) {
  const source = lottieMap[exerciseName];

  if (!source) return null;

  return (
    <LottieView
      source={source}
      autoPlay
      loop
      style={{ width: 80, height: 80 }}
    />
  );
}

export default DemoLottieFileCard;

/********************************************* CACHED CARD
import { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import * as FileSystem from "expo-file-system";

function DemoLottieFileCard({ lottieUrl }) {
  const [fileUri, setFileUri] = useState(null);

  useEffect(() => {
    const fileName = lottieUrl.split("/").pop();
    const uri = `${FileSystem.documentDirectory}${fileName}`;

    const checkFile = async () => {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        console.log(`${fileName} uri cached.`);
        setFileUri(uri); // ✅ Cached version
      } else {
        console.log(`${fileName} uri NOT cached.`);
        setFileUri(lottieUrl); // 🔁 fallback to remote
      }
    };

    checkFile();
  }, [lottieUrl]);

  if (!fileUri) return null;

  return (
    <LottieView
      source={{ uri: fileUri }}
      autoPlay
      loop
      style={{ width: 200, height: 200 }}
    />
  );
}

export default DemoLottieFileCard;

 **********************/
