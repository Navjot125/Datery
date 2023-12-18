import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import styles from "./TypeOfDatesStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { removeAnswer, setAnswer, setTypeOfDates } from "../../../modules/SetAnswer/actions";

const TypeOfDates = (props) => {
  const navigation = useNavigation();
  const [typeOfDates, settypeOfDates] = React.useState([])
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
          <Text style={styles.textStyle}>9 of 13</Text>
        </View>
        <Text style={styles.textHeading}>
          What kind of date activities are you interested in?
        </Text>
        <Text style={styles.orangeText}>( Select all that apply )</Text>
        <View style={{ flex: 1, marginTop: "8%" }}>
          {/* <Molecules.SelectItem
            DATA={[
              { _id: 10, name: "Instructional Classes" },
              { _id: 2, name: "Active & Adventurous" },
              { _id: 3, name: "SPA & Massages" },
              { _id: 4, name: "Food & Drinks" },
              { _id: 5, name: "Guided Tours" },
              { _id: 6, name: "Entertainment" },
              { _id: 7, name: "DIY" },
              { _id: 8, name: "Free/ Low Cost" },
            ]} 
            onChange={(data) => {
              // console.log(data,'type of dates on change data')
              settypeOfDates({typeOfDates: data})
            }}
            multiSelect={true}
          /> */}
        </View>
        <Atom.Button
          onPress={() => {
            props.setTypeOfDates(typeOfDates),
            navigation.navigate("Topics");
          }}
          containerStyle={{  marginBottom : "8%"}}
          title={"NEXT"}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state:state
});

const mapDispatchToProps = (dispatch) => ({
  
  setAnswer: (data, navigation) =>
    dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) =>
    dispatch(removeAnswer(data, navigation)),
    setTypeOfDates:(data)=> dispatch(setTypeOfDates(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TypeOfDates);
