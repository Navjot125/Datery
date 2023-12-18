import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import styles from "./LongestRelationshipStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { removeAnswer, setAnswer, setLongestRelationshipLength } from "../../../modules/SetAnswer/actions";

const LongestRelationship = (props) => {
  const navigation = useNavigation();
  const [longestRealtionshipLength, setLongestRealtionshipLength] = React.useState()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Molecules.BackHeader />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={0.076 * 6}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>6 of 13</Text>
        </View>
        <Text style={styles.textHeading}>
          How long has your longest relationship been?
        </Text>

        <View style={{ flex: 1, marginTop: "8%" }}>
          {/* <Molecules.SelectItem
            DATA={[
              { _id: 4, name: "9+ Years" },
              { _id: 2, name: "5 - 9 Years" },
              { _id: 3, name: "3 - 5 Years" },
              { _id: 5, name: "1 - 3 Years" },
              { _id: 6, name: "6 -12 months" },
              { _id: 7, name: "Less than 6 Months" },
            ]}
            onChange={(data) => {
              setLongestRealtionshipLength({longestRelationshipLength: data.name})
            }}
          /> */}
        </View>
        <Atom.Button
          onPress={() => {
            props.setLongestRealtionshipLength(longestRealtionshipLength),
            navigation.navigate("HowManyDates");
          }}
          containerStyle={{ marginBottom: "8%"}}
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
    setLongestRealtionshipLength:(data)=> dispatch(setLongestRelationshipLength(data)),
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LongestRelationship);
