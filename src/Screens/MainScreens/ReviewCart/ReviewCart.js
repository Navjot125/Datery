import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./ReviewCartStyles";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import Plus from "react-native-vector-icons/Entypo";
import Minus from "react-native-vector-icons/Entypo";
import AppleLogo from "react-native-vector-icons/AntDesign";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
import * as Model from "../../../Components/models";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import * as PopUp from "../../../Components/models";
import * as  Models from "../../../Components/models";
import { roleRequest } from "../../../modules/Role/actions";
import { API_URL } from "../../../Constants/Config";
import { CartListRequest, removeFromCartGuestRequest, removeItemFromCartRequest } from "../../../modules/Cart/actions";
import axiosClient from "../../../Utils/ApiClient";
import { showAlertError, showAlertSuccess } from "../../../Common/Functions/CommonFunctions";
import LocationIcon from "react-native-vector-icons/Entypo";



const dataArray = [
  {
    id: 1,
    title: " 3 Course Meal Cooked at your home by Chef Jon",
    time: "Sunday, November 21st @7:30 pm",
  },
  {
    id: 2,
    title: "4 Course Meal Cooked at your home by Chef Jon",
    time: "Sunday, November 25th @7:30 pm",
  },
];
const ReviewCart = (props) => {
  const isFocused = useIsFocused()
  const role = props.state.roleReducer.role.id
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState("first");
  const [cartList, setCartList] = React.useState(role == 1 ? props.state?.cartReducer?.cartList
    : role == 2 ? props.state?.cartReducer?.cartListUser : null);
  const [modalVisibleSuccess, setModalVisibleSuccess] = React.useState(false);
  const [modalVisibleFailed, setModalVisibleFailed] = React.useState(false);
  const [modalVisibleAvailablity, setModalVisibleAvailablity] =
    React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState("");

  const [modalVisible, setModalVisible] = React.useState(false);
  const [counter, setCounter] = React.useState(props.state.cartReducer.cartList);
  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
  const [selectedTime, setSelectedTime] = React.useState("");

  const [cardDetails, setCardDetails] = useState({
    adress: "",
    city: "",
    state: "",
    ZipCode: "",
    Dietary: ""
  });

  const handleChange = (name, value) => {
    setCardDetails({ ...cardDetails, [name]: value });
  };



  useEffect(() => {
    console.log('CART+++++', cartList)
    // console.log(props.state?.cartReducer?.cartListUser, '------------');

    setCartList(role == 1 ? props.state?.cartReducer?.cartList
      : role == 2 ? props.state?.cartReducer?.cartListUser : null)
  }, [role == 1 ? props?.state?.cartReducer?.cartList : props?.state?.cartReducer?.cartListUser])

  const incrementCounter = (item) => {
    let arr = [...cartList.cartItem.documents]
    let cartTotal = cartList.cartItem.totalPrice
    arr.map((dataItem, idx) => {
      // console.log(dataItem.itemId === item.itemId)
      if (dataItem.itemId === item.itemId) {
        arr[idx] = {
          ...dataItem,
          quantity: dataItem.quantity + 1
        };
        cartTotal += dataItem.itemPrice
      }
      // arr[idx] = dataItem;
    });
    let obj = {
      cardDetatil: cartList.cardDetatil,
      cartItem: {
        ...cartList.cartItem,
        documents: arr,
        totalPrice: cartTotal
      }
    }
    setCartList(obj);
  };

  const decrementCounter = (item) => {
    // const updatedData = cartList.map((dataItem) => {
    //   if (dataItem.itemId === item.itemId) {
    //     if (dataItem.quantity == 1) {
    //       let param = {
    //         _id: {
    //           cartId: item._id,
    //           userId: props.state?.loginReducer?.loginData?._id ? props.state?.loginReducer?.loginData?._id :
    //             props.state?.signupReducer?.signupSucessData?.UserData?._id,
    //         },
    //         endpoint: API_URL.deleteItem,
    //         itemId: { itemId: item.itemId }
    //       }
    //       role == 1 ? props.removeFromCartGuestRequest(param) :
    //         props.removeItemFromCartRequest(param) 
    //     }
    //     else {
    //       return {
    //         ...dataItem,
    //         quantity: dataItem.quantity - 1
    //         // dataItem.quantity == 1 ? dataItem.quantity : dataItem.quantity - 1
    //       };
    //     }
    //   }
    //   return dataItem;
    // });
    // setCartList(updatedData);
    let arr = [...cartList.cartItem.documents]
    let cartTotal = cartList.cartItem.totalPrice
    arr.map((dataItem, idx) => {
      // console.log(dataItem.itemId === item.itemId)
      if (dataItem.itemId === item.itemId) {
        if (dataItem.quantity > 1) {
          arr[idx] = {
            ...dataItem,
            quantity: dataItem.quantity - 1
          };
        }
        else {
          arr.splice(idx, 1)
        }
        cartTotal -= dataItem.itemPrice
      }
      // arr[idx] = dataItem;
    });
    let obj = {
      cardDetatil: cartList.cardDetatil,
      cartItem: {
        ...cartList.cartItem,
        documents: arr,
        totalPrice: cartTotal
      }
    }
    setCartList(obj);
  };

  const handleRequestReservation = async () => {
    try {
      const token = userToken ? userToken :
        Usertoken
      const res = await axiosClient.post(API_URL.requestForReservation, {
        date: selectedDate,
        bookingId: purchase[0].bookingId,
        time: selectedTime.title,
        token
      })
      // console.log(token)
      // console.log(res.data)
      if (res.data.status)
        setModalVisible(!modalVisible);
      showAlertSuccess(res.data.message)

    } catch (error) {
      // console.log(error)
      showAlertError(error)
    }

  }


  const ShowTextInput = (props) => {
    return (
      <View style={styles.summaryView}>
        <DropShadow >
          <View style={[styles.card]}>
            <Text style={styles.leftTitle}>{props.leftTitle}</Text>
            <Text style={styles.leftTitle}>{props.dollar}{props.rightTitle}</Text>
          </View>
        </DropShadow>
      </View>
    );
  };

  const handlePay = async () => {

    // const backendDateString = cartList.cartItem.documents[0].date;

    // // Create a Date object from the backend date string
    // const backendDate = new Date(backendDateString);

    // // Format the date as "YYYY-MM-DD"
    // const formattedDate = backendDate.toLocaleDateString("en-US", {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    // });

    // console.log(formattedDate, "FFFFF");
    try {
      const res = await axiosClient.post(API_URL.pay, {
        cardId: cartList?.cardDetatil?._id,
        amount: cartList?.cartItem?.totalPrice,
        serviceId: cartList?.cartItem?.documents[0]?.serviceId,
        menu: JSON.stringify([
          {
            "serviceId": cartList?.cartItem?.documents[0]?.serviceId,
            "itemId": cartList?.cartItem?.documents[0]?.itemId,
            "quantity": cartList?.cartItem?.documents[0]?.quantity,
            "date": cartList?.cartItem?.documents[0]?.date,
            "time": cartList?.cartItem?.documents[0]?.time
            // "date": "2023-08-21T08:52:13.483+00:00"
          }
        ]),
        customer: cartList?.cardDetatil?.customerId
      }, {
        headers: {
          Authorization: userToken ? userToken :
            Usertoken
        }
      })
      // console.log(res.data)
      if (res.data.status) {
        setModalVisibleSuccess(false)
        navigation.navigate("HomeTab", { screen: "Home" })
        showAlertSuccess('Paid successfully')
      }
      // setUserReview(res.data.data)
    } catch (error) {
      setModalVisibleFailed(true)
      showAlertError(error)
      // console.log("ERR", error)
    }
  }


  const onPlaceOrder = () => {
    //Modal for successful purchase
    setModalVisibleSuccess("true");

    //Modal for card declined failure
    // setModalVisibleFailed("true");

    //Modal for unavailability
    // setModalVisibleAvailablity("true");
  };

  const showData = ({ item }) => {
    // console.log('IIII_____', item)
    return (
      <View style={styles.cardView}>
        <View style={[styles.card]}>
          <Image
            source={{ uri: `http://54.92.82.16:3001/data/${item?.providerimages}` }}
            style={{ height: 95, width: 110, borderRadius: 6, resizeMode: 'cover' }}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 5
              // padding: 15,
              // width: "80%",
            }}
          >
            <Text style={styles.textTitle}>{item.serviceName}</Text>
            <Text style={styles.textBetween}> {item.providerName}</Text>
            <Text style={styles.orangeText}>${role == 1 ? item?.servicePrice : item?.itemPrice}</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setModalVisible(true)} style={styles.mediaType}>
              <Text style={styles.mediaType2}>{"  "}
                <Icon name={"calendar-alt"} size={11} color={color._primary_orange} />{"  "}
                {/* {item.schedule} */}
                {selectedDate ? selectedDate : "Buy Now, Book Later"} {selectedTime ? selectedTime.title : ""}
              </Text>
            </TouchableOpacity>
            {/* <View style={{ flexDirection: "row", }}>
              <TouchableOpacity
                activeOpacity={0.9}

                onPress={() => decrementCounter(item)}>
                <View style={styles.buttons}>
                  <Minus name="minus" size={14} color={color._white} />
                </View>
              </TouchableOpacity>
              <Text style={styles.counterText}>{item.quantity}</Text>
              <TouchableOpacity
                activeOpacity={0.9}

                style={styles.buttons}
                onPress={() => (incrementCounter(item))}
              >
                <Plus name="plus" size={14} color={color._white} />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          <LocationIcon
            name="location-pin"
            size={18}
            color={color._primary_orange}
          // style={{backgroundColor:'red'}}
          />
          <Text style={styles.textLoc}>Desired Activity Location</Text>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={styles.headings}>
            Address
          </Text>
          <Atom.TextInputSimple
            textFieldStyle={styles.textField}
            value={cardDetails.adress}
            name={'adress'}
            onChangeText={(value) => handleChange('adress', value)}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.headings}>city</Text>
                <Atom.TextInputSimple
                  value={cardDetails.city}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 156 }}
                  onChangeText={(value) => handleChange('city', value)}
                />
              </View>
              <View style={{ flex: 0.2 }}>
                <Text style={styles.headings}>state</Text>
                <Atom.TextInputSimple
                  value={cardDetails.state}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 70 }}
                  onChangeText={(value) => handleChange('state', value)}

                />
              </View>
              <View style={{ flex: 0.35 }}>
                <Text style={styles.headings}>Zip Code</Text>
                <Atom.TextInputSimple
                  keyboardType={"numeric"}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 70 }}
                  value={cardDetails.ZipCode}
                  onChangeText={(value) => handleChange('Zip Code', value)}
                />
                {/* {errors.cvv ? <Text>{errors.cvv}</Text> : null} */}
              </View>
            </View>
            <Text style={[styles.headings, { fontSize: 14, marginVertical: 10 }]}>
              Notes
            </Text>
            <Text style={styles.headings}>
              Dietary Restrictions
            </Text>
            <Atom.TextInputSimple
              textFieldStyle={styles.textField}
              value={cardDetails.Dietary}
              name={'Dietary'}
              onChangeText={(value) => handleChange('Dietary', value)}
            />

          </View>



        </View>

        {/* </DropShadow> */}
      </View>
    );
  };

  const middleContentCardDecline = () => {
    return (
      <Text style={styles.cardError}>Error message for card declined</Text>
    );
  };

  const show = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.textModal}>{item.title}</Text>
        <Text style={styles.textModal}>{item.time}</Text>
      </View>
    );
  };
  const seperator = () => {
    return <View style={styles.seperator}></View>;
  };
  const availability = () => {
    return (
      <FlatList
        data={dataArray}
        keyExtractor={(item) => item.id}
        renderItem={show}
        ItemSeparatorComponent={seperator}
      />
    );
  };



  return (
    // console.log(cartList, "CCCC"),
    < SafeAreaView style={styles.scrollView} >
      <View style={{ marginVertical: 15, marginHorizontal: 5 }}>
        <BackHeader title={"Review Your Order"} />
      </View>
      {
        props.state.loaderReducer?.loader &&
        <View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
        }}>
          <ActivityIndicator
            size="large" color={color._primary_orange} />
        </View>
      }
      {
        cartList?.cartItem && cartList?.cartItem?.documents?.length !== 0 ?
          <View style={styles.mainView}>
            <ScrollView
              bounces={false}
              alwaysBounceVertical={false}
              overScrollMode="never"
              style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <FlatList
                data={cartList.cartItem.documents}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={showData}
              />
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <View style={{ backgroundColor: color._white, elevation: 2, borderRadius: 10, marginHorizontal: 2, marginVertical: 10 }}>
                <ShowTextInput leftTitle={"Total Price"} dollar={"$"} rightTitle={cartList.cartItem.totalPrice} />
              </View>
              <Text style={styles.summaryTitle}>Payment Method</Text>
              <View style={{ marginTop: 5 }}>
                {
                  <DropShadow style={styles.shadowProp}>
                    <View style={role == 1 ? [styles.cards, { backgroundColor: color._lightGray }] : styles.cards}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: 'space-between',
                          // paddingHorizontal: 10
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <RadioButton
                            disabled={role == 1 ? true : false}
                            value="first"
                            uncheckedColor="#CFCFCF"
                            color={checked === "first" ? color._primary_orange : color._grey_1}
                            status={checked === "first" ? "checked" : "checked"}
                            onPress={() => setChecked("first")}
                          />
                          <Image
                            source={require("../../../assets/images/Card.png")}
                            style={{ height: 32, width: 32 }}
                          />
                          <Text style={styles.cardText}>
                            Debit Card / Credit Card
                          </Text>
                        </View>
                        <Text
                          style={{
                            color: color._border_orange,
                            fontFamily: fonts.REGULAR,
                            fontSize: 11,
                            right: 10
                          }}
                          onPress={() => navigation.navigate("SelectCards")}
                        >
                          Change
                        </Text>
                      </View>
                      {
                        role == 1 ?
                          <Atom.Button
                            title={"Sign in to complete purchase"}
                            onPress={() => { navigation.navigate('Login') }}
                          /> : null
                      }
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RadioButton
                          disabled={role == 1 ? true : false}
                          value="second"
                          status={checked === "second" ? "checked" : "checked"}
                          uncheckedColor="#CFCFCF"
                          color={checked === "second" ? color._primary_orange : color._grey_1}
                          onPress={() => setChecked("second")}
                        />
                        <AppleLogo name={"apple1"} size={20} color={color._black} />
                        <Text style={styles.cardText}>Apple Pay</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <RadioButton
                          disabled={role == 1 ? true : false}
                          value="third"
                          uncheckedColor="#CFCFCF"
                          color={checked === "third" ? color._primary_orange : color._grey_1}
                          status={checked === "third" ? "checked" : "checked"}
                          onPress={() => setChecked("third")}
                        />
                        <Image
                          source={require("../../../assets/images/paypal.png")}
                          style={{ height: 20, width: 20 }}
                        />
                        <Text style={styles.cardText}>PayPal</Text>
                      </View>
                    </View>
                  </DropShadow>}
                <Text style={styles.terms}>
                  By continuing, you agree to Comfilitiy’s
                  <Text style={{ color: color._font_orange }}> Terms of Service </Text>
                  and acknowledge Comfility’s
                  <Text onPress={() => { }} style={{ color: color._font_orange }}>
                    {" "}
                    Privacy Policy{" "}
                  </Text>
                </Text>
              </View>
            </ScrollView>
            {/* <Text style={styles.terms}>
              By continuing, you agree to Comfilitiy’s
              <Text style={{ color: color._font_orange }}> Terms of Service </Text>
              and acknowledge Comfility’s
              <Text onPress={() => { }} style={{ color: color._font_orange }}>
                {" "}
                Privacy Policy{" "}
              </Text>
            </Text> */}
            <Atom.Button
              title={"PLACE YOUR ORDER"}
              onPress={() => onPlaceOrder()}
              containerStyle={role == 1 ? {
                marginVertical: 10, backgroundColor: color._lightGray,
                borderRadius: 100,
              }
                : { marginBottom: 20 }}
            />
          </View>
          : null
      }
      <Model.CommonPopUp
        isVisible={modalVisibleSuccess}
        title="Purchase Complete"
        titleTxt={{ fontSize: 24, color: color._black }}
        discription="Thank you for shopping with us!"
        descriptionTxt={styles.description}
        btnTxt="Review Activity"
        secondBtnTxt="Continue Shopping"
        // onPress={() => { setModalVisible(true) }}
        onPress={() => { 
          // navigation.navigate('PurchasedActivity'),
           setModalVisibleSuccess(false)}}
        onSecondPress={() => {
          handlePay()
        }}
        onRequestClose={() => {
          setModalVisibleSuccess(false)
        }}
      />
      <Model.CommonPopUp
        isVisible={modalVisibleAvailablity}
        title="We're Sorry..."
        titleTxt={{ fontSize: 24, color: color._black }}
        discription="The following reservation time is unavailable:"
        descriptionTxt={styles.description}
        middleContent={availability()}
        middleContentStyle={{ paddingVertical: 33 }}
        btnTxt="Back to Cart"
        onPress={() => setModalVisibleAvailablity(false)}
      />
      <Model.CommonPopUp
        isVisible={modalVisibleFailed}
        title="Oops..."
        titleTxt={{ fontSize: 24, color: color._black }}
        discription="Something went wrong during your purchase"
        descriptionTxt={styles.description}
        middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt="Back to Cart"
        onPress={() => setModalVisibleFailed(false)}
      />
      <PopUp.SlideUpPopUp
        isVisible={modalVisible}
        setSelected={setSelectedDate}
        selected={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        cancelTitle={"Cancel this reservation"}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        onPressCancel={() => {
          setModalVisible(!modalVisible);

          // handleDelete()
          // setModalVisible(!modalVisible);
        }}
      />
    </SafeAreaView >
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  removeItemFromCartRequest: (data) => dispatch(removeItemFromCartRequest(data)),
  removeFromCartGuestRequest: (data) => dispatch(removeFromCartGuestRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCart);
