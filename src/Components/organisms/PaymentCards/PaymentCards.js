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
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./PaymentCardsStyle";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/Entypo";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { ListItem, Button } from "@rneui/themed";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  CardAllDetailsRequest,
  CardAllDetailsSuccess,
  CardAllRequest,
  CardfavouriteListRequest,
  CardremoveFavouriteRequest,
  CardremoveGuestFavouriteRequest,
} from "../../../modules/addCard/actions";
import { roleRequest } from "../../../modules/Role/actions";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { CartListRequest } from "../../../modules/Cart/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import { API_URL } from "../../../Constants/Config";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../Common/Functions/CommonFunctions";
const PaymentCards = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const role = props.state.roleReducer.role.id;
  const [loader, setLoader] = useState(true);
  const isFocus = useIsFocused();
  const { details } = useSelector((state) => state.addCardReducer);

  const getCardRes = () => {
    const token = props?.state?.loginReducer?.userToken
      ? props?.state?.loginReducer?.userToken
      : props.state?.signupReducer?.signupSucessData?.Usertoken;
    let data = {
      // userId: props.state.loginReducer?.loginData._id ? props.state.loginReducer?.loginData._id :
      //   props.state?.signupReducer?.signupSucessData?.UserData?._id,
      endpoint: API_URL.getAllCard,
      // cardHolderName: cardDetails.name,
      // cardNumber: cardDetails.cardNumber,
      // exp_month: cardDetails.expiryMonth,
      // exp_year: cardDetails.expiryYear,
      // cardCVV: cardDetails.cvv,
      token,
    };
    // console.log("DDDDDD====", data)
    dispatch(CardAllDetailsRequest(data));
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      // console.log("DETTTTT", details)
      getCardRes();
    });
    let timeout = setTimeout(() => {
      setLoader(false);
    }, 300);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isFocus]);

  const handleDelete = (_id) => {
    // console.log(_id, "IIDDDDd");
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    const token = props?.state?.loginReducer?.userToken
      ? props?.state?.loginReducer?.userToken
      : props.state?.signupReducer?.signupSucessData?.Usertoken;
    let param = {
      endpoint: API_URL.deleteCard,
      data: {
        cardID: _id,
        token: token,
        // userId: props.state.loginReducer.loginData._id
      },
      cb: () => {
        showAlertSuccess(`Card removed Success `);
        getCardRes();
      },
      cbErr: (msg) => {
        showAlertError(msg);
        //  getCardRes()
      },
    };

    let cardID = {
      cardID: _id,
    };
    role == 2
      ? props.CardremoveFavouriteRequest(param)
      : props.CardremoveGuestFavouriteRequest(cardID);

    // setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEdit = (_id) => {
    navigation.navigate("EditCard", { cardId: _id });
    // console.log(_id, "IIDDDDd");
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardView}>
      <DropShadow style={styles.shadowProp}>
        <View style={[styles.card]}>
          <ImageBackground
            source={require("../../../assets/images/BackgroundVISA.png")}
            style={{ flex: 1 }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Image
                source={require("../../../assets/images/VISA.png")}
                style={{ width: 47, height: 28 }}
              />
              {item.default && (
                <View
                  style={{
                    backgroundColor: color._primary_orange,
                    justifyContent: "center",
                    right: "-50%",
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 20,
                      color: color._white,
                      textAlign: "center",
                    }}
                  >
                    Default
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Text style={styles.cardNumber}>.... </Text>
              <Text style={styles.cardNumber}>.... </Text>
              <Text style={styles.cardNumber}>.... </Text>

              <Text style={styles.cardNumber}> {item.cardNumber}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,

                alignItems: "flex-end",
              }}
            >
              <View style={{}}>
                <Text style={styles.cardTitle}>Card Holder</Text>
                <Text style={styles.cardValue}>{item.cardHolderName} </Text>
              </View>

              <View>
                <Text style={styles.cardTitle}>Expires </Text>
                <Text style={styles.cardValue}>
                  {item.exp_month}
                  {"/"}
                  {item.exp_year}{" "}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </DropShadow>
    </View>
  );

  const renderHiddenItem = (dataItem) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.actionButton, styles.editButton]}
        // onPress={() => handleEdit(dataItem.item.id)}
        onPress={() => handleEdit(dataItem.item._id)}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../../assets/images/editCard.png")}
        />
        {/* <Text style={styles.buttonText}>Edit</Text> */}
      </TouchableOpacity>
      {/* <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => handleDelete(dataItem.item._id)}
      >
        <Image style={{ height: 20, width: 20 }} source={require('../../../assets/images/deleteCard.png')} />
      </TouchableOpacity> */}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.scrollView,
        loader && {
          justifyContent: "center",
        },
      ]}
    >
      {loader ? (
        <ActivityIndicator color={color._primary_orange} size={"large"} />
      ) : (
        <View style={styles.mainView}>
          <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            {/* <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={showData}
          /> */}
            <SwipeListView
              data={details}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-75} // adjust this value based on your item width
            />
          </ScrollView>
          <Pressable
            style={styles.orangeButton}
            onPress={() =>
              // Alert.alert('hi')
              navigation.navigate("AddCard")
            }
          >
            {/* <Icon name={"plus"} size={14} color={color._white} /> */}
            <Text style={styles.orangeText}>{"ADD NEW CARD"}</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) => dispatch(removeAnswer(data, navigation)),
  setLoader: (data) => dispatch(setLoader(data)),
  CardAllRequest: (data) => dispatch(CardAllRequest(data)),
  CardAllDetailsRequest: (data, navigation) =>
    dispatch(CardAllDetailsRequest(data, navigation)),
  CardAllDetailsSuccess: (data, navigation) =>
    dispatch(CardAllDetailsSuccess(data, navigation)),
  CardfavouriteListRequest: (data) => dispatch(CardfavouriteListRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
  CardremoveFavouriteRequest: (navigation) =>
    dispatch(CardremoveFavouriteRequest(navigation)),
  CardremoveGuestFavouriteRequest: (data) =>
    dispatch(CardremoveGuestFavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCards);
