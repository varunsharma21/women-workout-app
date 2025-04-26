import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const cacheLottieFiles = async (exercises) => {
  const downloads = exercises.map(async (exercise) => {
    const lottieUrl = exercise.lottieLink;
    const fileName = lottieUrl.split("/").pop();
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      try {
        await FileSystem.downloadAsync(lottieUrl, fileUri);
        console.log(`Downloaded: ${fileName}`);
      } catch (error) {
        console.error(`Failed to download ${fileName}: `, error);
      }
    } else {
      console.log(`Already cached: ${fileName}`);
    }
  });

  await Promise.all(downloads);
};

export default cacheLottieFiles;
