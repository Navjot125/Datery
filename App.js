import React, { Component } from "react";
import { LogBox, AppState } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./src/redux/configureStore";
import Navigation from "./src/Navigation";
import Containers from "./src/Containers";
import Toast from 'react-native-toast-notifications';
// import Toast, { BaseToast } from 'react-native-toast-message';
import { color } from "@rneui/base";


const { store, persistor } = configureStore();
navigator.geolocation = require('@react-native-community/geolocation');
class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']),
      LogBox.ignoreAllLogs();
  }
  render() {
    AppState.addEventListener("change", (state) => {
      if (state === "active") {
        console.log("Current App State is active");
      } else if (state === "background") {
        console.log("Current App State is background");
      } else if (state === "inactive") {
        console.log("Current App State is inactive");
      }
    });

    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Containers />
          </PersistGate>
        </Provider>
        <Toast ref={ref => (global['toast'] = ref)} />
        {/* <Toast config={{
          error: (props) => (
            <BaseToast
              {...props}
              style={{ borderLeftColor: "red" }}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              text2NumberOfLines={2}

            />
          )
        }} position={'bottom'} /> */}
      </>
    );
  }
}

export default App;
