import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import styles from "./GenderStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { removeAnswer, setAnswer, setGender } from "../../../modules/SetAnswer/actions";

const Gender = (props) => {
  const navigation = useNavigation();
  const [gender, setGender] = useState()
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
          <Text style={styles.textStyle}>2 of 13</Text>
        </View>

     
       
        <Atom.Button
          onPress={() => {
            props.setGender(gender),
              navigation.navigate("SexualOrientation");
          }}
          containerStyle={{ marginBottom: "8%" }}
          title={"NEXT"}
        />
      </View>
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
    setGender : (data)=> dispatch(setGender(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gender);
