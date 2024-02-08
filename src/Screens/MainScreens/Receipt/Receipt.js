import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  InteractionManager,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./ReceiptStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import * as PopUp from "../../../Components/models";
import * as Atom from "../../../Components/atoms";
import { API_URL } from "../../../Constants/Config";
import axiosClient from "../../../Utils/ApiClient";
import { ActivityIndicator } from "react-native";

const Receipt = (props) => {
  console.log(props.route.params.bookingI, "p");

  const [modalVisible, setModalVisible] = React.useState(false);
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );
  const [recipt, setRecipt] = useState();
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(true);
  const [selected, setSelected] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");

  const [cardDetails, setCardDetails] = useState({
    adress: "",
    city: "",
    state: "",
    ZipCode: "",
    Dietary: "",
  });

  const handleChange = (name, value) => {
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleRecipt = async () => {
    try {
      let query = `?bookingId=${props.route.params.bookingI}`;
      const res = await axiosClient.get(API_URL.getreceipt + query, {
        headers: {
          Authorization: userToken ? userToken : Usertoken,
        },
      });
      console.log(res.data, "CC");
      if (res.data.status) setRecipt(res.data.cartItem);
    } catch (error) {
      // console.log("ERR", error)
    }
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      handleRecipt();
    });
    let timeout = setTimeout(() => {
      setLoader(false);
    }, 3000);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isFocused]);

  const data = [
    {
      id: 1,
      media: require("../../../assets/images/dummyImage.png"),
      title: "Live Virtual Cooking Experience with Chef Jon",
      name: "Chef Jon",
      quantity: 1,
      schedule: "Availability",
      price: "$79.99",
    },
    {
      id: 2,
      media: require("../../../assets/images/dummyImage.png"),
      title: "Live Virtual Cooking Experience with Chef Jon",
      name: "Chef Jon",
      quantity: 3,
      schedule: "Thu, 07/05, 8:30 PM",
      price: "$79.99",
    },
  ];

  const ShowTextInput = (props) => {
    return (
      <View style={{ borderRadius: 8, marginVertical: 8, marginHorizontal: 5 }}>
        <View style={styles.summaryView}>
          <View style={[styles.card]}>
            <Text style={styles.leftTitle}>{props.leftTitle}</Text>
            <Text style={styles.leftTitle}>
              {props.dollar}
              {props.rightTitle}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const showData = ({ item }) => {
    console.log(item, "II");
    return (
      <View style={styles.cardView}>
        <View style={[styles.card]}>
          <Image
            source={{
              uri: `http://54.92.82.16:3001/data/${item?.providerImage}`,
            }}
            style={{
              height: 95,
              width: 110,
              borderRadius: 6,
              resizeMode: "cover",
            }}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              // padding: 15,
              // width: "80%",
            }}
          >
            <Text style={styles.textTitle}>{item.serviceName}</Text>
            <Text style={styles.textBetween}> {item.providerName}</Text>
            <Text style={styles.orangeText}>${item.servicePrice}</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setModalVisible(true)}
              style={styles.mediaType}
            >
              <Icon
                name={"calendar-alt"}
                size={11}
                color={color._primary_orange}
              />
              <Text style={styles.mediaType2}>
                {" "}
                {selectedDate ? selectedDate : "Buy Now, Book Later"}{" "}
                {selectedTime ? selectedTime.title : ""}
                {/* {"Availability"} */}
              </Text>
            </TouchableOpacity>
            {/* <Text style={styles.textStyle}>Quantity {item.quantity} </Text> */}
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={styles.headings}>Address</Text>
          <Atom.TextInputSimple
            textFieldStyle={styles.textField}
            value={cardDetails.adress}
            name={"adress"}
            onChangeText={(value) => handleChange("adress", value)}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 0.4 }}>
                <Text style={styles.headings}>city</Text>
                <Atom.TextInputSimple
                  value={cardDetails.city}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 156 }}
                  onChangeText={(value) => handleChange("city", value)}
                />
              </View>
              <View style={{ flex: 0.2 }}>
                <Text style={styles.headings}>state</Text>
                <Atom.TextInputSimple
                  value={cardDetails.state}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 70 }}
                  onChangeText={(value) => handleChange("state", value)}
                />
              </View>
              <View style={{ flex: 0.35 }}>
                <Text style={styles.headings}>Zip Code</Text>
                <Atom.TextInputSimple
                  keyboardType={"numeric"}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 70 }}
                  value={cardDetails.ZipCode}
                  onChangeText={(value) => handleChange("Zip Code", value)}
                />
                {/* {errors.cvv ? <Text>{errors.cvv}</Text> : null} */}
              </View>
            </View>
            <Text
              style={[styles.headings, { fontSize: 14, marginVertical: 10 }]}
            >
              Notes
            </Text>
            <Text style={styles.headings}>Dietary Restrictions</Text>
            <Atom.TextInputSimple
              textFieldStyle={styles.textField}
              value={cardDetails.Dietary}
              name={"Dietary"}
              onChangeText={(value) => handleChange("Dietary", value)}
            />
          </View>
        </View>
      </View>
    );
  };

  const formatDate = (isoDateString) => {
    const createdAtDate = new Date(isoDateString);
    const day = createdAtDate.getDate();
    const month = createdAtDate.toLocaleString("default", { month: "long" });
    const year = createdAtDate.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={{ marginVertical: 15, marginHorizontal: 10 }}>
        <BackHeader title={"Review Your Order"} />
      </View>
      <View
        style={[
          styles.mainView,
          loader && {
            justifyContent: "center",
          },
        ]}
      >
        {loader ? (
          <ActivityIndicator color={color._primary_orange} size={"large"} />
        ) : (
          <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
          >
            <FlatList
              data={recipt && recipt.bookeditems}
              keyExtractor={(item) => item._id}
              renderItem={showData}
            />
            <Text style={styles.summaryTitle}>Payment Method</Text>
            <View
              style={{
                borderRadius: 8,
                marginVertical: 8,
                marginHorizontal: 5,
              }}
            >
              <View style={styles.summaryView}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    source={require("../../../assets/images/Card.png")}
                    style={{ height: 32, width: 32, resizeMode: "contain" }}
                  />
                  <Text style={styles.leftTitle}>
                    {recipt && recipt.cardNumber}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.summaryTitle}>Purchase Date</Text>
            <ShowTextInput
              leftTitle={formatDate(recipt && recipt.createdAt)}
              // rightTitle={"215.89"}
            />
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <ShowTextInput
              leftTitle={"Total Price"}
              dollar={"$"}
              rightTitle={recipt && recipt.amount}
            />
          </ScrollView>
        )}
      </View>
      <PopUp.SlideUpPopUp
        isVisible={modalVisible}
        setSelected={setSelectedDate}
        selected={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onPress={() => {
          // navigation.navigate("PurchasedActivity"),
          setModalVisible(!modalVisible);
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
