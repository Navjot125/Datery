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
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./PlanReservedStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from 'react-native-vector-icons/AntDesign';
import CalendarIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Search from "react-native-vector-icons/FontAwesome";
import CalendarDark from "react-native-vector-icons/FontAwesome5";
import DropShadow from "react-native-drop-shadow";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { BackHeader } from "../../../Components/molecules";
import * as PopUp from "../../../Components/models";
import * as Model from "../../../Components/models";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { roleRequest } from "../../../modules/Role/actions";
import { API_URL } from "../../../Constants/Config";
import PlanReservedGuest from "./PlanReservedGuest";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import { CartListRequest } from "../../../modules/Cart/actions";
import { PlanAllDetailsRequest, PlanAllRequest, PlanfavouriteListRequest } from "../../../modules/plan/actions";
import moment from "moment";
import axiosClient from "../../../Utils/ApiClient";
import LocationIcon from "react-native-vector-icons/Entypo";



const PlanReserved = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  // const [modalVisibleAvailablity, setModalVisibleAvailablity] = React.useState(role == 1 ? true : false);
  const [modalVisibleAvailablity, setModalVisibleAvailablity] = React.useState(props?.state?.roleReducer?.role?.id == 1 ? true : false);
  const navigation = useNavigation();
  currentMonth = getMonthName(currentMonth + 1)
  const [searchQuery, setSearchQuery] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [month, setMonths] = React.useState(currentMonth);
  const onChangeSearch = (query) => setSearchQuery(query);
  const [selectedItem, setSelectedItem] = useState({});
  const plan = useSelector(state => state.planReducer.Plan)
  const isFocused = useIsFocused()
  const [loader, setLoader] = useState(true)
  const d = new Date();
  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
  let currentMonth = d.getMonth();
  const [monthName, setMonthName] = React.useState(getMonthName(currentMonth + 1));
  const [monthName2, setMonthName2] = React.useState(getMonthName(currentMonth + 2));
  const [selected, setSelected] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");

  const select = (day) => {
    setSelected(day.dateString)
  }
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    const month = date.toLocaleString('en-US', {
      month: 'long',
    });
    return month
  }
  const role = props.state.roleReducer.role.id
  const dispatch = useDispatch()
  // props.roleRequest({ user: 'Guest', id: 1 })

  const search = () => {
    return (
      <View>
        <Searchbar
          placeholder="Search "
          placeholderTextColor={'grey'}
          fontSize={16}
          onChangeText={onChangeSearch}
          // value={searchQuery}
          iconColor={color._primary_orange}
          style={{
            backgroundColor: "#F8F7FA",
            height: 40,
            width: 266,
          }}
          inputStyle={{
            fontFamily: fonts.REGULAR,
            fontSize: 10,
            color: "#000000",
            alignSelf: "center",
            // opacity: 0.4,
            // lineHeight: 11,
          }}
        />
      </View>
    );
  };
  // const d = new Date();
  // let currentMonth = d.getMonth();

  // const onDone = (date) => {
  //   setModalVisible(!modalVisible);
  //   plans[selectedItem]['schedule'] = date
  //   setPlans(plans)
  // }

  const handleResPlan = async () => {
    const token = userToken ? userToken :
      Usertoken
    let apiData = {
      endpoint: API_URL.planHomepage + `?date=${month}`,
      token
      // navigation.navigate("DatingProfile"),
    };
    dispatch(PlanAllRequest(apiData))
  }

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      handleResPlan()
    })
    let timeout = setTimeout(() => {
      setLoader(false)
    }, 3000)
    return () => {
      if (timeout) clearTimeout(timeout)
    }

  }, [month, isFocused])

  const showData = ({ item, index }) => {
    // console.log(item.records[0].time, "PPPP")
    return (
      <View style={[styles.cardView]}>
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("PurchasedActivity", { bId: item.records[0]._id });
          }}
        >
          <Text style={styles.textStyle}>{item.date}</Text>
          <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 10, flex: 1, justifyContent: 'space-between' }}>
            <Image
              source={{ uri: `http://54.92.82.16:3001/data/${item?.records[0].providerImage}` }}
              style={{ height: 95, width: 110, borderRadius: 6, resizeMode: 'cover' }}
            />
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <Text style={styles.textTitle}>{item?.records[0].providerName}</Text>
              {/* <View style={[styles.lastText]}> */}
              <Text style={styles.textBetween}>{item?.records[0].serviceName}</Text>
              <Text style={styles.textLoc}>
                <LocationIcon
                  name="location-pin"
                  size={15}
                  color={color._primary_orange}
                />
                {"Travels To You"}</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                // onPress={() => {
                //   setSelectedItem(index)
                //   setModalVisible(true)
                // }}
                style={styles.mediaType}>
                <Text style={styles.mediaType2}>
                  <Icon name={"calendar-alt"} size={11} color={color._primary_orange} />{"    "}
                  {/* {"Availability"} */}
                  {item.date ? item.date : "Buy Now,Book Later"} {item.records[0].time ? item.records[0].time : ""}
                </Text>
              </TouchableOpacity>
              {/* </View> */}
            </View>

          </View>
        </TouchableOpacity>
      </View>
    );
  };


  const emptyData = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.textTitle}>Upcoming Bookings</Text>
        <TouchableOpacity
          style={[styles.card, { marginTop: 20 }]}
          activeOpacity={0.9}
        // onPress={() => {
        //   navigation.navigate("PurchasedActivity", { bId: item.records[0]._id });
        // }}
        >
          <Text style={styles.textStyle}>Nothing’s plan at the moment</Text>
          <Text style={[styles.textStyle, { color: color._primary_orange, marginTop: 10 }]}>Book a Date</Text>
        </TouchableOpacity>
      </View>
    );
  };
  // console.log(plan)

  const arrayToObj = () => {
    let arr = []
    Object.keys(plan).map(month => {
      plan[month].map(item => {
        let selectDateObj = {
          selected: true,
          selectedColor: color._primary_orange,
          id: item.records[0]?._id
        }
        arr.push([moment(item.records[0].date).format('YYYY-MM-DD'), selectDateObj])
      })
    })
    arr.push([moment().format('YYYY-MM-DD'), {selected: true,
    selectedColor: color._primary_orange,
    id: ''}])
    return Object.fromEntries(arr)
  }
  return (
    // props?.state?.roleReducer?.role?.id == 2 ? <PlanReservedGuest /> :
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        {!show && <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: wp(4.25),
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => { navigation.navigate("PlanReadyReservation") }}
          >

            <Image source={require('../../../assets/images/PlanReady.png')} style={{
              height: 22,
              width: 22,
              tintColor: color._black
            }} />
          </TouchableOpacity>
          {/* <Image
            // resizeMode="cover"
            resizeMode="contain"
            style={{ height: 30, width: 30 }}
            source={require("../../../assets/images/orange_hearts.png")}
          /> */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.9}

            >
              {/* <CalendarDark
                name="calendar-day"
                size={22}
                color={color._black}
              /> */}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}

            >
              <Search
                onPress={() => setShow(!show)}
                name="search"
                size={22}
                color={color._border_orange}
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
        </View>}
        {
          show &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} >
            <View>{search()}</View>
            <Icons onPress={() => setShow(!show)} name={'arrowright'} size={24} color={color._primary_orange} />
          </View>
        }
        <Calendar
          style={{
            marginTop: 31,
            marginBottom: 19,
            borderWidth: 1,
            borderColor: color._dusty_white,
            borderRadius: 15,
            // shadowColor: color._red,
            // shadowOffset: {
            //   width: 0,
            //   height: 3,
            // },
            // shadowOpacity: 0.1,
            // shadowRadius: 4.65,
            // elevation: 7,
            width: "97%",
            alignSelf: "center",
            backgroundColor: color._dusty_white
          }}
          theme={{
            todayTextColor: color._border_orange,
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
            // backgroundColor: color._dusty_white,
            calendarBackground: color._dusty_white
          }}
          onDayPress={(day) => {
            let selectedDates = arrayToObj()
            if (selectedDates.hasOwnProperty(day.dateString)) {
              navigation.navigate("PurchasedActivity", { bId: selectedDates[day.dateString]?.id });
            }
            return
            // setSelected(day.dateString);
            // select(day)

          }}

          onMonthChange={(day) => {
            setMonths(day.dateString)
            setMonthName(getMonthName(day.month)),
              setMonthName2(getMonthName(day.month + 1));
          }}
          markedDates={arrayToObj()}
        />

        <View style={[styles.main, loader && {
          justifyContent: 'center'
        }]}>
          {loader ? <ActivityIndicator color={color._primary_orange} size={'large'} /> :
            (
              <FlatList
                data={[0]}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                  <>
                    <Text style={styles.textTitle}>Selected Date</Text>
                    <TouchableOpacity
                      style={[styles.card, { marginTop: 20 }]}
                      activeOpacity={0.9}
                      onPress={() => {
                        // navigation.navigate('Root', {
                        //   screen: 'Home',
                        //   // params: { elapsedTime: elapsedTimeInSeconds }
                        // })
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Root', params: { screen: 'Home' } }],
                        })
                        // navigation.navigate("Root", ("Home"));
                      }}
                    >
                      <Text style={styles.textStyle}>{moment().format('dddd Do')}</Text>
                      <Text style={[styles.textStyle, { color: color._primary_orange, marginTop: 10 }]}>Book a Date</Text>
                    </TouchableOpacity>
                    {plan && Object.keys(plan).length > 0 ? Object.keys(plan).map(month => {
                      // console.log(month)
                      return (
                        <>
                          <Text style={[styles.orangeText, { marginTop: 10 }]}>{month}</Text>
                          <FlatList
                            scrollEnabled={false}
                            data={plan[month]}
                            ListEmptyComponent={emptyData}
                            keyExtractor={(item) => item._id}
                            renderItem={showData}
                            showsVerticalScrollIndicator={false}
                          />
                        </>

                      )

                    }) : (
                      <>
                        {emptyData()}
                      </>
                    )}
                  </>
                )}
              />
            )}
        </View>
      </View>
      <PopUp.SlideUpPopUp
        cancelTitle={"Cancel this reservation"}
        isVisible={modalVisible}
        setSelected={setSelectedDate}
        selected={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onPress={() => {
          // onDone(date)
          setModalVisible(!modalVisible)
          // navigation.navigate("PurchasedActivity"), 
        }}
        onRequestClose={(date) => {
          setModalVisible(!modalVisible)
        }}
      />
      <Model.CommonPopUp
        isVisible={false}
        // onRequestClose={() => { setModalVisibleAvailablity(false) }}
        title="Plan Dates"
        titleTxt={{ fontSize: 24 }}
        discription="User account required to plan dates."
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt={"SIGN IN"}
        onPress={() => { setModalVisibleAvailablity(false), navigation.navigate("Login") }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => (dispatch(roleRequest(data))),
  setAnswer: (data, navigation) =>
    dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) =>
    dispatch(removeAnswer(data, navigation)),
  setLoader: (data) => dispatch(setLoader(data)),
  PlanAllRequest: (data) => dispatch(PlanAllRequest(data)),
  PlanAllDetailsRequest: (data, navigation) => dispatch(PlanAllDetailsRequest(data, navigation)),
  PlanfavouriteListRequest: (data) => dispatch(PlanfavouriteListRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanReserved);
