import React, { Component, useEffect } from "react";
import { LogBox, AppState } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./src/redux/configureStore";
import Navigation from "./src/Navigation";
import Containers from "./src/Containers";
import Toast, { ToastProvider } from "react-native-toast-notifications";
import { StripeProvider } from "@stripe/stripe-react-native";
// import Toast, { BaseToast } from 'react-native-toast-message';
import { color } from "@rneui/base";

const { store, persistor } = configureStore();
navigator.geolocation = require("@react-native-community/geolocation");
class App extends Component {
  constructor() {
    super();
  }

  // useEffect(() => {
  //   async function initializeStripe() {
  //     await Stripe.initializeAsync({
  //       publishableKey:
  //         "pk_test_51Oys55SANDSjH3mngiYm5S0Hr5P22rXKGksdc0vshAneGR1zdU2aYpeRDD6BfAqmudZ1ORyPKmUCrVTbrg1SiRLm00aCGBmtFg",
  //     });
  //   }
  //   initializeStripe();
  // }, []);

  componentDidMount() {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews",
    ]),
      LogBox.ignoreAllLogs();
    async function initializeStripe() {
      await Stripe.initializeAsync({
        publishableKey:
          "pk_test_51Oys55SANDSjH3mngiYm5S0Hr5P22rXKGksdc0vshAneGR1zdU2aYpeRDD6BfAqmudZ1ORyPKmUCrVTbrg1SiRLm00aCGBmtFg",
      });
    }
    initializeStripe();
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
      // <>
      <StripeProvider
        publishableKey="pk_test_51Oys55SANDSjH3mngiYm5S0Hr5P22rXKGksdc0vshAneGR1zdU2aYpeRDD6BfAqmudZ1ORyPKmUCrVTbrg1SiRLm00aCGBmtFg"
        // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        // merchantIdentifier="merchant.com.{{Datery}}" // required for Apple Pay
      >
        <ToastProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Containers />
            </PersistGate>
          </Provider>
          <Toast ref={(ref) => (global["toast"] = ref)} />
        </ToastProvider>
      </StripeProvider>
      //   {/* <Toast config={{
      //     error: (props) => (
      //       <BaseToast
      //         {...props}
      //         style={{ borderLeftColor: "red" }}
      //         contentContainerStyle={{ paddingHorizontal: 15 }}
      //         text2NumberOfLines={2}

      //       />
      //     )
      //   }} position={'bottom'} /> */}
      // {/* </> */}
    );
  }
}

export default App;
