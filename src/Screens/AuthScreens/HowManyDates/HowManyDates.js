import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import styles from "./HowManyDatesStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { removeAnswer, setAnswer, setHowManyDates } from "../../../modules/SetAnswer/actions";

const HowManyDates = (props) => {
  const navigation = useNavigation();
  const [howManyDates, setHowManyDates] = React.useState()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Molecules.BackHeader />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={0.076 * 7}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>7 of 13</Text>
        </View>
        <Text style={styles.textHeading}>
          How many “official dates” have you been on in the last six months?
        </Text>

        <View style={{ flex: 1, marginTop: "8%" }}>
          {/* <Molecules.SelectItem
            DATA={[
              { _id: 4, name: "10+ dates" },
              { _id: 2, name: "8 - 9 dates" },
              { _id: 3, name: "5 - 7 dates" },
              { _id: 5, name: "3 - 4 dates" },
              { _id: 6, name: "1 - 2 dates" },
              { _id: 7, name: "None" },
            ]}
            onChange={(data) => {
              setHowManyDates({howManyDates: data.name})
            }}
          /> */}
        </View>
        <Atom.Button
          onPress={() => {
            props.setHowManyDates(howManyDates),
            navigation.navigate("Budget");
          }}
          containerStyle={{ marginBottom:  "8%" }}
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
    setHowManyDates:(data)=> dispatch(setHowManyDates(data)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(HowManyDates);
