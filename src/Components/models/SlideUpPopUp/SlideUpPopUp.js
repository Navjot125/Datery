import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Calendar, LocaleConfig } from "react-native-calendars";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Cross from "react-native-vector-icons/AntDesign";
import * as Atom from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

const timeShown = [
  { id: 1, title: "5:30 PM" },
  { id: 2, title: "6:00 PM" },
  { id: 3, title: "6:30 PM" },
  { id: 4, title: "7:00 PM" },
  { id: 5, title: "7:30 PM" },
  { id: 6, title: "8:00 PM" },
  { id: 7, title: "8:30 PM" },
  { id: 8, title: "9:00 PM" },
  { id: 9, title: "9:30 PM" },
  { id: 10, title: "10:00 PM" },
  { id: 11, title: "10:30 PM" },
  { id: 12, title: "11:00 PM" },
];
export const SlideUpPopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [daystring, setdaystring] = React.useState("");

  const {
    isVisible,
    onRequestClose,
    onRef,
    onPress,
    selected,
    setSelected,
    onPressCancel,
    setSelectedTime,
    selectedTime,
    cancelTitle,
    buttonText,
  } = props;

  React.useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const showData = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          flex: 1,
          alignItems: "center",
        }}
        onPress={() => {
          setSelectedTime(item);
        }}
      >
        <Text style={item === selectedTime ? styles.timeSelected : styles.time}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              if (onRequestClose !== undefined) {
                setModalVisible(!modalVisible);
                onRequestClose();
              }
            }}
          >
            <Cross
              name={"closecircleo"}
              size={22}
              color={color._primary_orange}
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Select Date</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              if (onRequestClose !== undefined) {
                setModalVisible(!modalVisible);
                onRequestClose();
              }
            }}
          >
            {/* <Text style={styles.orangeText}>Done</Text> */}
          </TouchableOpacity>
        </View>
        <Calendar
          style={{
            marginTop: 31,
            marginBottom: 19,
            width: "100%",
            alignSelf: "center",
          }}
          theme={{
            todayTextColor: color._black,
            textDayFontFamily: fonts.REGULAR,
            textDayFontSize: 16,
            textMonthFontFamily: fonts.SEMI_BOLD,
            textMonthFontSize: 18,
            textDayHeaderFontFamily: fonts.SEMI_BOLD,
            textDayHeaderFontSize: 14,
            dayTextColor: color._black,
            textSectionTitleColor: color._black,
            arrowColor: color._black,
            monthTextColor: color._border_orange,
          }}
          onDayPress={(day) => {
            setSelected(day.dateString);
            // console.log("DAY---", day);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: color._primary_orange,
            },
          }}
        />
        <Text style={styles.orangeTextTime}>Select Time</Text>
        <View style={{ marginTop: 21 }}>
          <FlatList
            data={timeShown}
            keyExtractor={(item, index) => item.id}
            renderItem={showData}
            numColumns={4}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text>Type</Text>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: color._primary_orange,
              borderRadius: 10,
              padding: 5,
              marginVertical: 5,
            }}
          >
            <Image
              style={{ height: 15, width: 15, marginHorizontal: 5 }}
              source={require("../../../assets/images/wtravel.png")}
            />
            <Text style={{ fontSize: 12, color: "white" }}>Travels to You</Text>
          </View>
        </View>
        {props?.cancelTitle && (
          <TouchableOpacity activeOpacity={0.9} onPress={() => onPressCancel()}>
            <Text style={styles.cancel}>{props?.cancelTitle}</Text>
          </TouchableOpacity>
        )}
        <Atom.Button
          onPress={() => onPress(selected)}
          title={buttonText ? buttonText : "DONE"}
        />
      </ScrollView>
    </View>
  );

  return (
    <View>
      <Modal
        isVisible={modalVisible}
        style={styles.bottomModal}
        animationType="slide"
        onBackButtonPress={() => {
          if (onRequestClose !== undefined) {
            setModalVisible(!modalVisible);
            onRequestClose();
          }
        }}
        onBackdropPress={() => {
          if (onRequestClose !== undefined) {
            setModalVisible(!modalVisible);
            onRequestClose();
          }
        }}
      >
        {renderModalContent()}
      </Modal>
    </View>
  );
};

export default SlideUpPopUp;
const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    // justifyContent: "center",
    // alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "70%",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },

  textTitle: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: color._black,
    // width: 203,
  },
  orangeText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: color._primary_orange,
  },
  orangeTextTime: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: color._primary_orange,
    textAlign: "center",
  },
  cancel: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._primary_orange,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 38,
  },
  time: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._black,

    paddingHorizontal: 15,
    paddingVertical: 8,
    textAlign: "center",
    marginBottom: 31,
    borderRadius: 10,
  },
  timeSelected: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._white,
    backgroundColor: color._primary_orange,
    paddingHorizontal: 15,
    paddingVertical: 8,
    textAlign: "center",
    marginBottom: 31,
    borderRadius: 10,
  },
});
