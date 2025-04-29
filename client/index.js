import { registerRootComponent } from "expo";

import App from "./App";
import WorkoutPlanContextProvider from "./store/WorkoutPlanContextProvider";
import UserInfoContextProvider from "./store/UserInfoContextProvider";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

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
