import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { useNavigation } from "@react-navigation/native";
import { BackHeader } from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import styles from "./KidsStyle";
import { connect } from "react-redux";
import { removeAnswer, setAnswer, setKids } from "../../../modules/SetAnswer/actions";

const Kids = (props) => {
  const navigation = useNavigation();
  const [kids, setKids] = React.useState()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <BackHeader />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={0.912}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>12 of 13</Text>
        </View>
        <Text style={styles.textHeading}>
          Do you have kids under 12 years old?
        </Text>

        <View style={{ flex: 1, marginTop: "8%" }}>
          <Molecules.SelectItem
            DATA={[
              { _id: 1, name: "Yes" },
              { _id: 2, name: "No" },
            ]}
            onChange={(data) => {
              setKids({kids: data.name})
            }}
          />
        </View>
        <Atom.Button
          onPress={() => {
            props.setKids(kids),
            navigation.navigate("Location");
          }}
          containerStyle={{ marginBottom : "8%" }}
          title={"NEXT"}
        />
      </View>
    </SafeAreaView>
  ); 
};

const mapStateToProps = (state) => ({
  state:state});

const mapDispatchToProps = (dispatch) => ({
  setAnswer: (data, navigation) =>
    dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) =>
    dispatch(removeAnswer(data, navigation)),
    setKids: (data)=> dispatch(setKids(data))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Kids);
