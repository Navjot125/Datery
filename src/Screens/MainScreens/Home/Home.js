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
  Alert,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { memo, useEffect, useRef, useState } from "react";
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
import DatePicker from "react-native-date-picker";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import Cart from "../Cart";
import { connect, useSelector } from "react-redux";
import * as Models from "../../../Components/models";
import { roleRequest } from "../../../modules/Role/actions";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { setLoader } from "../../../modules/Loader/actions";
import {
  favouriteListRequest,
  merchantDetailsRequest,
  merchantRequest,
} from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CartListRequest } from "../../../modules/Cart/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import Geolocation from "@react-native-community/geolocation";
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
import RBSheet from "react-native-raw-bottom-sheet";
import { AccordionList } from "accordion-collapse-react-native";
import CustomIcon from "../../../assets/CustomIcon";

let page = 0;

const Home = (props) => {
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { signupSucessData } = useSelector((state) => state.signupReducer);
  const SignupToken = signupSucessData?.Usertoken;
  const navigation = useNavigation();
  const role = props.state.roleReducer.role.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(false);
  const [geoCityName, setGeoCityName] = useState("");
  const [geoCityShortName, setGeoCityShortName] = useState("");
  // let [text, setText] = useState('');
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  let [loc, setLoc] = useState("");
  const [isExpanded, setIsExpanded] = useState(null);
  const { merchants, totalMerchant } = useSelector(
    (state) => state.merchantReducer
  );
  const [selectedFilter, setSelectedFilters] = useState([]);

  const list = [
    {
      id: 1,
      title: "Category",
      body: [
        {
          title: "Food - Any Cusine",
          key: "",
          value: "Food - Any Cusine",
          mainTitle: "Category",
        },
        {
          title: "All",
          key: "",
          value: "All",
          mainTitle: "Category",
        },
        {
          title: "Food",
          key: "",
          value: "Food",
          mainTitle: "Category",
        },
        {
          title: "Arts",
          key: "",
          mainTitle: "Category",
          value: "Arts",
        },
        {
          title: "Adventurous",
          key: "",
          value: "Adventurous",
          mainTitle: "Category",
        },
        {
          title: "Sports",
          key: "",
          value: "Sports",
          mainTitle: "Category",
        },
      ],
      img: Images.upImage,
      dimg: Images.downImage,
    },
    {
      id: 2,
      title: "Sort By",
      body: [
        {
          title: "Relevance",
          key: "",
          value: "Relevance",
          mainTitle: "Sort By",
        },
        {
          title: "Price: Low to High",
          key: "",
          value: "PriceLowToHigh",
          mainTitle: "Sort By",
        },
        {
          title: "Price: High to Low",
          key: "",
          value: "PriceHighToLow",
          mainTitle: "Sort By",
        },
        {
          title: "Distance",
          key: "",
          value: "Distance",
          mainTitle: "Sort By",
        },
        {
          title: "Rating",
          key: "",
          value: "Rating",
          mainTitle: "Sort By",
        },
      ],
      img: Images.upImage,
      dimg: Images.downImage,
    },
    {
      id: 3,
      title: "Availability",
      body: [
        {
          title: "Anytime",
          key: "",
          value: "Anytime",
          mainTitle: "Availability",
        },
        {
          title: "Select a date",
          key: "",
          value: "Select a date",
          mainTitle: "Availability",
          //
        },
      ],
      img: Images.upImage,
      dimg: Images.downImage,
    },
    {
      id: 4,
      title: "Price",
      body: [
        {
          title: "Any Price",
          key: "",
          mainTitle: "Price",
        },
        {
          title: "$0 - $80",
          key: "",
          value: {
            lowerPrice: 0,
            higherPrice: 80,
          },
          mainTitle: "Price",
        },
        {
          title: "$80 - $120",
          key: "",
          value: {
            lowerPrice: 80,
            higherPrice: 120,
          },
          mainTitle: "Price",
        },
        {
          title: "$120 - $160",
          key: "",
          value: {
            lowerPrice: 120,
            higherPrice: 160,
          },
          mainTitle: "Price",
        },
        {
          title: "$160 - $200",
          key: "",
          value: {
            lowerPrice: 160,
            higherPrice: 200,
          },
          mainTitle: "Price",
        },
        {
          title: "$200 - $250",
          key: "",
          value: {
            lowerPrice: 200,
            higherPrice: 250,
          },
          mainTitle: "Price",
        },
        {
          title: "$250 - $300",
          key: "",
          value: {
            lowerPrice: 250,
            higherPrice: 300,
          },
          mainTitle: "Price",
        },
        {
          title: "$300+",
          key: "",
          value:
            //  "300+",
            {
              lowerPrice: 300,
              higherPrice: 999999,
            },
          // value: {
          //   lowerPrice: "300+",
          // higherPrice:""
          // },
          mainTitle: "Price",
        },
      ],
      img: Images.upImage,
      dimg: Images.downImage,
    },
    {
      id: 5,
      title: "Distance",
      body: [
        {
          title: "Any Distance",
          key: "",
          value: "Any Distance",
          mainTitle: "Distance",
        },
        {
          title: "Remote / Virtual",
          key: "Remote",
          value: "Remote / Virtual",
          mainTitle: "Distance",
        },
        {
          title: "Within 20 mi",
          key: "20",
          value: "Within 20 mi",
          mainTitle: "Distance",
        },
        {
          title: "Within 50 mi",
          key: "50",
          value: "Within 50 mi",
          mainTitle: "Distance",
        },
        {
          title: "Within 100 mi",
          key: "100",
          value: "Within 100 mi",
          mainTitle: "Distance",
        },
        {
          title: "Within 250 mi",
          key: "250",
          value: "Within 250 mi",
          mainTitle: "Distance",
        },
      ],
      img: Images.upImage,
      dimg: Images.downImage,
    },
    {
      id: 6,
      title: "Rating",
      body: [
        {
          title: "All",
          key: "",
          value: "All",
          mainTitle: "Rating",
          id: 0,
        },
        {
          title: "Unrated",
          key: 0,
          value: "Unrated",
          mainTitle: "Rating",
          id: 1,
        },
        {
          title: ["★", "★", "★", "★", "☆", "& up"],
          key: 4,
          value: ["★", "★", "★", "★", "☆", "& up"],
          mainTitle: "Rating",
          id: 2,
        },
        {
          title: ["★", "★", "★", "☆", "☆", "& up"],
          key: 3,
          value: ["★", "★", "★", "☆", "☆", "& up"],
          mainTitle: "Rating",
          id: 3,
        },
        {
          title: ["★", "★", "☆", "☆", "☆", "& up"],
          key: 2,
          value: ["★", "★", "☆", "☆", "☆", "& up"],
          mainTitle: "Rating",
          id: 4,
        },
        {
          title: ["★", "☆", "☆", "☆", "☆", "& up"],
          key: 1,
          value: ["★", "☆", "☆", "☆", "☆", "& up"],
          mainTitle: "Rating",
          id: 5,
        },
      ],
      img: Images.upImage,
      dimg: Images.downImage,
    },
  ];

  const renderHeader = (item, index, isExpanded) => (
    <View style={styles.bottmInsideMain}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{ textAlign: "left", color: color._black, fontSize: 14 }}
          >
            {item?.title}{" "}
          </Text>
          <Text style={{ textAlign: "left", fontSize: 10 }}>
            {item.body[0]?.title}{" "}
          </Text>
        </View>
        <Image
          style={{
            height: 20,
            width: 20,
            resizeMode: "center",
            tintColor: color._black,
          }}
          source={isExpanded ? item.img : item.dimg}
        />
      </View>
    </View>
  );

  const applyFilter = (mainItem, indexMain, subItem, idxItem) => {
    let arr = [...selectedFilter];
    let mainitemIncludedIdx = arr.findIndex(
      (i) => i?.title === mainItem?.title
    );
    if (mainitemIncludedIdx !== -1) {
      arr.splice(mainitemIncludedIdx, 1);
    }
    arr.push({
      title: mainItem?.title,
      sortyBy: indexMain === 4 || 5 ? subItem?.key : subItem?.title,
      value: subItem?.value || "",
    });
    setSelectedFilters(arr);
  };
  const renderBody = (item, index) => {
    return (
      <View style={{}}>
        {item.body.map((i, idx) => {
          let isItemSelected =
            selectedFilter.findIndex((subItem) =>
              index == 3
                ? i?.value?.higherPrice === subItem?.value?.higherPrice
                : index == 5
                ? i?.key === subItem?.sortyBy
                : i?.value === subItem?.value
            ) !== -1
              ? true
              : false;
          return (
            <TouchableOpacity
              onPress={() => {
                // item?.body[1]?.title == i?.title
                //   ? setOpen(true)
                //   : setOpen(false);
                // console.log(item?.body[1]?.title, '----', i?.title,'================')
                applyFilter(item, index, i, idx);
                // setIsExpanded(i.title)
              }}
              style={styles.rdioBttnCntnr}
            >
              <Text style={styles.rdioTxt}>{i?.title}</Text>
              {/* {item?.body[1]?.title === i?.title ? (
                open ? (
                  <View
                    style={{
                      width: "60%",
                      right: "40%",
                      top: 20,
                      // backgroundColor:'red',
                    }}
                  >
                    <DatePicker date={date} onDateChange={setDate} />
                  </View>
                ) : null
              ) : null} */}
              <CustomIcon
                type={"Fontisto"}
                name={isItemSelected ? "radio-btn-active" : "radio-btn-passive"}
                size={15}
                color={color._primary_orange}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const getCurrentCity = () => {
    return new Promise((resolve, reject) => {
      const apiKey = "AIzaSyCWbsC3b6QgedZG8VQe2ux5lovNGxTptZM";
      Geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
          fetch(geocodingUrl)
            .then((response) => response.json())
            .then((data) => {
              // console.log("DDDD++", data.status)
              if (data.status === "OK") {
                const results = data.results;
                if (results.length > 0) {
                  let coords = {
                    coordinates: [
                      results[0].geometry.location.lng,
                      results[0].geometry.location.lat,
                    ],
                  };
                  // props.tempCoordinates(coords)
                  // Extract the city name from the address components
                  const addressComponents = results[0].address_components;
                  const cityComponent = addressComponents.find((component) => {
                    return component.types.includes("locality");
                  });
                  const cityName = cityComponent
                    ? cityComponent.long_name
                    : "City Not Found";
                  const cityShortName = cityComponent
                    ? cityComponent?.short_name
                    : "City Not Found";
                  setGeoCityName(cityName);
                  setGeoCityShortName(cityShortName);

                  // Display the city name to the user or use it in your desired way
                  resolve(coords);
                } else {
                  setError(true);
                  reject(false);
                  // console.log('No results found');
                }
              } else {
                setError(true);
                reject(false);

                // console.log(`Geocoding API request failed with status: ${data.status}`);
              }
            })
            .catch((error) => {
              // console.log('Error:', error);
              setError(true);
              reject(false);
            });
        },
        (error) => {
          setError(true);
          // Handle error cases
          reject(false);

          // console.log(error, 'last');
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
        // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const onLoad = async () => {
    let apiData = {
      endpoint: API_URL.getProfile,
      token: userToken ? userToken : SignupToken,
      id: loginData._id ? loginData._id : signupSucessData?.UserData?._id,
    };
    role == 2 ? props.datingProfileRequest(apiData) : null;
    props.setLoader(false);
  };

  const requestMerchants = async () => {
    let coords = await getCurrentCity();

    const token = userToken ? userToken : SignupToken;
    let params = {
      token,
      endpoint: API_URL.fetchAllServices,
      coordinates: tempCords
        ? tempCords
        : userCords[0] !== undefined
        ? userCords
        : null,
      category:
        listData.filter((val) => val.id === selectedItemIndex)[0].id == "2"
          ? "Food"
          : listData.filter((val) => val.id === selectedItemIndex)[0].id == "3"
          ? "Arts"
          : listData.filter((val) => val.id === selectedItemIndex)[0].id == "4"
          ? "Entertainment"
          : listData.filter((val) => val.id === selectedItemIndex)[0].id == "5"
          ? "Arts"
          : null,
      sortby: filterData[selectedItem - 1]?.name || "",
      offset: page,
    };
    if (coords) {
      params.coordinates = coords.coordinates;
    }
    props.merchantRequest(params);
  };

  useEffect(
    () => {
      onLoad();
      requestMerchants();
      // getApiRes()
    },
    [
      // onLoad()
    ]
  );

  const [merchantData, setMerchantData] = useState(
    props.state.merchantReducer?.merchants
      ? props.state.merchantReducer?.merchants
      : []
  );

  const [selectedItemIndex, setSelectedItemIndex] = useState("1");
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataItem, setDataItem] = useState(false);
  const rbSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const [showSecondView, setShowSecondView] = useState(true); // Initial state, adjust as needed

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.x;
    // Adjust the threshold as needed based on your design
    const threshold = 50;
    // Update the state to show/hide the second view
    setShowSecondView(offsetY < threshold);
  };
  const listData = [
    { id: "1", title: "All" },
    { id: "2", title: "Food" },
    { id: "3", title: "Arts" },
    { id: "4", title: "Entertainment" },
    { id: "5", title: "Adventurous" },
  ];

  const filterData = [
    { _id: 1, name: "Sort" },
    { _id: 2, name: "Availability" },
    { _id: 3, name: "Price" },
    { _id: 4, name: "Distance" },
  ];

  const handleScrollEndDrag = () => {
    // If the user scrolls back to the top, show the second view again
    const isAtTop = flatListRef.current && flatListRef.current.scrollToOffset;
    if (isAtTop) {
      setShowSecondView(false);
    }
  };

  useEffect(() => {
    setDataItem(!dataItem);
  }, [props.state.merchantReducer?.merchants]);

  const getApiRes = (item) => {
    console.log(item, "pp");
    page = 0;
    const token = userToken ? userToken : SignupToken;
    let params = {
      token,
      endpoint: API_URL.fetchAllServices,
      coordinates: tempCords
        ? tempCords
        : userCords[0] !== undefined
        ? userCords
        : null,
      category: item?.title == "All" ? null : item?.title,
      offset: page,
      // sortby: list[selectedItem - 1]?.title || ""
    };
    props.merchantRequest(params);
    console.log(params, "PARAMSSSSSS");
  };

  const getFilterValue = (head) => {
    // return selectedFilter.filter((item) => console.log(item,'------------', head))
    return selectedFilter.filter((item) => item?.title === head).length > 0
      ? selectedFilter.filter((item) => item?.title === head)[0]
      : {};
  };
  const getSortRes = (item) => {
    console.log(item, "hhh");
    page = 0;
    const token = userToken ? userToken : SignupToken;
    let params = {
      token,
      endpoint: API_URL.fetchAllServices,
      coordinates: tempCords
        ? tempCords
        : userCords[0] !== undefined
        ? userCords
        : null,
      // serviceType: listData.filter(val => val.id === selectedItemIndex)[0].id == "2" ? "6479bae337177e3f0a74c234" : listData.filter(val => val.id === selectedItemIndex)[0].id == '3' ? "649161e44755a8d0372968a1" :
      //   listData.filter(val => val.id === selectedItemIndex)[0].id == '4' ? "6482cc84dd8801bd2034316b" : null,
      category: item?.title || null,
      sortby: getFilterValue("Sort By")?.value,
      priceRange: getFilterValue("Price")?.value,
      rating: getFilterValue("Rating")?.sortyBy,
      distance: getFilterValue("Distance")?.sortyBy,
      offset: page,
    };
    // console.log('param of fetchAllSerrvices', params, null, 2)
    props.merchantRequest(params);
  };
  const endReached = () => {
    if (totalMerchant > merchants.length) {
      page += 1;
      const token = userToken ? userToken : SignupToken;
      let params = {
        token,
        endpoint: API_URL.fetchAllServices,
        coordinates: tempCords
          ? tempCords
          : userCords[0] !== undefined
          ? userCords
          : null,
        category:
          listData.filter((val) => val.id === selectedItemIndex)[0].id == "2"
            ? "Food"
            : listData.filter((val) => val.id === selectedItemIndex)[0].id ==
              "3"
            ? "Arts"
            : listData.filter((val) => val.id === selectedItemIndex)[0].id ==
              "4"
            ? "Entertainment"
            : listData.filter((val) => val.id === selectedItemIndex)[0].id ==
              "5"
            ? "Arts"
            : null,
        sortby: filterData[selectedItem - 1]?.name || "",
        offset: page,
      };
      props.merchantRequest(params);
    }
    // console.log('page', props.state.merchantReducer.totalMerchant,params,totalMerchant > merchants.length)
  };
  const userCity =
    props?.state?.profileReducer?.datingData?.userProfile?.locationAddress;
  const userCords = null;
  const tempCords =
    role == 1
      ? props.state?.profileReducer?.tempCoordinates
      : props.state?.profileReducer?.userTempCoordinates;
  const tempName =
    role == 1
      ? props.state?.profileReducer?.tempLocatioName
      : props.state?.profileReducer?.userTempLocatioName;

  const [loadMore, setLoadMore] = useState(false);

  const renderItem = ({ item, index }) => {
    let isHeadSelected =
      selectedFilter.findIndex((i) => i?.title === item?.title) !== -1
        ? true
        : false;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          // backgroundColor: 'red'
          // marginTop: 22,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            borderWidth: 1,
            backgroundColor: "#FFF",
            borderColor: isHeadSelected ? color._black : color._grey_1,
            // height: 40,
            // paddingHorizontal: 26,
            paddingHorizontal: 9,
            paddingVertical: 9,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 11,
            backgroundColor: isHeadSelected ? color._black : color._smoke_white,
          }}
          onPress={() => {
            setSelectedItem(item.id);
            // getApiRes(item)
            getSortRes(item);
            // props.setFilter(item.name), console.log('hello', item.name);
          }}
        >
          <Text
            style={{
              color: isHeadSelected ? color._smoke_white : color._black,
              fontFamily: fonts.MEDIUM,
              fontSize: 16,
              lineHeight: 18,
            }}
          >
            {item?.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderListItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <Pressable
          style={{
            paddingHorizontal: 15,
            paddingVertical: 20,
            marginHorizontal: 12,
            borderBottomWidth: 2,
            borderBottomColor:
              selectedItemIndex === item.id
                ? color._primary_orange
                : color._smoke_white,
          }}
          onPress={() => {
            // getSortRes(item)
            getApiRes(item);
            setSelectedItemIndex(item.id);
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color:
                selectedItemIndex === item.id ? color._black : color._black,
            }}
          >
            {item?.title}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      {props.state.loaderReducer?.loader && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        ></View>
      )}
      <View style={[styles.mainView, { marginHorizontal: 20 }]}>
        <CommonHeader
          geoCityName={geoCityName}
          geoCityShortName={geoCityShortName}
          setText={setText}
          state={props.state}
          page={page}
          favouriteListRequest={(params) => props.favouriteListRequest(params)}
        />
        <View style={{ marginTop: 10 }}>
          <CommonList data={listData} renderItem={renderListItem} />
        </View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          ListEmptyComponent={() => {
            // console.log("LLL");
            // return (!loadMore ?
            //   <ActivityIndicator size={'large'} color={color._primary_orange} /> : null)
          }}
          ListFooterComponent={() => {
            return props.state.merchantReducer.totalMerchant >
              props.state.merchantReducer?.merchants.length ? (
              <ActivityIndicator size={"large"} color={color._primary_orange} />
            ) : null;
          }}
          // onEndReachedThreshold={100}
          data={[0]}
          onEndReached={() => {
            // console.log("hlo")
            // setLoadMore(true)
            // setTimeout(() => {
            //   setLoadMore(false)
            // }, 3000)
            endReached();
          }}
          renderItem={() => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 22,
                }}
              >
                {showSecondView && (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{
                        borderWidth: 0.8,
                        borderColor: color._dusty_white,
                        borderRadius: 80,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        rbSheetRef.current.open();
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/Filter_orange.png")}
                        style={{
                          width: 29,
                          height: 29,
                          resizeMode: "center",
                          tintColor: color._black,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                <View style={{ paddingRight: 20 }}>
                  <CommonList
                    ref={flatListRef}
                    data={list}
                    renderItem={renderItem}
                    onScroll={handleScroll}
                    onScrollEndDrag={handleScrollEndDrag}
                  />
                </View>
              </View>

              <View style={{ alignItems: "center", marginTop: 20 }}>
                {/* <CommonCrousal /> */}
              </View>
              <AllHome
                page={page}
                endReached={endReached}
                setFilter={setFilter}
              />
            </>
          )}
        />
      </View>
      <Models.EmptyCartPopUp
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <RBSheet ref={rbSheetRef} height={Dimensions.get("window").height / 2}>
        <View style={{ flex: 1 }}>
          <View style={styles.bottomScndCntnr}>
            <Pressable onPress={() => setSelectedFilters([])}>
              <Text style={[styles.bttmTxt, { color: color._black }]}>
                {"Reset"}
              </Text>
            </Pressable>
            {/* <Pressable> */}
            <Text style={[styles.bttmTxt, { color: color._black }]}>
              {/* {filterData[selectedItemIndex]?.id} */}
              {"All Filters"}
            </Text>
            {/* </Pressable> */}
            <Pressable
              onPress={() => {
                getSortRes();
                rbSheetRef.current.close();
              }}
            >
              <Text style={[styles.bttmTxt, { color: color._black }]}>
                {"Done"}
              </Text>
            </Pressable>
          </View>
          <AccordionList
            list={list}
            header={renderHeader}
            body={renderBody}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      </RBSheet>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) => dispatch(removeAnswer(data, navigation)),
  setLoader: (data) => dispatch(setLoader(data)),
  merchantRequest: (data) => dispatch(merchantRequest(data)),
  merchantDetailsRequest: (data, navigation) =>
    dispatch(merchantDetailsRequest(data, navigation)),
  favouriteListRequest: (data) => dispatch(favouriteListRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
