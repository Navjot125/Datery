import { SafeAreaView, Text, View, TouchableOpacity, Platform, Dimensions } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import styles from "./SexualOrientationStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { answerRequest, removeAnswer, setAnswer, setSexualOrientation } from "../../../modules/SetAnswer/actions";
import { API_URL } from "../../../Constants/Config";

const SexualOrientation = (props) => {
  const navigation = useNavigation();
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  const [sexualOrientation, setSexualOrientation] = React.useState()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Molecules.BackHeader
          />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={0.152}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>3 of 13</Text>
        </View>
        
        <Text style={styles.textHeading}>What is your sexual orientation?</Text>

        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            marginTop: "8%",
          }}
        >
          {/* <Molecules.SelectItem
            DATA={[
              { _id: 4, name: "Exclusively attracted to women" },
              { _id: 2, name: "Mostly attracted to women" },
              { _id: 3, name: "Exclusively attracted to men" },
              { _id: 5, name: "Mostly attracted to men" },
              { _id: 6, name: "Equally attracted to men and women" },
              { _id: 7, name: "Asexual or non-sexual" },
            ]}
            onChange={(data) => {
              setSexualOrientation({ sexualOrientation: data.name })
            }}
          /> */}
        </View>
      </View>
      <Atom.Button
        onPress={() => {
          props.setSexualOrientation(sexualOrientation),
            navigation.navigate("RelationshipStatus");
        }}
        containerStyle={{ paddingHorizontal: 20, marginVertical: "8%" }}
        title={"NEXT"}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) =>
    dispatch(removeAnswer(data, navigation)),
  setSexualOrientation: (data) => dispatch(setSexualOrientation(data)),
  answerRequest: (data, navigation) => dispatch(answerRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SexualOrientation);
