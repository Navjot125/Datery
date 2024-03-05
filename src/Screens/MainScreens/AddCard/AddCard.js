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
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./AddCardStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/Ionicons";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { ListItem, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import * as Atom from "../../../Components/atoms";
import * as Models from "../../../Components/models";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {
  CardAllDetailsRequest,
  CardAllRequest,
  CardfavouriteListRequest,
} from "../../../modules/addCard/actions";
import { API_URL } from "../../../Constants/Config";
import { roleRequest } from "../../../modules/Role/actions";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { CartListRequest } from "../../../modules/Cart/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import { ActivityIndicator } from "react-native";

const AddCard = (props) => {
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const fromOnboarding = props?.route?.params?.fromOnboarding;
  const [date, setDate] = useState("");
  const [name, setName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [cvv, setCvv] = useState();
  const [number, setNumber] = useState("");
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    default: false,
    adress: "",
    zipCode: "",
    city: "",
    state: "",
    date: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .matches(
        /^[^\s]+(\s+[^\s]+)*$/,
        "Only one space between words is allowed"
      ),
    cardNumber: Yup.string()
      .required("Credit card number is required")
      .test("creditCardNumber", "Invalid credit card number", (value) => {
        const formattedValue = value.replace(/\D/g, "");
        const validLengths = {
          Visa: 16,
          Mastercard: 16,
        };
        let sum = 0;
        let doubled = false;
        for (let i = formattedValue.length - 1; i >= 0; i--) {
          let digit = parseInt(formattedValue[i]);
          if (doubled) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }
          sum += digit;
          doubled = !doubled;
        }
        return sum % 10 === 0;
      }),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, "CVV must be a valid three or four-digit number")
      .required("CVV is required"),
    date: Yup.string()
      .required("Expiry date is required")
      .matches(
        /^([1-9]|0[1-9]|1[0-2])\/([0-9]{2})$/,
        "Invalid expiry date format (MM/YY)"
      ),
  });
  const handleChangeCardNumber = (text) => {
    setNumber(formatCardNumber(text));
  };

  const formatCardNumber = (value) => {
    const formattedValue = value.replace(/\D/g, "");
    const groups = formattedValue.match(/\d{1,4}/g);
    if (groups) {
      return groups.join(" ");
    }
    return formattedValue;
  };
  const handleInputChange = (value) => {
    let formattedValue;
    let groups;
    if (value.length <= 5) {
      formattedValue = value.replace(/\D/g, "");
      groups = formattedValue.match(/\d{1,2}/g);
      if (groups) {
        console.log("groups-----0", groups?.[0]);
        console.log("groups-----1", groups?.[1]);
        // month(groups/)
        return groups.join("/");
      }
      return formattedValue;
    }
    // console.log(date,'[[[[[[[');
    return date;
  };
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      // setLoader(true)
    });
    let timeout = setTimeout(() => {
      setLoader(false);
    }, 100);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const [error, setError] = useState();
  const [errors, setErrors] = useState({
    name: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleChange = (name, value) => {
    name === "cardNumber"
      ? (setCardNumber(formatCardNumber(value)),
        setCardDetails({ ...cardDetails, [name]: formatCardNumber(value) }))
      : setCardDetails({ ...cardDetails, [name]: value });
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
      // Alert.alert(`Invalid ${name === "cvv" ? "CVV" : name}`);
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
  const isFormValid = () => {
    let isValid = true;

    for (const field in cardDetails) {
      if (cardDetails.hasOwnProperty(field)) {
        isValid = isValid && validateField(field, cardDetails[field]);
      }
    }

    return isValid;
  };
  const navigation = useNavigation();
  // const { cardDetails, handleChange, errors, isFormValid } = useCardForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  const [state, setState] = useState({
    setDefault: false,
  });
  const handleState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };
  console.log(error, "----------error", cardNumber);
  const handlePayment = () => {
    validationSchema
      // .validate({ name, cardNumber, cvv, date }, { abortEarly: false })
      .validate({ name, cardNumber, cvv, date }, { abortEarly: false })
      .then(() => {
        console.log();
      })
      .catch((error) => {
        const validationErrors = {};
        console.log(error, "error");

        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setError(validationErrors);
      });

    // try {
    //   // Create a card token using react-native-stripe-sdk
    //   const token = props?.state?.loginReducer?.userToken
    //     ? props?.state?.loginReducer?.userToken
    //     : props.state?.signupReducer?.signupSucessData?.Usertoken;
    //   const data = {
    //     userId: props.state.loginReducer?.loginData._id
    //       ? props.state.loginReducer?.loginData._id
    //       : props.state?.signupReducer?.signupSucessData?.UserData?._id,

    //     cardHolderName: cardDetails.name,
    //     cardNumber: cardDetails.cardNumber,
    //     exp_month: cardDetails.expiryMonth,
    //     exp_year: cardDetails.expiryYear,
    //     cardCVV: cardDetails.cvv,
    //     default: cardDetails.default,
    //     address: cardDetails.adress,
    //     zipCode: cardDetails.zipCode,
    //     city: cardDetails.city,
    //     state: cardDetails.state,
    //   };
    //   if (!data.default) delete data.default;
    //   setLoader(false);
    //   const callback = (res) => {
    //     navigation.goBack();
    //     setLoader(false);
    //   };
    //   dispatch(
    //     CardAllRequest({ data, callback, token, endpoint: API_URL.addCard })
    //   );
    //   setCardDetails({
    //     name: "",
    //     cardNumber: "",
    //     expiryMonth: "",
    //     expiryYear: "",
    //     cvv: "",
    //   });
    // } catch (error) {
    //   setLoader(false);
    //   // console.log("ERRROORrr", error)
    //   // Handle any errors that occurred during the payment process
    //   Alert.alert(error.Error);
    // }
  };

  // useEffect(() => {
  //   InteractionManager.runAfterInteractions(() => {
  //     console.log("DETTTTT", details)
  //     getCardRes()
  //   })
  //   let timeout = setTimeout(() => {
  //     setLoader(false)
  //   }, 300)
  //   return () => {
  //     if (timeout) clearTimeout(timeout)
  //   }
  // }, [isFocus])
  {
    // console.log("cardDetails--", cardDetails);
  }
  return (
    <SafeAreaView style={styles.scrollView}>
      <BackHeader title={"Add Payment Card"} />
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
            style={{ marginTop: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.headings}>Name on Card</Text>
            <Atom.TextInputSimple
              textFieldStyle={[styles.textField]}
              value={cardDetails.name}
              name={"name"}
              onChangeText={(value) => {
                setName(value),
                  handleChange("name", value),
                  setError({ ...error, name: "" });
              }}
            />
            {error?.name ? (
              <Text style={styles?.inputErrorText}>{error?.name}</Text>
            ) : null}

            <Text style={styles.headings}>Card Number</Text>
            <Atom.TextInputSimple
              maxLength={19}
              name={"cardNumber"}
              textFieldStyle={styles.textField}
              keyboardType={"numeric"}
              // value={cardDetails?.cardNumber}
              value={cardNumber}
              onChangeText={(value) => {
                // handleChangeCardNumber(value);
                setCardNumber(formatCardNumber(value));
                handleChange("cardNumber", value);
                setError({ ...error, number: "" });
              }}
            />
            {error?.number ? (
              <Text style={styles?.inputErrorText}>{error?.number}</Text>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.headings}>Expiration date</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Atom.TextInputSimple
                    // value={`${cardDetails.expiryMonth} / ${cardDetails.expiryYear}`}
                    value={date}
                    textFieldStyle={{ height: 48, width: 150 }}
                    onChangeText={(value) => {
                      value?.length > 6
                        ? null
                        : setDate(handleInputChange(value));
                      handleChange("date", handleInputChange(value));
                    }}
                    placeholder={"MM/YY"}
                    placeholderTextColor={"lightgray"}
                  />

                  {/* <View style={{ left: 10 }}>
                    <Atom.TextInputSimple
                      value={cardDetails.expiryYear}
                      textFieldStyle={{ height: 48, width: 70 }}
                      onChangeText={(value) =>
                        handleChange("expiryYear", value)
                      }
                    />
                  </View> */}
                </View>
                {error?.date ? (
                  <Text style={styles?.inputErrorText}>{error?.date}</Text>
                ) : null}
              </View>
              <View>
                <Text style={styles.headings}>CVV</Text>
                <Atom.TextInputSimple
                  secureTextEntry={true}
                  hideEye={true}
                  keyboardType="numbers-and-punctuation"
                  textFieldStyle={{ height: 48, width: 156 }}
                  value={cardDetails.cvv}
                  onChangeText={(value) => {
                    setCvv(value), handleChange("cvv", value);
                    setError({ ...error, cvv: "" });
                  }}
                  placeholder={"123"}
                  placeholderTextColor={"lightgray"}
                />
                {error?.cvv ? (
                  <Text style={styles?.inputErrorText}>{error?.cvv}</Text>
                ) : null}
              </View>
            </View>
            {!fromOnboarding && (
              <Atom.CheckBox
                label={"Set as default payment method"}
                checkValue={cardDetails.default}
                onPress={() =>
                  setCardDetails({
                    ...cardDetails,
                    default: !cardDetails.default,
                  })
                }
                labelStyle={styles.checkBoxStyle}
              />
            )}
            <Text style={styles.headingAddress}>Billing Address</Text>
            <Text style={styles.headings}>Address</Text>
            <Atom.TextInputSimple
              textFieldStyle={styles.textField}
              value={cardDetails.adress}
              onChangeText={(value) => handleChange("adress", value)}
            />
            <Text style={styles.headings}>City</Text>
            <Atom.TextInputSimple
              textFieldStyle={styles.textField}
              value={cardDetails.city}
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
                  value={cardDetails.state}
                  onChangeText={(value) => handleChange("state", value)}
                />
              </View>
              <View>
                <Text style={styles.headings}>Zip code</Text>
                <Atom.TextInputSimple
                  keyboardType={"numeric"}
                  textFieldStyle={{ height: 48, width: 156 }}
                  value={cardDetails.zipCode}
                  onChangeText={(value) => handleChange("zipCode", value)}
                />
              </View>
            </View>
            {fromOnboarding && (
              <Text
                onPress={() => {
                  navigation.navigate("Done");
                }}
                style={{
                  alignSelf: "center",
                  color: color._primary_orange,
                  marginHorizontal: 5,
                }}
              >
                SKIP
              </Text>
            )}
            {fromOnboarding ? (
              <Atom.Button
                onPress={() => {
                  navigation.navigate("Done");
                }}
                title={"NEXT"}
              />
            ) : (
              <Atom.Button
                onPress={() => {
                  // InteractionManager.runAfterInteractions(() => {
                  handlePayment();
                  // setLoader(true);
                }}
                title={"SAVE"}
              />
            )}
            {/* fromOnboarding */}
            <Text style={styles.lastHeading}>
              <Icon name="shield-checkmark" size={15} color={"#726A6A"} />{" "}
              Information is sent over a secure connection
            </Text>
          </ScrollView>
        )}
      </View>
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
  CardfavouriteListRequest: (data) => dispatch(CardfavouriteListRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
