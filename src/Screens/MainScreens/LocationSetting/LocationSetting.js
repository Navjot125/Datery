import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import color from "../../../Constants/Color";
import React from "react";

import styles from "./LocationSettingStyle";
import { BackHeader } from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
// import TextInputSimple from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
const LocationSetting = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <BackHeader title={"Location"} />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={require("../../../assets/images/Location.png")}
            style={{ width: 49, height: 65, marginBottom: 41, marginTop: 55,tintColor:color._primary_orange }}
          />
          <Text style={styles.orangeText}>
            Discover Exclusive Dating Activities Nearby
          </Text>
          <Text style={styles.header}>
            {" "}
            Go to your location settings and select{" "}
            <Text style={{ color: color._border_orange }}>
              {" "}
              Location {">"} While in use{" "}
            </Text>
            to allow Comfility to send you push notifications about unique
            dating activites nearby.
          </Text>
          <Text
            style={styles.orangeTextSmall}
            onPress={() => alert("Open settings")}
          >
            Open Phone Settings{" "}
          </Text>
        </View>
        <Atom.Button
          onPress={() => alert("Open settings")}
          containerStyle={{ marginVertical: "8%" }}
          title={"GO TO SETTINGS"}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSetting);
