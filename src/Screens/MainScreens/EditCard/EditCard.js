import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Alert,
  ScrollView,
  InteractionManager,
  ActivityIndicator,
} from "react-native";
// import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import styles from "./EditCardStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { ListItem, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as Atom from "../../../Components/atoms";
import * as Models from "../../../Components/models";
import { connect, useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../../Constants/Config";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../Common/Functions/CommonFunctions";
import axiosClient from "../../../Utils/ApiClient";
import {
  CardAllDetailsRequest,
  CardAllDetailsSuccess,
  CardEditRequest,
  CardfavouriteListRequest,
  CardremoveFavouriteRequest,
  CardremoveGuestFavouriteRequest,
} from "../../../modules/addCard/actions";
import { roleRequest } from "../../../modules/Role/actions";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { CartListRequest } from "../../../modules/Cart/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";

const EditCard = (props) => {
  // console.log(props.route.params.cardId, "PPPPP====");

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [cardDetail, setCardDetail] = useState("");
  const [loader, setLoader] = useState(true);
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );
  const role = useSelector((state) => state.roleReducer.role);
  // const role = props.state.roleReducer.role.id
  const dispatch = useDispatch();
  const [card, setCard] = useState({
    default: false,
    address: "",
    zipCode: "",
    city: "",
    state: "",
  });

  const handleChange = (name, value) => {
    setCard({ ...card, [name]: value });
  };
  const validateField = (name, value) => {
    const regexMap = {
      name: /^[a-zA-Z\s.'-]+$/,
      cardNumber: /^\d{12,19}$/,
      expiryMonth: /^(0?[1-9]|1[0-2])$/,
      expiryYear: /^(20\d{2})$/,
      cvv: /^\d{3,4}$/,
    };
    // console.log(name, value)

    const regex = regexMap[name];
    if (!regex.test(value)) {
      // setErrors({ ...errors, [name]: `Invalid ${name === 'cvv' ? 'CVV' : name}` });
      Alert.alert(`Invalid ${name === "cvv" ? "CVV" : name}`);
      // Toast.show({
      //   type: 'error',
      //   text1: name,
      //   text2: `Invalid ${name === 'cvv' ? 'CVV' : name}`,
      // });
      return false;
    }

    setErrors({ ...errors, [name]: "" });
    return true;
  };
  const handleEdit = () => {
    try {
      // Create a card token using react-native-stripe-sdk
      const token = userToken ? userToken : Usertoken;
      const data = {
        userId: loginData._id ? loginData._id : signupSucessData?.UserData?._id,
        default: card?.default,
        address: card?.address,
        zipCode: card?.zipCode,
        city: card?.city,
        state: card?.state,
        cardID: card?._id,
      };
      if (!data.default) delete data.default;
      // setLoader(false)
      const callback = (res) => {
        showAlertSuccess(`Card update Successfully `);
        setModalVisibleUpdate(true);
        // setLoader(true)
      };
      dispatch(
        CardEditRequest({ data, callback, token, endpoint: API_URL.editCard })
      );
      setCard({
        zipCode: "",
        address: "",
        city: "",
        state: "",
        default: false,
      });
    } catch (error) {
      // setLoader(false);
      // console.log("ERRROORrr", error)
      // Handle any errors that occurred during the payment process
      showAlertError(msg);

      // Alert.alert(error.Error);
    }
  };

  const handleRes = async () => {
    try {
      const res = await axiosClient.post(
        API_URL.getCard,
        {
          cardId: props.route.params.cardId,
        },
        {
          headers: {
            Authorization: userToken ? userToken : Usertoken,
          },
        }
      );
      if (res.data.status) setCard(res.data.data);
    } catch (error) {
      // console.log("ERR", error)
    }
  };

  const getCardRes = () => {
    const token = userToken ? userToken : Usertoken;
    let data = {
      // userId: props.state.loginReducer?.loginData._id ? props.state.loginReducer?.loginData._id :
      //   props.state?.signupReducer?.signupSucessData?.UserData?._id,
      endpoint: API_URL.getAllCard,
      token,
    };
    // console.log("DDDDDD====", data)
    dispatch(CardAllDetailsRequest(data));
  };
  const handleDelete = (_id) => {
    console.log(_id, "IIDDDDd");
    try {
      // setData((prevData) => prevData.filter((item) => item.id !== id));
      const token = userToken ? userToken : Usertoken;
      let param = {
        endpoint: API_URL.deleteCard,
        data: {
          cardID: _id,
          token: token,
          // userId: props.state.loginReducer.loginData._id
        },
        cb: () => {
          // setLoader(false)
          // showAlertSuccess(`Card removed Success `)
          getCardRes();
          setModalVisible(false);
          setTimeout(() => {
            setModalVisibleUpdate(true);
          }, 1000);
          console.log("callBack of handleDelete");
          // navigation.goBack()
        },
        cbErr: (msg) => {
          showAlertError(msg);
          console.log("callError of handleDelete");
          //  getCardRes()
        },
      };
      let cardID = {
        cardID: _id,
      };
      role.id == 2
        ? dispatch(CardremoveFavouriteRequest(param))
        : dispatch(CardremoveGuestFavouriteRequest(cardID));

      // setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (e) {
      // console.log(e)
    }
  };
  // console.log(role, 'role')

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      handleRes();
      // setLoader(true)
    });
    let timeout = setTimeout(() => {
      setLoader(false);
    }, 100);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // console.log('card', card)
  return (
    <SafeAreaView style={styles.scrollView}>
      <BackHeader title={"Edit Payment Card"} />
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
          <View style={styles.mainView}>
            <ScrollView
              bounces={false}
              alwaysBounceVertical={false}
              overScrollMode="never"
              style={{ marginTop: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.headings}>Name on Card</Text>
              <Atom.TextInputSimple
                textFieldStyle={styles.textField}
                value={card?.cardHolderName}
                editable={false}
              />
              <Text style={styles.headings}>Card Number</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderColor: "#DCDCDD",
                  borderWidth: 1,
                  borderRadius: 50,
                  height: 60,
                }}
              >
                <Text style={styles.textField}>{"...."} </Text>
                <Text style={styles.textField}>{"...."} </Text>
                <Text style={styles.textField}>{"...."} </Text>
                <Text style={styles.textField}>{card?.cardNumber} </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.headings}>Expiration date</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      left: -12,
                    }}
                  >
                    <Atom.TextInputSimple
                      textFieldStyle={{ height: 48, width: 57 }}
                      value={card?.exp_month}
                      editable={false}
                    />
                    <Atom.TextInputSimple
                      textFieldStyle={{ height: 48, width: 77 }}
                      value={card?.exp_year}
                      editable={false}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.headings}>CVV</Text>
                  <Atom.TextInputSimple
                    keyboardType={"numeric"}
                    value={"***"}
                    editable={false}
                    textFieldStyle={{ height: 48, width: 156 }}
                  />
                </View>
              </View>
              <Atom.CheckBox
                label={"Set as default payment method"}
                labelStyle={styles.checkBoxStyle}
                checkValue={card?.default}
                onPress={() => handleChange("default", !card?.default)}
              />
              <Text style={styles.headingAddress}>Billing Address</Text>
              <Text style={styles.headings}>Address</Text>
              <Atom.TextInputSimple
                textFieldStyle={styles.textField}
                value={card?.address}
                onChangeText={(value) => handleChange("address", value)}
              />
              <Text style={styles.headings}>City</Text>
              <Atom.TextInputSimple
                textFieldStyle={styles.textField}
                value={card?.city}
                onChangeText={(value) => handleChange("city", value)}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={styles.headings}>State</Text>
                  <Atom.TextInputSimple
                    textFieldStyle={{ height: 48, width: 157 }}
                    value={card?.state}
                    onChangeText={(value) => handleChange("state", value)}
                  />
                </View>
                <View>
                  <Text style={styles.headings}>Zip code</Text>
                  <Atom.TextInputSimple
                    keyboardType={"numeric"}
                    textFieldStyle={{ height: 48, width: 156 }}
                    value={card?.zipCode}
                    onChangeText={(value) => handleChange("zipCode", value)}
                  />
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.orangeText}>Remove Card</Text>
              </TouchableOpacity>
              <Atom.Button
                onPress={() => {
                  handleEdit();
                }}
                title={"UPDATE"}
              />
              <Text style={styles.lastHeading}>
                <Icon name="shield-checkmark" size={15} color={"#726A6A"} />{" "}
                Information is sent over a secure connection
              </Text>
            </ScrollView>
          </View>
        )}
      </View>

      <Models.ConfirmationPopUp
        isVisible={modalVisible}
        discription={"Are you sure you want to delete this card?"}
        descriptionTxt={{
          padding: 20,
          fontFamily: fonts.MEDIUM,
          fontSize: 16,
          color: color._black,
          textAlign: "center",
        }}
        onPressNo={() => {
          setModalVisible(!modalVisible);
        }}
        onPressYes={() => {
          // setLoader(true)
          handleDelete(card?._id);
          // setModalVisible(!modalVisible);
          // navigation.navigate("PaymentMethods");
        }}
      />
      <Models.CommonPopUp
        isVisible={modalVisibleUpdate}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Payment Method Updated!"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt="BACK TO PAYMENTS"
        onPress={() => {
          navigation.goBack(), setModalVisibleUpdate(false);
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) => dispatch(removeAnswer(data, navigation)),
  setLoader: (data) => dispatch(setLoader(data)),
  CardEditRequest: (data) => dispatch(CardEditRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
  CardAllRequest: (data) => dispatch(CardAllRequest(data)),
  CardAllDetailsRequest: (data, navigation) =>
    dispatch(CardAllDetailsRequest(data, navigation)),
  CardAllDetailsSuccess: (data, navigation) =>
    dispatch(CardAllDetailsSuccess(data, navigation)),
  CardfavouriteListRequest: (data) => dispatch(CardfavouriteListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
  CardremoveFavouriteRequest: (navigation) =>
    dispatch(CardremoveFavouriteRequest(navigation)),
  CardremoveGuestFavouriteRequest: (data) =>
    dispatch(CardremoveGuestFavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);
