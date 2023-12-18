import { SafeAreaView, Text, View, TouchableOpacity, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import styles from "./TopicsStyle";
import { BackHeader } from "../../../Components/molecules";
import { removeAnswer, setAnswer, setTopic } from "../../../modules/SetAnswer/actions";

const TouchableOpacityOrange = () => {
  return (
    <View>
      <TouchableOpacity
            activeOpacity={0.9}
        style={{
          marginTop: 17,
          borderRadius: 122,
          width: 161,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderColor: color._border_orange,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Mulish-Bold",
            fontSize: 16,

            lineHeight: 20,
            color: color._font_Dark,

            textAlign: "center",
          }}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const DATA = [
  { _id: 11, name: "Commitment" },
  { _id: 2, name: "Sex" },
  { _id: 3, name: "Finances" },
  { _id: 4, name: "Romance" },
  { _id: 5, name: "First Dates" },
  { _id: 6, name: "Dating" },
  { _id: 7, name: "Marriage" },
  { _id: 8, name: "Gifts" },
  { _id: 9, name: "Family" },
  { _id: 10, name: "Closure" },
]
const Topics = (props) => {
  const navigation = useNavigation();
  const [topic, setTopic] = React.useState()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <BackHeader />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={0.76}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>10 of 13</Text>
        </View>
        <Text style={styles.textHeading}>
          Which relationship topics are you interested in learning about?
        </Text>
        <Text style={styles.orangeText}>( Select all that apply )</Text>
        <View
          style={{ justifyContent: "space-between", flex: 1, marginTop: 24 }}
        >
          {/* <Molecules.SelectItem
            DATA={DATA}
            onChange={(data) => {
              setTopic({topic: data})
            }}
            multiSelect={true}
            numColumns={2}
            double = {true}
          /> */}

        </View>
        <Atom.Button
          onPress={() => {
            props.setTopic(topic),
            navigation.navigate("DatingCoach");
          }}
          containerStyle={{ marginBottom: "8%" }}
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
    setTopic:(data) => dispatch(setTopic(data)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
