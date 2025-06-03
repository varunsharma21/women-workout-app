import { registerRootComponent } from "expo";

import App from "./App";
import WorkoutPlanContextProvider from "./store/WorkoutPlanContextProvider";
import UserInfoContextProvider from "./store/UserInfoContextProvider";
import { enableScreens } from "react-native-screens";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

enableScreens();
function Main() {
  return (
    <WorkoutPlanContextProvider>
      <UserInfoContextProvider>
        <App />
      </UserInfoContextProvider>
    </WorkoutPlanContextProvider>
  );
}

registerRootComponent(Main);
