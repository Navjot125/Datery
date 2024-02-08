import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import color from "../../../Constants/Color";
import React from "react";
import * as Model from "../../../Components/models";
import styles from "./EmailPreferenceStyle";
import { BackHeader } from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
// import TextInputSimple from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
const EmailPreference = (props) => {
  const navigation = useNavigation();
  const [modalVisibleAvailablity, setModalVisibleAvailablity] =
    React.useState(false);
  const onPlaceOrder = () => {
    setModalVisibleAvailablity("true");
  };
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <BackHeader title={"Email Preferences"} />
        <View style={{ flex: 1 }}>
          <Text style={styles.header}>Email Address</Text>
          <Text style={styles.textinputStyle}>Datery@gmail.com</Text>
          <Text style={styles.header}>Marketing Emails</Text>
          <Text style={styles.textinputStyle}>
            Opt in to our emails to receive the latest updates on dating
            activities in your area.
          </Text>
          <Atom.CheckBox
            label={"Opt in to emails"}
            containerStyle={{ marginVertical: 23 }}
            labelStyle={styles.labelStyle}
          />
          <Text style={styles.textinputStyle}>
            Update your preferences in your{" "}
            <Text
              style={styles.orangeTextSmall}
              onPress={() => navigation.navigate("DatingProfile")}
            >
              Dating Profile.
            </Text>
          </Text>
          <Text style={styles.header}>Email Surveys</Text>
          <Text style={styles.textinputStyle}>
            Opt in to receive occasional emails about how we’re meeting your
            needs as a customer and how we can improve.
          </Text>
          <Atom.CheckBox
            label={"Opt in to surveys"}
            containerStyle={{ marginVertical: 23 }}
            labelStyle={styles.labelStyle}
          />
        </View>
        <Atom.Button
          onPress={() => onPlaceOrder()}
          containerStyle={{ marginVertical: "8%" }}
          title={"SAVE"}
        />
      </View>
      <Model.CommonPopUp
        isVisible={modalVisibleAvailablity}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Preferences Updated!"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt="BACK TO PROFILE"
        onPress={() => {
          setModalVisibleAvailablity(false), navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EmailPreference);
