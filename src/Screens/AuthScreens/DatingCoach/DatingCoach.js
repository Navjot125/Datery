import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
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
import styles from "./DatingCoachStyles";
import { connect } from "react-redux";
import { removeAnswer, setAnswer, setDatingCoach } from "../../../modules/SetAnswer/actions";

const TouchableOpacityOrange = (props) => {
  
  return (
    <View>
      <TouchableOpacity
            activeOpacity={0.9}

        style={{
          marginTop: 17,
          borderRadius: 122,
          width: 332,
          height: 40,

          alignItems: "center",
          justifyContent: "center",
          borderColor: color._border_orange,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.MEDIUM,
            fontSize: 14,

            lineHeight: 21,
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

const DatingCoach = (props) => {
  const navigation = useNavigation();
  const [datingCoach, setDatingCoach] = React.useState()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <BackHeader />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={0.836}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>11 of 13</Text>
        </View>
        <Text style={styles.textHeading}>
          How likely are you to seek relationship advice from a dating or
          relationship coach?
        </Text>

        <View style={{ flex: 1, marginTop: "8%" }}>
          {/* <Molecules.SelectItem
            DATA={[
              { _id: 1, name: "Very Likely" },
              { _id: 2, name: "Likely" },
              { _id: 3, name: "Slightly Likely" },
              { _id: 4, name: "Slightly Unlikely" },
              { _id: 5, name: "Unlikely" },
              { _id: 6, name: "Very Unlikely" },
            ]}
            onChange={(data) => {
              setDatingCoach({datingCoach: data.name })
            }}
          /> */}
        </View>
        <Atom.Button
          onPress={() => {
            props.setDatingCoach(datingCoach),
            navigation.navigate("Kids");
          }}
          containerStyle={{ marginBottom : '8%' }}
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
    setDatingCoach:(data)=> dispatch(setDatingCoach(data)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(DatingCoach);
