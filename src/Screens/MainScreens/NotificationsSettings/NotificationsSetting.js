import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import color from "../../../Constants/Color";
import React from "react";
import { Switch } from "react-native-switch";
import styles from "./NotificationSettingsStyles";
import { BackHeader } from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
// import TextInputSimple from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import fonts from "../../../Constants/Fonts";
import * as Model from "../../../Components/models";
const NotificationsSetting = (props) => {
  const navigation = useNavigation();
  const [AnnouncementValue, setAnnouncementValue] = React.useState(false);
  const [RemindersValue, setRemindersValue] = React.useState(false);
  const [modalVisibleAvailablity, setModalVisibleAvailablity] =
    React.useState(false);
  const onPlaceOrder = () => {
    setModalVisibleAvailablity("true");
  };
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <BackHeader title={"Push Notifications"} />
        <View style={{ flex: 1, marginTop: 30 }}>
          <View style={styles.viewStyle}>
            <Text style={styles.textinputStyle}>Announcements </Text>
            <Switch
              value={AnnouncementValue}
              onValueChange={(val) => {
                setAnnouncementValue(val);
                // console.log(val);
              }}
              barHeight={25}
              circleSize={21}
              disabled={false}
              activeText={"ON"}
              inActiveText={"OFF"}
              backgroundActive={color._primary_orange}
              backgroundInactive={"#D8D8D8"}
              circleActiveColor={"#ffffff"}
              circleInActiveColor={"#ffffff"}
              circleBorderWidth={0}
              switchWidthMultiplier={3.4} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30}
            />
          </View>

          <View style={styles.viewStyle}>
            <Text style={styles.textinputStyle}>Reminders</Text>
            <Switch
              value={RemindersValue}
              onValueChange={(val) => {
                setRemindersValue(val);
                // console.log(val);
              }}
              barHeight={25}
              circleSize={21}
              disabled={false}
              activeText={"ON"}
              inActiveText={"OFF"}
              backgroundActive={color._primary_orange}
              backgroundInactive={"#D8D8D8"}
              circleActiveColor={"#ffffff"}
              circleInActiveColor={"#ffffff"}
              circleBorderWidth={0}
              switchWidthMultiplier={3.4} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30}
            />
          </View>
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
        discription="Notifications Updated!"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsSetting);
