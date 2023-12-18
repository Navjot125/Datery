import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  Alert,
  InteractionManager,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./PlanReadyReservationStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import Calendar from "react-native-vector-icons/MaterialCommunityIcons";
import Search from "react-native-vector-icons/FontAwesome";
import CalendarDark from "react-native-vector-icons/FontAwesome5";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import Unplaned from "./Unplaned";
import Planed from "./Planed";
import * as PopUp from "../../../Components/models";
import axiosClient from "../../../Utils/ApiClient";
import { API_URL } from "../../../Constants/Config";
import { ReviewremoveFavouriteFail, ReviewremoveFavouriteRequest, ReviewremoveFavouriteSuccess, ReviewremoveGuestFavouriteRequest } from "../../../modules/userReview/actions";
import { showAlertSuccess } from "../../../Common/Functions/CommonFunctions";
import LocationIcon from "react-native-vector-icons/Entypo";

const PlanReadyReservation = (props) => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
  const [activeItem, setActiveItem] = useState({})
  const [reserveData, setReserveData] = useState()
  const dispatch = useDispatch()
  const role = props.state.roleReducer.role.id
  const isFocused = useIsFocused()
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const [loader, setLoader] = useState(true)



  const handleReadyReservation = async () => {
    try {
      const res = await axiosClient.get(API_URL.readyForReservation, {
        headers: {
          Authorization: userToken ? userToken :
            Usertoken
        }
      })
      // console.log(res.data)
      if (res.data.status)
        setReserveData(res.data.cartItem)
    } catch (error) {
      // console.log("ERR", error)
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
    // console.log(activeItem.bookingId, "IIDDDDd");
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    const token = userToken ? userToken :
      Usertoken
    let param = {
      endpoint: API_URL.cancelReservation,
      data: {
        bookingId: activeItem.bookingId,
      },
      token
    }

    let bookingId = {
      bookingId: activeItem.bookingId
    }
    role == 2 ?
      onDeelte(param)
      :
      props.ReviewremoveGuestFavouriteRequest(bookingId)

    // setTimeout(() => {
    //   handleReadyReservation()
    // }, 250)
    // console.log('sfsf',id);
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      // handlePurchase()
      handleReadyReservation()
    })
    let timeout = setTimeout(() => {
      setLoader(false)
    }, 3000)
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [isFocused])


  const showData = ({ item }) => {
    // console.log(item)
    return (
      <View style={{ marginHorizontal: 15 }}>
        <TouchableOpacity
          style={[styles.card]}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("PurchasedActivity", { bId: item._id });
          }}>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Image
              source={{ uri: `http://54.92.82.16:3001/data/${item?.providerImage}` }}
              style={{ height: 95, width: 110, borderRadius: 6, resizeMode: 'cover' }}
            />
            <View style={{ marginHorizontal: 5 }}>
              <Text style={styles.textTitle}>{item.providerName}</Text>
              {/* <View style={[styles.lastText]}> */}
              <Text style={styles.textBetween}>{item.serviceName}</Text>
              <Text style={styles.textLoc}>
                {"$160"}</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setActiveItem(item)
                  setModalVisible(true)
                }}
                style={styles.mediaType}>
                <Icon name={"calendar-alt"} size={11} color={color._primary_orange} />
                <Text style={styles.mediaType2}>
                  {"    "}
                  {/* {"Availability"} */}
                  {selectedDate ? selectedDate : "Buy Now, Book Later"} {selectedTime ? selectedTime.title : ""}

                </Text>
              </TouchableOpacity>
              {/* </View> */}
            </View>
            {/* <View
            style={{
              padding: 15,
              width: "80%",
            }}
          >
            <Text style={styles.textTitle}>{item.serviceName}</Text>
            <View style={styles.lastText}>
              <View style={{ flex: 1 }} >
                <Text style={styles.textBetween}> {item.providerName}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setActiveItem(item)
                  setModalVisible(true)
                }} style={styles.mediaType}>
                <Text style={styles.mediaType2}>
                  <Icon name={"calendar-alt"} size={11} color={color._white} />{" "}
                  {selectedDate ? selectedDate : "Availability"} {selectedTime ? selectedTime.title : ""}

                </Text>
              </TouchableOpacity>

            </View>
            {/* <Text style={styles.orangeText}>{item.review}</Text> */}
            {/* </View> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const emptyData = () => {
    // Alert.alert('')
    return (
      < View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
        <Text style={{ fontSize: 18, color: color._black, fontFamily: fonts.MEDIUM }}>{"No Upcoming Reservations"}</Text>
      </View >
    );
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // marginTop: wp(4.25),
          marginHorizontal: 10
        }}
      >
        <View
        >
          <BackHeader
            isRight
          />
        </View>

        {/* <Image
          style={{ height: 38, width: 49 }}
          source={require("../../../assets/images/orange_hearts.png")}
        /> */}
        <View style={{}}>
          {/* <TouchableOpacity
            activeOpacity={0.9}

          >
            {/* <CalendarDark
              name="calendar-day"
              size={22}
              color={color._border_orange}
            /> */}
          {/* </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.9}

          >
            <Search
              name="search"
              size={22}
              color={color._border_orange}
              style={{ right: 10, top: 2 }}
            />
          </TouchableOpacity>
        </View>

      </View>
      <Text
        style={{
          fontFamily: fonts.SEMI_BOLD,
          color: "#2F2729",
          fontSize: 16,
          marginTop: 22,
          marginHorizontal: 20
        }}
      >
        Ready for Reservations
      </Text>
      <View style={[styles.mainView, loader && {
        justifyContent: "center"
      }]}>

        {loader ? <ActivityIndicator color={color._primary_orange} size={'large'} /> :
          (
            <FlatList
              data={reserveData}
              ListEmptyComponent={emptyData}
              keyExtractor={(item) => item.id}
              renderItem={showData}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        {/* </ScrollView> */}
      </View>
      <PopUp.SlideUpPopUp
        isVisible={modalVisible}
        setSelected={setSelectedDate}
        selected={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        cancelTitle={"Cancel this reservation"}
        // isVisible={modalVisible}
        onPress={() => {
          // navigation.navigate("PurchasedActivity"), 
          setModalVisible(!modalVisible)
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanReadyReservation);
