import { SafeAreaView, Text, View, TouchableOpacity, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import styles from "./BudgetStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { removeAnswer, setAnswer, setBudget } from "../../../modules/SetAnswer/actions";

const Budget = (props) => {
  const navigation = useNavigation();
  const [budget, setBudget] = React.useState()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Molecules.BackHeader />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={0.076 * 8}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>8 of 13</Text>
        </View>
        <Text style={styles.textHeading}>
          What is averge amount of money you perfer to spend on a date?
        </Text>

        <View style={{ flex: 1, marginTop: "8%" }}>
          {/* <Molecules.SelectItem
            DATA={[
              { _id: 4, name: "$300+" },
              { _id: 2, name: "$200 - $300" },
              { _id: 3, name: "$150 - $200" },
              { _id: 5, name: "$100 - $150" },
              { _id: 6, name: "$50 - $100" },
              { _id: 7, name: "$50 or less" },
              { _id: 8, name: "I don’t pay for dates" },
            ]}
            onChange={(data) => {
              setBudget({budget: data.name})
            }}
          /> */}
        </View>
        <Atom.Button
          onPress={() => {
            props.setBudget(budget),
            navigation.navigate("TypeOfDates");
          }}
          containerStyle={{ marginBottom : "8%"}}
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
    setBudget: (data)=> dispatch(setBudget(data)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
