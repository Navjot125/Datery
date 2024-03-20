import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import styles from "./ListingDetailStyles";
import * as Atom from "../../../Components/atoms";
import { Checkbox, Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Plus from "react-native-vector-icons/Entypo";
import Minus from "react-native-vector-icons/Entypo";

import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import QRCode from "react-native-qrcode-svg";
import * as PopUp from "../../../Components/models";
import LocationIcon from "react-native-vector-icons/Entypo";
import { RadioButton, ActivityIndicator } from "react-native-paper";
// import RadioGroup, { RadioButton } from "react-native-radio-buttons-group";
// import RadioButtonsGroup, { RadioGroup } from "react-native-radio-buttons-group";
import { Dropdown } from "react-native-element-dropdown";
import Icons from "react-native-vector-icons/FontAwesome5";
import MapView, {
  Callout,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import RadioButtonsGroup from "react-native-radio-buttons-group";
import {
  favouriteRequest,
  guestFavouriteRequest,
} from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";
import * as Models from "../../../Components/models";
import {
  CartListRequest,
  addToCartGuestRequest,
  addToCartRequest,
} from "../../../modules/Cart/actions";
import {
  showAlert,
  showAlertError,
  showAlertSuccess,
} from "../../../Common/Functions/CommonFunctions";
import CustomIcon from "../../../assets/CustomIcon";
import ReviewTab from "../ReviewTab/ReviewTab";
import base from "../../../Constants/CommonStyle";
import {
  LearnAllRequest,
  LearnfavouriteListRequest,
  LearnfavouriteRequest,
  LearnremoveFavouriteRequest,
  LearnremoveGuestFavouriteRequest,
} from "../../../modules/learn/actions";
import { CheckBox } from "@rneui/base";
import { scale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const DATA = [
  {
    id: "1",
    name: "Paige",
    date: "3 Days Ago",
    review:
      "The experience was amazing. My husband and I loved the outcome of the meal.",
    rating: 4,
  },
  {
    id: "2",
    name: "Joan Perkins",
    date: "10 Days Ago",
    review: "Chef Jon did a great job cooking a mea1 for my date.",
    rating: 4,
  },
  {
    id: "3",
    name: "Antawn Jamison",
    date: "March 19, 2022",
    review:
      "The experience was amazing. My husband and I loved the outcome of the meal.",
    rating: 4,
  },
  {
    id: "4",
    name: "Frank Garrett",
    date: "Feburary 4, 2022",
    review: "Chef Jon did a great job cooking a mea1 for my date.",
    rating: 4,
  },
];
const data = [
  {
    id: 1,
    media: require("../../../assets/images/dummyImage.png"),
    name: "Chef Jon", //title
    address: "8130 Texas Drive, Dallas \u2022 2.2 mi", //address
    rating: "3.9",
    totalRating: 198, //ratingCount
    bio: "Chef Jon is a certified chef with over 15 years of experience in the food industry.",
    overallRating: 121, //remove
    overallStar: "4.9", //remove
    radioButtonsData: [
      {
        id: "1",
        label: "Virtual Cooking Experience With Chef Jon \n $79.99",
        value: "$79.99",
        color: color._primary_orange,
      },
      {
        id: "2",
        label: "3 Course Meal Cooked At Your Home By Chef jon \n $119.99",
        value: "$119.99",
        color: color._primary_orange,
      },
    ],

    about: [
      {
        id: 1,
        title: "Sed ut perspiciatis unde omnis iste natus error.",
      },
      {
        id: 2,
        title: "Sed ut perspiciatis unde omnis iste natus error.",
      },
      {
        id: 3,
        title: "Sed ut perspiciatis unde omnis iste natus error.",
      },
      {
        id: 4,
        title: "Sed ut perspiciatis unde omnis iste natus error.",
      },
    ],

    faq: [
      {
        id: 1,
        title: "How to blank? It depends.",
      },
      {
        id: 2,
        title: "Lorem ipsum dolor sit amet, consectetur.",
      },
    ],
  },
];
let readio = [
  {
    id: "1",
    label: "Virtual Cooking Experience With Chef Jon ",
    value: "$79.99",
    color: color._primary_orange,
  },

  {
    id: "2",
    label: "3 Course Meal Cooked At Your Home By Chef jon",
    value: "$119.99",
    color: color._primary_orange,
  },
];
const ListingDetail = (props) => {
  // console.log("props.route.params", props.route.params);
  const role = props.state.roleReducer.role.id;
  const dataa = props.route.params;
  const [result, setResults] = useState(props.route.params);
  const [selectedValue, setSelectedValue] = useState();
  const [itemId, setItemId] = useState();
  const [selectedValueName, setSelectedValueName] = useState();
  const [selectedValuePrice, setSelectedValuePrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState();
  const [emptyCart, setEmptyCart] = useState(false);
  const [valueDropdown, setValueDropdown] = useState(null);
  const [counter, setCounter] = React.useState(1);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(props.route.params?.isFavorite);
  // console.log('props.route?.params?.item', props.route?.params?.item);
  const dispatch = useDispatch();
  const onPress = (page) => {
    navigation.navigate(page);
  };
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );
  const userId = loginData?._id;
  let lattitude =
    props.state.merchantReducer?.details?.locationCordinates?.coordinates[0] ||
    0;
  let longitude =
    props.state.merchantReducer?.details?.locationCordinates?.coordinates[1] ||
    0;

  // console.log(props.state.merchantReducer.details.locationCordinates.coordinates)

  const handleFavListing = () => {
    dispatch(
      LearnfavouriteListRequest({
        endpoint: API_URL.fetchFavoriteLearn,
        userId: props.state.loginReducer.loginData._id,
      })
    );
  };
  const handleAddToCart = () => {
    let values = {
      userId,
      serviceId: result._id,
      itemId: itemId,
      time: selectedTime.title,
      date: selectedDate,
      typeOfVisit: selectedType,
    };
    let valuesGuest = {
      serviceId: result._id,
      itemId: selectedValue,
      quantity: counter,
      serviceName: selectedValueName,
      servicePrice: selectedValuePrice,
      providerName: result.title,
      providerimages: result.image,
      typeOfVisit: selectedType,
    };
    let param = {
      endpoint: API_URL.addItemToCart,
      navigation: () => {
        navigation.navigate("ReviewCart");
        // props.state.roleReducer.role.id == 2 ? navigation.navigate("ReviewCart") :  navigation.navigate("ReviewCart")
      },
    };
    {
      selectedValue
        ? props.state.roleReducer.role.id == 2
          ? dispatch(addToCartRequest(values, param))
          : !existingId(selectedValue)
          ? props.addToCartGuestRequest(valuesGuest, param)
          : showAlertError(`Item already exist in your cart`)
        : showAlert(`Please choose category before adding to cart`, 4000);
    }
  };
  const handleDelete = (id) => {
    // console.log(id, "IIDDDDd");
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    let param = {
      endpoint: API_URL.deleteFavorite,
      data: {
        serviceId: id,
        userId: props.state?.loginReducer?.loginData?._id
          ? props.state?.loginReducer?.loginData?._id
          : props.state?.signupReducer?.signupSucessData?.UserData?._id,
      },
    };
    let serviceId = {
      serviceId: id,
    };
    role == 2
      ? props.LearnremoveFavouriteRequest(param)
      : props.LearnremoveGuestFavouriteRequest(serviceId);
    setIsFavorite(!isFavorite);
    showAlertSuccess(`Item removed from your favourite list`);
    setTimeout(() => {
      handleFavListing();
    }, 250);
  };

  const centerImage = () => {
    return (
      <View style={{ left: -10 }}>
        <CustomIcon
          type={"Entypo"}
          name={isFavorite ? "heart" : "heart-outlined"}
          size={25}
          color={isFavorite ? color._primary_orange : "white"}
          onPress={async () => {
            if (!isFavorite) {
              console.log("yes is favorite 2");
              let param = {
                endpoint: API_URL.favoritiesInsert,
                id: {
                  userId: props.state?.loginReducer?.loginData?._id
                    ? props.state?.loginReducer?.loginData?._id
                    : props.state?.signupReducer?.signupSucessData?.UserData
                        ?._id,
                  serviceId: result?._id,
                },
              };
              if (role == 2) {
                console.log("role is 2 2");
                await props.LearnfavouriteRequest(param);
                setIsFavorite(!isFavorite);
              } else if (existingFavourite(result?._id)) {
                showAlertError(`Item already exist in your favourite list`);
              } else showAlertError(`Please login to add favourites`);
            } else {
              console.log("not in favorite"), handleDelete(result?._id);
            }
          }}
        />
      </View>
    );
  };
  // console.log('---------------------', result);
  // console.log(props.state.cartReducer?.INITIAL_STATE,'props.state.cartReducer------------------');
  const rightImage = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          const token = userToken ? userToken : Usertoken;

          let param = {
            endpoint: API_URL.getCartItem,
            token,
            userId: {
              userId: props.state?.loginReducer?.loginData?._id
                ? props.state?.loginReducer?.loginData?._id
                : props.state?.signupReducer?.signupSucessData?.UserData?._id,
            },
            navigation: () => {
              navigation.navigate("ReviewCart");
            },
          };
          role == 2
            ? props.state.cartReducer?.cartCount == null
              ? setEmptyCart(true)
              : props.state.cartReducer?.cartCount == 0
              ? setEmptyCart(true)
              : (props.CartListRequest(param),
                // console.log(param, "pcxppp"),
                navigation.navigate("ReviewCart"))
            : props.state.cartReducer?.cartCount == null
            ? setEmptyCart(true)
            : props.state.cartReducer?.cartCount == 0
            ? setEmptyCart(true)
            : navigation.navigate("ReviewCart");
        }}
      >
        <Text
          style={{
            backgroundColor: color._primary_orange,
            position: "absolute",
            color: color._white,
            borderRadius: 50,
            height: 17,
            width: 17,
            textAlign: "center",
            right: 0,
            top: -6,
            zIndex: 1,
          }}
        >
          {/* {props.state.cartReducer?.cartListUser?.length ? props.state.cartReducer?.cartListUser?.length : 0} */}
          {props.state.cartReducer?.cartCount
            ? props.state.cartReducer?.cartCount
            : 0}
        </Text>
        <Image
          style={{ height: 20, width: 20, marginRight: 10 }}
          source={require("../../../assets/images/CartListing.png")}
        />
      </TouchableOpacity>
    );
  };
  const ShaeImage = () => {
    return (
      <TouchableOpacity activeOpacity={0.9}>
        <Image
          style={{
            height: 20,
            width: 20,
            resizeMode: "contain",
            marginRight: 10,
          }}
          source={require("../../../assets/images/WhiteShare.png")}
        />
      </TouchableOpacity>
    );
  };

  const onPressModal = () => {
    // console.log("first");
  };
  const renderAbout = ({ item }) => {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
      >
        <Icon name="circle" size={6} color={color._font_grey} />
        <Text style={{ paddingLeft: 8, color: color._font_grey }}>{item}</Text>
      </View>
    );
  };

  const renderFaq = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name="circle" size={6} color={color._font_grey} />
        <Text style={{ paddingLeft: 8, color: color._font_grey }}>
          {item.title}
        </Text>
      </View>
    );
  };

  const formatDate = (isoDateString) => {
    const createdAtDate = new Date(isoDateString);
    return `${createdAtDate.toDateString()}`;
  };

  const renderItem = ({ item }) => {
    // console.log(item, "ii")
    return (
      <View style={styles.viewFlatList}>
        <Text style={styles.name}>{item.title}</Text>
        <View style={styles.itemSpace}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              fontFamily: fonts.SEMI_BOLD,
              color: color._black,
              bottom: 5,
            }}
          >
            {item.username}
          </Text>
          <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Atom.Rating
            disabled={true}
            currentRating={Math.round(item.rating)}
            titleStyle={{ paddingLeft: 3 }}
          />
        </View>
        <Text style={styles.review}>{item.summary}</Text>
      </View>
    );
  };

  function getLabelById(id) {
    const radioButton = result.radioButtonsData.find((item) => item._id === id);
    return radioButton ? radioButton.label : null;
  }

  function getPriceById(id) {
    const radioButton = result.radioButtonsData.find((item) => item._id === id);
    return radioButton ? radioButton.price : null;
  }
  // { console.log(result, "RESULT") }
  function existingId(id) {
    const exist = props.state.cartReducer.cartList.find(
      (item) => item.itemId === id
    );
    return exist ? true : false;
  }

  function existingFavourite(id) {
    const exist = props.state.merchantReducer.favouritesGuest.find(
      (item) => item.serviceId === id
    );
    return exist ? true : false;
  }

  const dataDropDown = [
    { label: "Most Recent", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
  ];
  const incrementCounter = () => {
    setCounter(counter + 1);
  };
  const decrementCounter = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
    }
  };
  // console.log("PPRORPPP", result.reviews[0].summary);

  return (
    <SafeAreaView style={styles.scrollView}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
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
        >
          <ActivityIndicator size="large" color={color._primary_orange} />
        </View>
      )}
      <View style={styles.mainView}>
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              zIndex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              top: "3%",
            }}
          >
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[base.horizontal, { position: "absolute", left: 0 }]}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text
                  style={[base.hilitedFont, { fontSize: 14, marginLeft: 8 }]}
                >
                  <AntDesign name={"arrowleft"} size={24} color={"white"} />
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginRight: 10,
                position: "absolute",
                right: 0,
                alignItems: "center",
                paddingHorizontal: 15,
              }}
            >
              {centerImage()}
              {ShaeImage()}
              {rightImage()}
            </View>
          </View>
          <View>
            <FastImage
              source={{ uri: `http://54.92.82.16:3001/data/${result?.image}` }}
              style={{
                height: 196,
                width: "100%",
                marginBottom: 19,
              }}
            />
            <View style={{ marginHorizontal: 15, marginBottom: 27, flex: 1 }}>
              <Text style={styles.boldName}>{result?.title}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // right: 10
                  left: -5,
                  // backgroundColor:'red'
                }}
              >
                <LocationIcon
                  name="location-pin"
                  size={20}
                  color={color._primary_orange}
                />
                <Text style={{ marginVertical: 10, color: color._font_grey }}>
                  {result?.address}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                {result?.typeOfVisit?.map((item, index) => (
                  <View style={{ flexDirection: "row" }}>
                    <FastImage
                      style={{ height: 15, width: 15 }}
                      source={
                        item == "Onsite"
                          ? require("../../../assets/images/onsite.png")
                          : require("../../../assets/images/travel.png")
                      }
                    />
                    <Text style={{ fontSize: 14, marginHorizontal: 5 }}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
              {result?.averageRating !== 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      color: color._font_grey,
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                      left: 4,
                    }}
                  >
                    {result?.averageRating.toFixed(2)}
                  </Text>
                  <View style={{ alignItems: "center", marginLeft: 10 }}>
                    <Atom.Rating
                      disabled={true}
                      currentRating={Math.round(result?.ratingCount)}
                      // titleStyle={{ left:10 }}
                    />
                  </View>
                  <Text
                    style={{
                      color: color._font_grey,
                      fontSize: 12,
                      fontWeight: "400",
                      left: 5,
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    ({result?.ratingCount}){" "}
                  </Text>
                  {result?.labels?.map((item, index) => (
                    <View
                      style={{
                        backgroundColor: color._primary_orange,
                        padding: 5,
                        borderRadius: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 15,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "700",
                          color: color._white,
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}
              <View>
                {result?.radioButtonsData?.map((item, index) => (
                  <View
                    style={{
                      // backgroundColor: "red",
                      flexDirection: "row",
                      // alignItems: "center",
                    }}
                  >
                    <Checkbox.Android
                      uncheckedColor={color._primary_orange}
                      color={color._primary_orange}
                      status={itemId === item?._id ? "checked" : "unchecked"}
                      onPress={() => {
                        setSelectedValue(item), setItemId(item?._id);
                        setSelectedValueName(getLabelById(item)),
                          setSelectedValuePrice(getPriceById(item));
                      }}
                    />
                    <Text style={{ fontSize: 14, marginTop: scale(8) }}>
                      {item?.label}
                      {"\n"}
                      <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        ${item?.price}
                      </Text>
                    </Text>
                  </View>
                ))}
              </View>
              {/* <View
                style={{
                  // alignSelf: 'flex-start',
                  marginTop: 10,
                  // flex: 1,
                  // marginLeft:10
                  // backgroundColor:"red",
                  // justifyContent:'flex-start',
                  // alignItems:'flex-start'
                }}
              >
                <RadioButton.Group
                  onValueChange={(value) => {
                    setSelectedValue(value),
                      setSelectedValueName(getLabelById(value)),
                      setSelectedValuePrice(getPriceById(value));
                  }}
                  value={selectedValue}
                >
                  {console.log('resulteeep-----',result)}
                  {result?.radioButtonsData.map((item) => (
                    <>
                      <RadioButton.Item
                        uncheckedColor="#C4C4C4"
                        color={
                          selectedValue === item._id
                            ? color._primary_orange
                            : "white"
                        }
                        key={item._id}
                        style={{
                          flexDirection: "row-reverse",
                          alignItems: "center",
                          left: -25,
                          marginVertical: -5,
                        }}
                        labelStyle={{
                          fontSize: 14,
                          color: color._black,
                          fontWeight: "600",
                          textAlign: "left",
                        }}
                        label={item.label}
                        value={item._id}
                      >
                        <RadioButton.Android
                          style={
                            {
                              // width: '100%', backgroundColor: 'yellow',
                              // borderWidth: 2, borderColor: 'blue'
                            }
                          }
                        />
                      </RadioButton.Item>
                      <Text
                        style={{
                          color: color._black,
                          left: "7%",
                          fontFamily: fonts.LIGHT,
                          fontSize: 16,
                          fontWeight: "bold",
                          top: -5,
                        }}
                      >
                        ${item.price}
                      </Text>
                    </>
                  ))}
                </RadioButton.Group>
              </View> */}
              <Text style={styles.boldText}>
                About
                {/* {result?.title} */}
              </Text>
              <Text
                style={{
                  color: color._font_grey,
                  fontSize: 14,
                  fontWeight: "400",
                  lineHeight: 18,
                }}
              >
                {result?.about}
              </Text>
              {/* <Text style={styles.boldText}>About Dating Packages</Text> */}
              {result?.aboutDatingPackage ? (
                <>
                  <Text style={styles.boldText}>
                    Details
                    {/* {result?.aboutDatingPackage?.title} */}
                  </Text>
                  {/* <Text style={{ color: color._font_grey, marginTop: 10 }}>What's included:</Text> */}

                  <Text style={{ color: color._font_grey }}>
                    in this cooking class, Chef Khenan will help bring the
                    flavors of Jamaica to your dinner table.{" "}
                  </Text>
                  <Text style={{ color: color._font_grey, marginTop: 10 }}>
                    Chef Khenan will teach you how to prep, cook, and plate your
                    meal.
                  </Text>

                  <Text style={styles.boldText}>Menu</Text>
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.menuText}>
                      Entree:
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          color: color._black,
                          lineHeight: 18,
                        }}
                      >
                        {""} Jerk chicken, beef, or fish
                      </Text>
                    </Text>
                    <Text style={styles.menuText}>
                      Sides:
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          color: color._black,
                          lineHeight: 18,
                        }}
                      >
                        {""} Rice and peas, fried plantains
                      </Text>
                    </Text>
                    <Text style={styles.menuText}>
                      Dessert:
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          color: color._black,
                          lineHeight: 18,
                        }}
                      >
                        {""} Rum cake
                      </Text>
                    </Text>
                  </View>
                  <Text style={styles.boldText}>Preparation</Text>
                  <Text style={{ color: color._font_grey }}>
                    This class requires the customer to provide a location that
                    has a kitchen with a stove top, oven, and available counter
                    space for meal preparation at the time of booking. The
                    customer must also provide their own plates, drink ware, and
                    eating utensils.
                  </Text>

                  <Text style={styles.boldText}>Notes</Text>
                  {/* <FlatList
                      data={result?.aboutDatingPackage?.points}
                      renderItem={renderAbout}
                      keyExtractor={(item) => item.id}
                    /> */}
                </>
              ) : null}
              <Text style={{ color: color._font_grey }}>
                The chef will provide all ingredients and cooking supplies
                needed for the course.
              </Text>
              <Text style={{ marginTop: 5, color: color._font_grey }}>
                The customer must provide any dietary restrictions at the time
                of booking.
              </Text>
              {/* <Text style={styles.boldText}>FAQ</Text>
              <FlatList
                data={data[0]?.faq}
                renderItem={renderFaq}
                keyExtractor={(item) => item.id}
              /> */}
              {/* <ReviewTab /> */}
              {/* {result?.reviews !== null ? */}
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.BOLD,
                      fontSize: 18,
                      color: color._black,
                      lineHeight: 36,
                      alignItems: "center",
                    }}
                  >
                    {"Reviews "}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.review}>Sort By </Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.placeholderStyle}
                      data={dataDropDown}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={"Select item"}
                      value={valueDropdown}
                      onChange={(item) => {
                        setValueDropdown(item.value);
                      }}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[styles.review, { color: color._font_grey }]}>
                    {" "}
                    {result?.averageRating.toFixed(2)}{" "}
                    {result?.ratingCount == 0 ? "Rating" : null}{" "}
                  </Text>
                  <Atom.Rating
                    disabled={true}
                    currentRating={Math.round(result?.averageRating)}
                    // titleStyle={{ paddingLeft: 3 }}
                  />
                  <Text style={[styles.rating, { color: color._font_grey }]}>
                    {" "}
                    ({result?.ratingCount == 0
                      ? null
                      : result?.ratingCount}){" "}
                  </Text>
                </View>
                <FlatList
                  data={result?.reviews}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  // ItemSeparatorComponent={FlatListItemSeparator}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    color: color._primary_orange,
                    fontSize: 13,
                    fontFamily: fonts.BOLD,
                    marginVertical: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("MerchantReviews", { mId: result._id })
                  }
                >
                  View All Reviews
                </Text>
              </>
              {/* : null} */}

              <Text style={styles.boldText}>Location</Text>
              <View
                style={{
                  backgroundColor: "white",
                  flex: 1,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                <MapView
                  // ref={mapRef}
                  showsUserLocation={false}
                  provider={
                    Platform.OS === "android"
                      ? PROVIDER_GOOGLE
                      : PROVIDER_DEFAULT
                  }
                  // provider={PROVIDER_GOOGLE}
                  customMapStyle={[
                    {
                      featureType: "poi",
                      stylers: [{ visibility: "off" }],
                    },
                    {
                      featureType: "transit",
                      stylers: [{ visibility: "off" }],
                    },
                  ]}
                  // style={{  position: 'absolute', top: 0, left: 0, right: 0, bottom:0, flex:1,}}
                  style={{
                    height: 200,
                    width: "100%",
                    borderRadius: 12,
                  }}
                  loadingEnabled={true}
                  loadingIndicatorColor={color._primary_orange}
                  initialRegion={{
                    // latitude: 43.252590567138085,
                    latitude: longitude,
                    // longitude: -79.86988256242857
                    longitude: lattitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    onPress={() => {
                      // console.log('1',);
                    }}
                    resizeMode="contain"
                    // key={index}
                    coordinate={{ latitude: longitude, longitude: lattitude }}
                    // title={data.title}
                  >
                    <View
                      style={{
                        height: 70,
                        width: 60,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        style={{
                          height: 45,
                          width: 35,
                          tintColor: color._primary_orange,
                        }}
                        source={require("../../../assets/images/Location.png")}
                      />
                    </View>
                  </Marker>
                </MapView>
              </View>
              {/* <Image
              source={require("../../../assets/images/Map.png")}
              style={{
                height: 241,
                width: "100%",
                resizeMode: "contain",
                marginTop: 11,
                marginBottom: 23,
              }}
            /> */}
              {/* <View>
                  <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                      // latitude: Number(businessDetails.lat),
                      // longitude: Number(businessDetails.long),
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    <Marker
                      // coordinate={{ latitude: 31.4684649, longitude: 76.2708152 }}
                      coordinate={{
                        // latitude: Number(businessDetails.lat),
                        // longitude: Number(businessDetails.long),
                      }}
                    />
                  </MapView>
                </View> */}
              {result?.finePrint ? (
                <>
                  <Text style={styles.boldText}>Fine Print</Text>
                  <Text style={styles.lastText}>{result?.finePrint}</Text>
                </>
              ) : null}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.item,
            {
              borderRadius: 40,
              marginHorizontal: 15,
            },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.title, { textAlign: "center" }]}>
            {"SELECT DATE & TIME"}
          </Text>
        </TouchableOpacity>
        {/* <View style={{ marginHorizontal: 20 }}>
          <Atom.Button
            title={"ADD TO CART"}
            containerStyle={{
              marginTop: 18,
              marginBottom: 30,
            }}
          // onPress={() => { navigation.navigate("ReviewCart") }}

          />
        </View> */}
      </View>
      <Models.EmptyCartPopUp
        isVisible={emptyCart}
        onRequestClose={() => {
          setEmptyCart(!emptyCart);
        }}
      />
      <PopUp.SlideUpPopUp
        // isVisible={modalVisible}
        isVisible={modalVisible}
        typeOfVisit={result?.typeOfVisit}
        buttonText={"ADD TO CART"}
        setSelected={setSelectedDate}
        selected={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        setSelectedType={setSelectedType}
        selectedType={selectedType}
        onPress={() => {
          setModalVisible(!modalVisible), handleAddToCart();
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  favouriteRequest: (data) => dispatch(favouriteRequest(data)),
  addToCartRequest: (data, navigation) =>
    dispatch(addToCartRequest(data, navigation)),
  addToCartGuestRequest: (data, navigation) =>
    dispatch(addToCartGuestRequest(data, navigation)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  guestFavouriteRequest: (data) => dispatch(guestFavouriteRequest(data)),
  LearnremoveFavouriteRequest: (navigation) =>
    dispatch(LearnremoveFavouriteRequest(navigation)),
  LearnremoveGuestFavouriteRequest: (data) =>
    dispatch(LearnremoveGuestFavouriteRequest(data)),
  LearnfavouriteRequest: (data) => dispatch(LearnfavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetail);
