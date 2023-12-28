import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView
} from "react-native";
// import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import styles from "./PurchasedActivityStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";

import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome5";
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import QRCode from "react-native-qrcode-svg";
import * as PopUp from "../../../Components/models";
import { API_URL } from "../../../Constants/Config";
import axiosClient from "../../../Utils/ApiClient";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { InteractionManager } from "react-native";
import { showAlertError, showAlertSuccess } from "../../../Common/Functions/CommonFunctions";
import { REQUIRED_ERROR_MESSAGE } from "../../../Constants/ErrorMessages";
import { ReviewAllRequest, ReviewremoveFavouriteRequest, ReviewremoveGuestFavouriteRequest } from "../../../modules/userReview/actions";
import * as Atoms from "../../../Components/atoms";
import base from "../../../Constants/CommonStyle";
import * as Model from "../../../Components/models";
import * as Atom from "../../../Components/atoms";
import LocationIcon from "react-native-vector-icons/Entypo";





const PurchasedActivity = (props) => {
  // console.log(props.route.params)

  // const [item, setResults] = useState(data[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused()
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const role = props.state.roleReducer.role.id
  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
  const [purchase, setPurchase] = useState()
  const [loader, setLoader] = useState(true)
  const [reserveData, setReserveData] = useState()
  const dispatch = useDispatch()
  const [ratingVal, setRatingVal] = useState(0)
  const [showModal, setShowModal] = useState(false);
  const [modalVisibleAvailablity, setModalVisibleAvailablity] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);

  // const [cardDetails, setCardDetails] = useState({
  //   adress: "",
  //   city: "",
  //   state: "",
  //   ZipCode: "",
  //   Dietary: ""
  // });

  // const handleChange = (name, value) => {
  //   setCardDetails({ ...cardDetails, [name]: value });
  // };




  // const [purchase, setActiveItem] = useState({})
  const [review, setReview] = useState({
    title: "",
    summary: '',
    rating: ratingVal,
    img: null,
    adress: "",
    city: "",
    state: "",
    ZipCode: "",
    Dietary: ""
  });
  const [state, setState] = useState({
    setDefault: false,
  });
  const handleState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleChange = (name, value) => {
    setReview({ ...review, [name]: value });
  };

  const handleResponse = () => {
    try {
      // console.log('hii')
      // Create a card token using react-native-stripe-sdk
      const token = userToken ? userToken :
        Usertoken
      const data = {
        userId: loginData._id ? loginData._id :
          signupSucessData?.UserData?._id,
        serviceId: reserveData[0].providerId,
        title: review.title,
        rating: ratingVal,
        summary: review.summary,
        file: review.img
      }
      // if (!data.default) delete data.default
      // setLoader(false);
      const callback = (res) => {
        // navigation.goBack()
        // let arr = [res.data, ...listData]
        // arr.push(res.data)
        console.log(res, 'res.data')
        // setListData(arr)
        setShowModal(false)
        // setLoader(false)
      }
      dispatch(ReviewAllRequest({ data, callback, token, endpoint: API_URL.addReview, }))
      // setReview({
      //   name: "",
      //   cardNumber: '',
      //   expiryMonth: '',
      //   expiryYear: '',
      //   cvv: '',
      // })
    } catch (error) {
      // setLoader(false);
      // console.log("ERRROORrr", error)
      // Handle any errors that occurred during the payment process
      Alert.alert(error.Error);
    }
  };

  const onPlaceOrder = () => {
    setModalVisibleAvailablity("true")
    handleResponse()
  };

  const handlePurchase = async () => {
    try {
      let query = `?bookedItemId=${props.route.params.bId}`
      const res = await axiosClient.get(API_URL.purchasedActivity + query, {
        headers: {
          Authorization: userToken ? userToken :
            Usertoken
        }
      })
      // console.log(res.data.cartItem._id, userToken)
      if (res.data.status)
        setReserveData(res.data.cartItem)
    } catch (error) {
      // console.log("ERR", error)
    }
  }

  const handleRequestReservation = async () => {
    try {
      const token = userToken ? userToken :
        Usertoken

      const res = await axiosClient.post(API_URL.requestForReservation, {
        date: selectedDate,
        bookingId: reserveData[0]?.bookingId,
        time: selectedTime?.title,
        token
      })
      // console.log(token)
      // console.log(res.data)
      if (res.data.status)
        setModalVisible(!modalVisible);
      showAlertSuccess(res.data.message)

    } catch (error) {
      console.log(error)
      // showAlertError(error)
    }

  }

  const onDeelte = async (param) => {
    // console.log('hi')
    const res = await axiosClient
      .post(param.endpoint, param.data, {
        headers:
        {
          'Authorization': param?.token,
        }
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        // console.log('onMerchantDetailsRequest SAGA ERROR ===>', error);
        return;
      });
    if (res) {
      // console.log(res.data, '....');
      if (res?.data?.status) {
        // await dispatch(setLoader(false));
        // await dispatch(merchantDetailsSuccess(res?.data?.data));
        let arr = [...reserveData]
        arr = arr.filter(item => item.bookingId !== param.data.bookingId)
        setReserveData(arr)
        setModalVisible(!modalVisible);
        showAlertSuccess('Reservation Cancelled')
        navigation.goBack()

        // console.log(res.data, ' message from saga remove Favourite merchant');
      } else {
        //  dispatch(setLoader(false));
        // showAlertError(res.data.message)
        // console.log(res.data.message);
      }
    } else {
      // await dispatch(setLoader(false));
      // showAlert(res.data.message)
      // console.log(REQUIRED_ERROR_MESSAGE);
    }
  }

  const handleDelete = (id) => {
    // console.log(purchase[0].bookingId, "IIDDDDd");
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    const token = userToken ? userToken :
      Usertoken
    let param = {
      endpoint: API_URL.cancelReservation,
      data: {
        bookingId: reserveData[0].bookingId,
      },
      token
    }

    let bookingId = {
      bookingId: reserveData[0].bookingId
    }
    role == 2 ?
      onDeelte(param)
      :
      props.ReviewremoveGuestFavouriteRequest(bookingId)

    setTimeout(() => {
      handlePurchase()
    }, 250)
  };



  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      handlePurchase()
    })
    let timeout = setTimeout(() => {
      setLoader(false)
    }, 3000)
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isFocused])


  const onPress = (page, prop) => {
    navigation.navigate(page, prop);
  };

  const centerImage = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
      >
        {/* <Image
          style={{ height: 39, width: 53, resizeMode: "contain" }}
          source={require("../../../assets/images/orange_hearts.png")}
        /> */}
      </TouchableOpacity>
    );
  };
  const rightImage = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}

      >
        <Image
          style={{ height: 16, width: 16, tintColor: color._black }}
          source={require("../../../assets/images/Share.png")}
        />
      </TouchableOpacity>
    );
  };
  const onPressModal = () => {
    // console.log("first");
  };

  const showData = ({ item }) => {
    // console.log(item.bookingId)
    return (
      <>
        <Image
          source={{ uri: `http://54.92.82.16:3001/data/${item?.providerImage}` }}
          style={{
            height: 196,
            width: "100%",
            borderRadius: 8,
            marginBottom: 19,
          }}
        />
        <View style={{ marginHorizontal: 20, marginBottom: 27 }}>

          <Text style={styles.boldName}>{item.providerName}</Text>
          <Text style={styles.orangeTitle}>{item.serviceName}</Text>

          <TouchableOpacity
            activeOpacity={0.9}

            style={styles.item} onPress={() => {
              setShowModal(!showModal)
              // navigation.navigate("WriteReview")
            }} >
            <Text style={styles.title}>Write a Review</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}

            style={styles.item}
            onPress={() => setModalVisible(true)}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={"calendar-alt"}
                size={15}
                color={color._border_orange}
              />
              <Text style={[styles.title, { left: 20 }]}>
                {selectedDate ? selectedDate : "Availability"} {selectedTime ? selectedTime.title : ""}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.item}
            onPress={() => onPress("Receipt", { bookingI: item.bookingId })}
          >
            <Text style={styles.title}>Receipt</Text>
          </TouchableOpacity>

          <Text style={styles.boldText}>Preparation</Text>
          <Text style={[styles.lightText, { color: 'black' }]}>
            Insert infomation for the customer to prepare for your services.{" "}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}

            style={styles.item}
            onPress={() => navigation.navigate("CustomerSupport")}
          >
            <Text style={styles.title}>Customer Support</Text>
          </TouchableOpacity>

          <Text style={styles.boldText}>Reedem</Text>
          <Text style={styles.orangeRegular}>
            Present your QR code upon arrival
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "400", color: color._black, textAlign: 'center' }}>
              456789
            </Text>
            {/* <QRCode value="456789"  linearGradient /> */}
          </View>

        </View>
        <Text style={[styles.boldText, { marginHorizontal: 20 }]}>Location</Text>
        <View style={{ flexDirection: "row", alignItems: 'center', marginHorizontal: 15 }}>
          <LocationIcon
            name="location-pin"
            size={18}
            color={color._primary_orange}
          // style={{backgroundColor:'red'}}
          />
          <Text style={styles.textLoc}>Desired Activity Location</Text>
        </View>
        <View style={{ flex: 1, marginTop: 10, marginHorizontal: 20 }}>
          <Text style={styles.headings2}>
            Address
          </Text>
          <Atom.TextInputSimple
            textFieldStyle={styles.textField}
            value={review.adress}
            name={'adress'}
            onChangeText={(value) => handleChange('adress', value)}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.headings2}>city</Text>
                <Atom.TextInputSimple
                  value={review.city}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 156 }}
                  onChangeText={(value) => handleChange('city', value)}
                />
              </View>
              <View style={{ flex: 0.2 }}>
                <Text style={styles.headings2}>state</Text>
                <Atom.TextInputSimple
                  value={review.state}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 70 }}
                  onChangeText={(value) => handleChange('state', value)}

                />
              </View>
              <View style={{ flex: 0.35 }}>
                <Text style={styles.headings2}>Zip Code</Text>
                <Atom.TextInputSimple
                  keyboardType={"numeric"}
                  textFieldStyle={styles.textField}
                  // textFieldStyle={{ height: 48, width: 70 }}
                  value={review.ZipCode}
                  onChangeText={(value) => handleChange('Zip Code', value)}
                />
                {/* {errors.cvv ? <Text>{errors.cvv}</Text> : null} */}
              </View>
            </View>
            <Text style={[styles.headings2, { fontSize: 18, marginVertical: 10 }]}>
              Notes
            </Text>
            <Text style={styles.headings2}>
              Dietary Restrictions
            </Text>
            <Atom.TextInputSimple
              textFieldStyle={styles.textField}
              value={review.Dietary}
              name={'Dietary'}
              onChangeText={(value) => handleChange('Dietary', value)}
            />
          </View>
          <TouchableOpacity style={{justifyContent:'center', alignItems:'center',}}
          onPress={()=>{
            setUpdateModal(true)
          }}
          >
            <Text style={{color:"#5F9EA0"}} >Update Activity Details</Text>
          </TouchableOpacity>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.boldText}>Fine Print</Text >
            <Text style={styles.lastText}>
              Merchant is solely responsible to purchasers for the care and
              quality of the advertised goods and services.
            </Text>
          </View>
        </View>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: item.locationCordinates.coordinates[1],
              longitude: item.locationCordinates.coordinates[0],
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              // coordinate={{ latitude: 31.4684649, longitude: 76.2708152 }}
              coordinate={{
                latitude: item.locationCordinates.coordinates[1],
                longitude: item.locationCordinates.coordinates[0],
              }}>
              <View style={{
                justifyContent: 'center', alignItems: 'center'
              }} >
                <Image resizeMode='contain' style={{ height: 65, width: 35, tintColor: color._primary_orange, resizeMode: 'contain' }}
                  source={(require('../../../assets/images/Location.png'))} />
              </View>
            </Marker>

            {/* /> */}
        {/* </MapView> */}
        {/* </View >  */}
        {/* <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.boldText}>Fine Print</Text >
          <Text style={styles.lastText}>
            Merchant is solely responsible to purchasers for the care and
            quality of the advertised goods and services.
          </Text>
        </View> */}

      </>
    );
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={{ marginHorizontal: 10 }}>
        <BackHeader
          title={centerImage()}
          titleTxt={{ height: 45, width: 54 }}
          isRight
          rightContent={rightImage()}
          rightStyl={{ height: 16, width: 16 }}
        />
      </View>
      <View style={[styles.mainView, loader && {
        justifyContent: "center"
      }]}>
        {loader ? <ActivityIndicator color={color._primary_orange} size={'large'} /> :
          (
            <FlatList
              data={reserveData}
              keyExtractor={(item) => item.id}
              renderItem={showData}
            />
          )}
      </View>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          // console.log('Modal has been closed.');
        }}>
        {/*All views of Modal*/}
        {/*Animation can be slide, slide, none*/}
        <View style={styles.safeView}>
          <View style={styles.mainView2}>

            <View style={[base.horizontal, styles.header, base.center]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  base.horizontal,
                  styles.header,
                  { position: 'absolute', left: 0 },
                ]}
                onPress={() => {
                  setShowModal(!showModal);
                }
                }>
                <Icon name={'angle-left'} size={24} color={color._black} />
                {/* <Icon name={'arrowleft'} size={24} color={color._black} /> */}
              </TouchableOpacity>
              <Text style={styles.title3}>{"Review"}</Text>
            </View>
            <ScrollView
              bounces={false}
              alwaysBounceVertical={false}
              overScrollMode="never"
              showsVerticalScrollIndicator={false} style={styles.scrollView2}>
              <Text style={styles.headings}>Rating</Text>
              {/* <Text> 4 </Text> */}
              <View style={{ flexDirection: "row" }}>
                <Atoms.Rating
                  currentRating={Math.round(ratingVal)}
                  titleStyle={{ paddingVertical: 8 }}
                  onChange={(e) => setRatingVal(e)}
                />
              </View>
              <Text style={styles.headings}>Title</Text>
              <TextInput
                style={styles.input}
                value={review && review?.title}
                onChangeText={(value) => handleChange('title', value)}
                placeholderTextColor={"#505050"}
                placeholder="Sed ut perspiciatis unde omnis iste natus"
              />
              <Text style={styles.headings}>Summary</Text>
              <TextInput
                style={styles.input}
                value={review && review?.summary}
                onChangeText={(value) => handleChange('summary', value)}
                placeholderTextColor={"#505050"}
                placeholder="The experience was amazing. My husband and I loved the outcome of the meal."
                multiline
              />
              <Text style={styles.headings}>Photos</Text>
              <View style={styles.uploadImage}>
                <Image
                  source={require("../../../assets/images/PhotosUpload.png")}
                  style={{ width: 37, height: 29 }}
                />
                <Text style={styles.uploadText}>Upload Image</Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.noteText, { marginBottom: 25 }]}>( Maximum of four images )</Text>
                {/* {selectedImages()} */}
                <Atoms.Button
                  title="SUBMIT REVIEW"
                  onPress={() => onPlaceOrder()}
                />
              </View>
            </ScrollView>
          </View>
        </View>

      </Modal>

      <Model.CommonPopUp
        isVisible={modalVisibleAvailablity}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Review Submitted!"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt={"BACK TO ACTIVITY"}
        onPress={() => { setModalVisibleAvailablity(false) }}
      />
      <Model.CommonPopUp
        isVisible={updateModal}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Activity Details Updated"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt={"BACK TO ACTIVITY"}
        onPress={() => { setUpdateModal(false) }}
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
        onPress={() => { handleRequestReservation() }}

        onPressCancel={() => {
          handleDelete()
          // setModalVisible(!modalVisible);
        }}

      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  ReviewremoveFavouriteRequest: (navigation) => dispatch(ReviewremoveFavouriteRequest(navigation)),
  ReviewremoveGuestFavouriteRequest: (data) => dispatch(ReviewremoveGuestFavouriteRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedActivity);
