import { SafeAreaView, Text, View, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import styles from "./RelationshipStatusStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { removeAnswer, setAnswer, setRelationshipStatus } from "../../../modules/SetAnswer/actions";
import { Calendar } from "react-native-calendars";
import * as PopUp from "../../../Components/models";
import * as Model from "../../../Components/models";

const Gender = (props) => {
  const navigation = useNavigation();
  const [relationshipStatus, setRelationshipStatus] = React.useState()
  const [modalVisibleAvailablity, setModalVisibleAvailablity] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Molecules.BackHeader />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={0.076 * 4}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>4 of 13</Text>
        </View>
        <Text style={styles.textHeading}>
          What is your relationship status?
        </Text>

        <View style={{ flex: 1, marginTop: "8%" }}>
          {/* <Molecules.SelectItem
            DATA={[
              { _id: 4, name: "Single" },
              { _id: 2, name: "Dating" },
              { _id: 3, name: "In a relationship" },
              { _id: 5, name: "Married" },
            ]}
            onChange={(data) => {
              setRelationshipStatus({ relationshipStatus: data.name })
              // setRelationshipStatus(!relationshipStatus)
            }}
          /> */}
          {relationshipStatus &&
            <View style={{ marginTop: "2%" }}>
              <Pressable
                onPress={() => setModalVisible(true)}
              >
                <Atom.TextInput
                  TextIcon={"calendar"}
                  placeholder={"Anniversary"}
                  editable={false}
                />
              </Pressable>
              <Pressable onPress={() => {
                setModalVisible(true)
              }}>
                <Atom.TextInput
                  TextIcon={"calendar"}
                  placeholder={"Partner’s Birthday"}
                  editable={false}
                />
              </Pressable>
            </View>
          }

        </View>
        <Atom.Button
          onPress={() => {
            props.setRelationshipStatus(relationshipStatus),
              navigation.navigate("CurrentRelationshipLength");
          }}

          containerStyle={{ marginVertical: "8%" }}
          title={"NEXT"}
        />
      </View>

      <PopUp.SlideUpPopUp
        isVisible={modalVisible}
        onPress={() => {
          // navigation.navigate("PurchasedActivity"), 
          setModalVisible(!modalVisible)
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <Model.CommonPopUp
        isVisible={false}
        // onRequestClose={() => { setModalVisibleAvailablity(false) }}
        title="Plan Dates"
        titleTxt={{ fontSize: 24 }}
        discription="User account required to plan dates."
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt={"SIGN IN"}
        onPress={() => { setModalVisibleAvailablity(false) }}
      />








    </SafeAreaView >
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer: (data, navigation) =>
    dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) =>
    dispatch(removeAnswer(data, navigation)),
  setRelationshipStatus: (data) => dispatch(setRelationshipStatus(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gender);
