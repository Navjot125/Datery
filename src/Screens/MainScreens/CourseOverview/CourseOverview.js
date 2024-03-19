import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Pressable,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import styles from "./CourseOverviewStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import IconHeart from "react-native-vector-icons/Entypo";
import IconLike from "react-native-vector-icons/Feather";
import IconShare from "react-native-vector-icons/MaterialCommunityIcons";

import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { ListItem, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import * as Atom from "../../../Components/atoms";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
// import video from "../../../assets/images/DummyVideo.mp4";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import OverViewTab from "../OverViewTab";
import ReviewTab from "../ReviewTab";
import Images from "../../../assets/Images";
import { API_URL } from "../../../Constants/Config";
import {
  LearnAllRequest,
  LearnfavouriteListRequest,
  LearnfavouriteRequest,
  LearnguestFavouriteRequest,
  LearnremoveFavouriteRequest,
  LearnremoveGuestFavouriteRequest,
} from "../../../modules/learn/actions";
import {
  CartListRequest,
  addToCartGuestRequest,
  addToCartRequest,
} from "../../../modules/Cart/actions";
import CustomIcon from "../../../assets/CustomIcon";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../Common/Functions/CommonFunctions";
const data = [
  {
    id: 1,
    title: "Dating 101",
    rating: "4.0",
    ratingCount: 6255,
  },
];
const CourseOverview = (props) => {
  // console.log('props.route?.params',props.route?.params);
  const [listData, setListData] = useState([
    props.route.params?.item ? props.route.params?.item : props.route.params,
  ]);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(false);
  // const videoPlayer = React.createRef();
  const navigation = useNavigation();
  // const videoPlayer = React.useRef();
  const [controlsVisible, setControlsVisible] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const role = props.state.roleReducer.role.id;
  const [result, setResult] = useState(props.route?.params);
  const [isFavorite, setIsFavorite] = useState(props.route?.params?.isFavorite);

  const dispatch = useDispatch();
  const [reviews, setReviews] = useState(
    props.route?.params?.reviews?.[0]?.reviews || []
  );

  // const FirstRoute = () => <OverViewTab descrip={props.route.params.item} />;

  // const SecondRoute = () => <ReviewTab listData={reviews} setListData={setReviews} dReview={props.route.params.item} />;

  // const renderScene = SceneMap({
  //   // first: FirstRoute,
  //   second: SecondRoute,
  // });
  // const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "OverView" },
    { key: "second", title: "Reviews" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      inactiveColor="#000"
      activeColor="#000"
      // style={{
      //   elevation: 0,
      // }}
      indicatorStyle={{ backgroundColor: color._border_orange, height: 2 }}
      // tabStyle={{
      //   backgroundColor: color._white,
      //   elevation: 0,
      //   shadowOpacity: 0,
      // }}
      style={{
        elevation: 0,
        marginTop: 10,
        backgroundColor: color._white,
      }}
      tabStyle={{
        elevation: 0,
        shadowOpacity: 0,
      }}
      labelStyle={{
        textTransform: "capitalize",
        fontFamily: fonts.BOLD,
        fontSize: 18,
      }}
      {...props}
    />
  );

  const [imgChng, setImgChng] = useState("false");

  const formatDate = (isoDateString) => {
    const createdAtDate = new Date(isoDateString);
    return `${createdAtDate.toDateString()}`;
  };

  function existingFavourite(id) {
    const exist = props.state.learnReducer.favouritesGuest.find(
      (item) => item?.serviceId === id
    );
    return exist ? true : false;
  }
  function getLabelById(id) {
    const radioButton = result.radioButtonsData.find((item) => item._id === id);
    return radioButton ? radioButton.label : null;
  }

  function getPriceById(id) {
    const radioButton = result.radioButtonsData.find((item) => item._id === id);
    return radioButton ? radioButton.price : null;
  }

  const likeImage = () => {
    return (
      <CustomIcon
        type={"FontAwesome"}
        name={!imgChng ? "thumbs-up" : "thumbs-o-up"}
        size={20}
        color={!imgChng ? color._primary_orange : color._black}
        onPress={() => {
          setImgChng(!imgChng);
        }}
      />
    );
  };

  const handleFavListing = () => {
    dispatch(
      LearnfavouriteListRequest({
        endpoint: API_URL.fetchFavoriteLearn,
        userId: props.state.loginReducer.loginData._id,
      })
    );
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
    // console.log('sfsf',id);
  };

  const onLoad = async () => {
    let apiData = {
      endpoint: API_URL.fetchAllLearn,
      userToken: props?.state?.loginReducer?.userToken
        ? props?.state?.loginReducer?.userToken
        : props.state?.signupReducer?.signupSucessData?.Usertoken,
      id: {
        userId: props.state.loginReducer?.loginData._id
          ? props.state.loginReducer?.loginData._id
          : props.state?.signupReducer?.signupSucessData?.UserData?._id,
      },
    };
    dispatch(LearnAllRequest(apiData));
  };
  const centerImage = () => {
    return (
      <CustomIcon
        type={"Entypo"}
        name={isFavorite ? "heart" : "heart-outlined"}
        size={25}
        color={isFavorite ? color._primary_orange : null}
        onPress={async () => {
          if (!isFavorite) {
            onLoad();
            console.log("yes is favorite 2");
            let param = {
              endpoint: API_URL.favoritiesInsert,
              id: {
                userId: props.state?.loginReducer?.loginData?._id
                  ? props.state?.loginReducer?.loginData?._id
                  : props.state?.signupReducer?.signupSucessData?.UserData?._id,
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
            onLoad(), console.log("not in favorite"), handleDelete(result?._id);
          }
        }}
      />
    );
  };
  const shareImage = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}

        // style = {{backgroundColor:'red'}}
        // onPress={async () => {
        //   let param = {
        //     endpoint: API_URL.favoritiesInsert,
        //     id: {
        //       userId: props.state?.loginReducer?.loginData?._id ? props.state?.loginReducer?.loginData?._id :
        //         props.state?.signupReducer?.signupSucessData?.UserData?._id,
        //       serviceId: result?._id
        //     },
        //   }
        //   // console.log(JSON.stringify(result, null, 2), "PARARARAR")

        //   if (role == 2 && !existingFavourite(result?._id)) {
        //     await props.LearnfavouriteRequest(param)
        //     // console.log("LearnApi", res)
        //     // showAlertSuccess(`Item added to your favourite list`)
        //   }
        //   else if (existingFavourite(result?._id)) {
        //     showAlertError(`Item already exist in your favourite list`)
        //   } else
        //     showAlertError(`Please login to add favourites`)
        // }}
      >
        <Image
          style={{
            height: 16,
            width: 16,
            resizeMode: "contain",
            tintColor: color._black,
          }}
          source={require("../../../assets/images/Share.png")}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <FlatList
        data={[0]}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={() => {
          return (
            <View style={{ flex: 1 }}>
              {/* <ScrollView> */}
              <VideoPlayer
                source={{
                  uri: `http://54.92.82.16:3001/data/${listData?.[0]?.file[0]}`,
                }}
                // Can be a URL or a local file.
                disableBack
                disableVolume
                tapAnywhereToPause={true}
                style={{ height: 250, width: "100%" }}
                // doubleTapTime={1300}
                // disableFullscreen
                // onEnterFullscreen={true}
              />
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  height: 30,
                  width: "100%",
                  top: -3,
                }}
              >
                <BackHeader
                  colors={"white"}
                  // isRight
                  rightStyl={{ height: 15.4, width: 19.8, right: 10 }}
                  // rightContent={rightImage()}
                />
              </View>
              <View style={styles.mainView}>
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 20 }}>
                  <Text
                    style={{
                      fontFamily: fonts.BOLD,
                      color: "#261E27",
                      fontSize: 15,
                    }}
                  >
                    {listData && listData[0].coachName}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textNew}>
                        {listData && listData[0].coachName} {"|"}
                      </Text>
                      <Text style={styles.textNew}>
                        {" "}
                        {formatDate(listData[0].createdAt)} {"|"}
                      </Text>
                      <Text style={styles.textNew}>
                        {" "}
                        5 min
                        {/* {listData[0].learnTime} */}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        flex: 0.8,
                      }}
                    >
                      {likeImage()}
                      {centerImage()}
                      {shareImage()}
                    </View>
                  </View>

                  <Text
                    style={{
                      fontFamily: fonts.BOLD,
                      color: color._black,
                      fontSize: 18,
                      marginTop: 20,
                    }}
                  >
                    Overview
                  </Text>
                  <Text style={[styles.text2, { marginTop: 10 }]}>
                    {" "}
                    {listData[0].learnDescription}
                  </Text>
                  {/* <ReviewTab
                    listData={reviews}
                    setListData={setReviews}
                    dReview={props.route.params.item}
                  /> */}
                  {/* <View style={{ flexDirection: "row", paddingTop: 13 }}>
                    <Text
                      style={{
                        fontFamily: fonts.REGULAR,
                        color: color._black,
                        opacity: 0.5,
                        fontSize: 12,
                      }}
                    >
                      {listData && listData[0].reviews[0]?.averageRating}
                    </Text>
                    {/* <Atom.Rating
                      currentRating={Math.round(listData && listData[0].reviews[0]?.averageRating)}
                      titleStyle={{ paddingLeft: 3 }}
                    /> */}
                  {/* <Text
                      style={{
                        fontFamily: fonts.REGULAR,
                        color: "#000000",
                        opacity: 0.5,
                        fontSize: 12,
                      }}
                    >
                      ({listData && listData[0].reviews[0]?.ratingCount})
                    </Text>
                  </View>  */}

                  {/* <DropShadow style={styles.shadowProp}>
                    <View style={[styles.card]}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          // paddingLeft: 20,
                        }}
                      >
                        <Image
                          source={Images.janeImage}
                          style={{ height: 72, width: 72, borderRadius: 100 }}
                        />
                        <View
                          style={{
                            flex: 1,
                            padding: 15,
                          }}
                        >
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={{
                                fontFamily: fonts.BOLD,
                                fontSize: 20,
                                color: color._black,
                              }}
                            >
                              {'Jane Smith'}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                padding: 5,
                              }}
                            >
                              <TouchableOpacity
                                activeOpacity={0.9}

                              >
                                <Image
                                  source={require("../../../assets/images/web.png")}
                                  style={{ height: 20, width: 20, marginLeft: 0, tintColor: 'black' }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                activeOpacity={0.9}

                              >

                                <Image
                                  source={require("../../../assets/images/instagram.png")}
                                  style={{ height: 20, width: 20, marginLeft: 11, tintColor: 'black' }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                activeOpacity={0.9}

                              >
                                <Image
                                  source={require("../../../assets/images/twitter.png")}
                                  style={{ height: 20, width: 20, marginLeft: 11, tintColor: 'black' }}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>

                          <Text
                            style={{
                              fontFamily: fonts.REGULAR,
                              fontSize: 10,
                              color: color._black,
                            }}
                          >
                            {"Jane graduated with a B.S. in Psychology from the University of Louisiana State Universtiy. She has experience in blank. She is a freelance writer and writes stories on her free time. "}
                          </Text>

                        </View>
                      </View>
                    </View>
                  </DropShadow> */}
                </View>
              </View>
              {/* </ScrollView> */}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  LearnfavouriteRequest: (data) => dispatch(LearnfavouriteRequest(data)),
  addToCartRequest: (data, navigation) =>
    dispatch(addToCartRequest(data, navigation)),
  addToCartGuestRequest: (data, navigation) =>
    dispatch(addToCartGuestRequest(data, navigation)),
  LearnremoveGuestFavouriteRequest: (data) =>
    dispatch(LearnremoveGuestFavouriteRequest(data)),
  LearnremoveFavouriteRequest: (navigation) =>
    dispatch(LearnremoveFavouriteRequest(navigation)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  LearnguestFavouriteRequest: (data) =>
    dispatch(LearnguestFavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseOverview);
