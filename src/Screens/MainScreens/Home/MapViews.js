import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  useWindowDimensions,
  Pressable,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { memo, useEffect, useState } from "react";
import styles from "./HomeStyles";
import { ActivityIndicator, Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Atom from "../../../Components/atoms";
import { BackHeader } from "../../../Components/molecules";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AllHome from "./AllHome";
import Food from "./Food";
import Entertainment from "./Entertainment";
import Arts from "./Arts";
import MapIcon from "react-native-vector-icons/Feather";
import LocationIcon from "react-native-vector-icons/Entypo";
import CartIcon from "react-native-vector-icons/AntDesign";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import Cart from "../Cart";
import { connect } from "react-redux";
import * as  Models from "../../../Components/models";
import { roleRequest } from "../../../modules/Role/actions";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { favouriteListRequest, merchantDetailsRequest, merchantRequest } from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CartListRequest } from "../../../modules/Cart/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import Geolocation from '@react-native-community/geolocation';
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Images from "../../../assets/Images";
import CommonCrousal from "./CommonCrousal";
import axiosClient from "../../../Utils/ApiClient";
import CommonList from "./CommonList";
import CommonHeader from "./CommonHeader";
import AllMap from "./AllMap";



let page = 1


const MapViews = (props) => {
  const navigation = useNavigation();
  const role = props.state.roleReducer.role.id
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(false);
  const [geoCityName, setGeoCityName] = useState('');
  const [geoCityShortName, setGeoCityShortName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState('1');
  const [selectedItem, setSelectedItem] = useState(null);
  const [text, setText] = useState('');

  const userCity = props?.state?.profileReducer?.datingData?.userProfile?.locationAddress
  const userCords = null
  const tempCords = role == 1 ? props.state?.profileReducer?.tempCoordinates : props.state?.profileReducer?.userTempCoordinates
  const tempName = role == 1 ? props.state?.profileReducer?.tempLocatioName : props.state?.profileReducer?.userTempLocatioName


  const getCurrentCity = () => {
    const apiKey = 'AIzaSyCWbsC3b6QgedZG8VQe2ux5lovNGxTptZM';

    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
        fetch(geocodingUrl)
          .then(response => response.json())
          .then(data => {
            // console.log("DDDD++", data.status)
            if (data.status === 'OK') {
              const results = data.results;
              if (results.length > 0) {
                let coords = {
                  coordinates: [results[0].geometry.location.lng, results[0].geometry.location.lat]
                }
                // props.tempCoordinates(coords)
                // Extract the city name from the address components
                const addressComponents = results[0].address_components;
                const cityComponent = addressComponents.find(component => {
                  return component.types.includes('locality');
                });
                const cityName = cityComponent ? cityComponent.long_name : 'City Not Found';
                const cityShortName = cityComponent ? cityComponent?.short_name : 'City Not Found';
                setGeoCityName(cityName)
                setGeoCityShortName(cityShortName)
                // Display the city name to the user or use it in your desired way
              } else {
                setError(true)
                // console.log('No results found');
              }
            } else {
              setError(true)
              // console.log(`Geocoding API request failed with status: ${data.status}`);
            }
          })
          .catch(error => {
            // console.log('Error:', error);
            setError(true)
          });
      },
      error => {
        setError(true)
        // Handle error cases
        // console.log(error, 'last');
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
      // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const onLoad = async () => {
    getCurrentCity()
    let apiData = {
      endpoint: API_URL.getProfile,
      userToken: props?.state?.loginReducer?.userToken ? props?.state?.loginReducer?.userToken :
        props.state?.signupReducer?.signupSucessData?.Usertoken,
      id: {
        userId: props.state.loginReducer?.loginData._id ? props.state.loginReducer?.loginData._id :
          props.state?.signupReducer?.signupSucessData?.UserData?._id
      },

      // navigation.navigate("DatingProfile"),
    };

    role == 2 ?
      props.datingProfileRequest(apiData) : null

    props.setLoader(false);
  }

  useEffect(() => {

    onLoad()
    // getApiRes()
  }, [])


  const listData = [
    { id: "1", title: "All " },
    { id: "2", title: "Food" },
    { id: "3", title: "Entertainment" },
    { id: "4", title: "Arts" },
  ]
  const filterData = [
    { _id: 1, name: "Price" },
    { _id: 2, name: "Distance" },
    { _id: 3, name: "Rating" },
    { _id: 4, name: "Availability" },
  ]
  const getApiRes = (item) => {
    let params = {
      endpoint: API_URL.fetchAllServices,
      coordinates: tempCords ? tempCords : userCords[0] !== undefined ? userCords : null,
      serviceType: item.id == "2" ? "6479bae337177e3f0a74c234" : item.id == '3' ? "649161e44755a8d0372968a1" :
        item.id == '4' ? "6482cc84dd8801bd2034316b" : null,
      // offset: 1,
      sortby: filterData[selectedItem - 1]?.name || ""
    };
    props.merchantRequest(params)
  }

  const getSortRes = (item) => {
    let params = {
      endpoint: API_URL.fetchAllServices,
      coordinates: tempCords ? tempCords : userCords[0] !== undefined ? userCords : null,
      serviceType: listData.filter(val => val.id === selectedItemIndex)[0].id == "2" ? "6479bae337177e3f0a74c234" : listData.filter(val => val.id === selectedItemIndex)[0].id == '3' ? "649161e44755a8d0372968a1" :
        listData.filter(val => val.id === selectedItemIndex)[0].id == '4' ? "6482cc84dd8801bd2034316b" : null,
      sortby: item.name,

    };
    props.merchantRequest(params)
  }

  const endReached = () => {
    page += 1
    let params = {
      endpoint: API_URL.fetchAllServices,
      coordinates: tempCords ? tempCords : userCords[0] !== undefined ? userCords : null,
      serviceType: listData.filter(val => val.id === selectedItemIndex)[0].id == "2" ? "6479bae337177e3f0a74c234" : listData.filter(val => val.id === selectedItemIndex)[0].id == '3' ? "649161e44755a8d0372968a1" :
        listData.filter(val => val.id === selectedItemIndex)[0].id == '4' ? "6482cc84dd8801bd2034316b" : null,
      sortby: filterData[selectedItem - 1]?.name || "",
      offset: page
    };
    props.merchantRequest(params)
  }

  const renderListItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <Pressable style={{
          paddingHorizontal: 20, paddingVertical: 20, marginHorizontal: 20, borderBottomWidth: 2, borderBottomColor: selectedItemIndex === item.id ? color._primary_orange : 'white'

        }}
          onPress={() => {
            getApiRes(item)
            setSelectedItemIndex(item.id);
          }}

        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: selectedItemIndex === item.id ? color._primary_orange : '#1C1A17' }}>
            {item.title}
          </Text>
        </Pressable>
      </View>
    )
  };
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          // marginHorizontal: 5,
          // marginBottom: 32,
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop: 22,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}

          style={{
            borderWidth: 1,
            backgroundColor: "#FFF",
            borderColor: selectedItem === (index + 1) ? color._primary_orange : "#9796A1",
            // height: 40,
            // paddingHorizontal: 26,
            paddingHorizontal: 16,
            paddingVertical: 9,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: 'center',
            marginHorizontal: 8,
            backgroundColor: selectedItem === (index + 1) ? color._primary_orange : "#FFFF"
          }}
          onPress={() => {
            setSelectedItem(item._id)
            getSortRes(item)
            setFilter(item.name)
            //  console.log('hello', item.name);
          }}
        >
          <Text style={{ color: selectedItem === (index + 1) ? "#FFFF" : color._black, fontFamily: fonts.MEDIUM, fontSize: 16, lineHeight: 18 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>

        <CommonHeader geoCityName={geoCityName} geoCityShortName={geoCityShortName} setText={setText} state={props.state} favouriteListRequest={(params) => props.favouriteListRequest(params)} />
        <View style={{}}>
          <CommonList
            data={listData}
            renderItem={renderListItem}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 18,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.9}

              style={{
                borderWidth: 0.8,
                borderColor: color._dusty_white,
                borderRadius: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../../assets/images/Filter_orange.png")}
                style={{ width: 39, height: 39, resizeMode: 'center' }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingRight: 20 }}>
            <CommonList
              data={filterData}
              renderItem={renderItem}
            />
          </View>
        </View>

        <AllMap endReached={endReached} setFilter={setFilter} />

      </View>
      <Models.EmptyCartPopUp
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />

    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
  setAnswer: (data, navigation) =>
    dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) =>
    dispatch(removeAnswer(data, navigation)),
  setLoader: (data) => dispatch(setLoader(data)),
  merchantRequest: (data) => dispatch(merchantRequest(data)),
  merchantDetailsRequest: (data, navigation) => dispatch(merchantDetailsRequest(data, navigation)),
  favouriteListRequest: (data) => dispatch(favouriteListRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MapViews);