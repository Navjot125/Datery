import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState } from "react";
import styles from "./CoachDetailStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Web from "react-native-vector-icons/MaterialCommunityIcons";
import Instagram from "react-native-vector-icons";
import Twitter from "react-native-vector-icons/AntDesign";
// import BackButton from "../../../components/BackButton";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import * as Atoms from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LocationIcon from "react-native-vector-icons/Entypo";
import Images from "../../../assets/Images";
import {
  showAlertError,
  showAlertSuccess,
} from "../../../Common/Functions/CommonFunctions";
import {
  favouriteRequest,
  guestFavouriteRequest,
} from "../../../modules/Merchants/actions";
import {
  CartListRequest,
  addToCartGuestRequest,
  addToCartRequest,
} from "../../../modules/Cart/actions";
import { API_URL } from "../../../Constants/Config";
import {
  LearnfavouriteListRequest,
  LearnfavouriteRequest,
  LearnguestFavouriteRequest,
  LearnremoveFavouriteRequest,
  LearnremoveGuestFavouriteRequest,
} from "../../../modules/learn/actions";
import CustomIcon from "../../../assets/CustomIcon";
import { playRequest } from "../../../modules/play/actions";

const CoachDetail = (props) => {
  dispatch = useDispatch();
  const navigation = useNavigation();
  const [listData, setListData] = useState([props.route.params]);
  const role = props.state.roleReducer.role.id;
  const dataa = props.state.learnReducer.details;
  const [result, setResults] = useState(props.route.params);
  const [isFavorite, setIsFavorite] = useState(props.route?.params?.isFavorite);

  const showData = ({ item, index }) => {
    const Item = item?.item !== undefined ? item?.item : item;
    return (
      <View
        key={index}
        style={{
          marginTop: 11.9,
          marginHorizontal: 20,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // paddingLeft: 20,
          }}
        >
          <Image
            source={{ uri: `http://54.92.82.16:3001/data/${Item?.coachPic}` }}
            style={{ height: 72, width: 72, borderRadius: 100 }}
          />
          <View
            style={{
              flex: 1,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                paddingRight: 5,
                marginBottom: 11,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.BOLD,
                  fontSize: 20,
                  color: color._black,
                }}
              >
                {/* {" "} */}
                {Item.coachName}{" "}
              </Text>
              {/* <TouchableOpacity
                activeOpacity={0.9}
              >
                <Web
                  name="web"
                  size={18}
                  color={"#000000"}
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                activeOpacity={0.9}
              >
                <Web
                  name="instagram"
                  size={18}
                  color={"#000000"}
                  style={{ marginLeft: 11 }}
                />
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                activeOpacity={0.9}
              >
                <Web
                  name="twitter"
                  size={18}
                  color={"#000000"}
                  style={{ marginLeft: 11 }}
                />
              </TouchableOpacity> */}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: fonts.MEDIUM,
                  fontSize: 10,
                  color: color._black,
                  lineHeight: 15,
                }}
              >
                <LocationIcon
                  name="location-pin"
                  size={15}
                  color={color._primary_orange}
                />{" "}
                {Item.coachAddress}
              </Text>
              <Image
                style={{ height: 13, width: 13, marginLeft: 5, marginTop: 2 }}
                resizeMode="center"
                source={require("../../../assets/images/Video.png")}
              />
              <Text
                style={{
                  fontFamily: fonts.MEDIUM,
                  fontSize: 11,
                  color: color._black,
                  lineHeight: 15,
                  marginLeft: 5,
                }}
              >
                {Item.coachAvailability}
              </Text>
            </View>
            <Text
              style={{
                marginTop: 3,
                fontFamily: fonts.SEMI_BOLD,
                fontSize: 11,
                color: color._border_orange,
                lineHeight: 15,
              }}
            >
              {/* {" "} */}
              {Item.coachApproach}
            </Text>
          </View>
        </View>
        {/* {showTags()} */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              marginHorizontal: 4,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View
              style={{
                // marginHorizontal: 4,
                backgroundColor: color._primary_orange,
                padding: 10,
                borderRadius: 20,
                marginTop: 10,
                paddingHorizontal: 20,
                right: 10,
              }}
            >
              <Text
                style={{
                  color: color._white,
                  fontFamily: fonts.BOLD,
                  fontSize: 12,
                }}
              >
                {Item?.coachLabel?.[0]}
              </Text>
            </View>
            <View
              style={{
                // marginHorizontal: 4,
                backgroundColor: color._primary_orange,
                padding: 10,
                borderRadius: 20,
                marginTop: 10,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: color._white,
                  fontFamily: fonts.BOLD,
                  fontSize: 12,
                }}
              >
                {Item?.coachLabel?.[1]}
              </Text>
            </View>
            <View
              style={{
                // marginHorizontal: 4,
                backgroundColor: color._primary_orange,
                padding: 10,
                borderRadius: 20,
                marginTop: 10,
                paddingHorizontal: 20,
                left: 10,
              }}
            >
              <Text
                style={{
                  color: color._white,
                  fontFamily: fonts.BOLD,
                  fontSize: 12,
                }}
              >
                {Item?.coachLabel?.[2]}
              </Text>
            </View>
          </View>

          {/* {
            listData.map((data, index) => (
              
              // <View>
              //   <Text>{data}</Text>
              // </View>
            ))
          } */}
        </View>
        <Text
          style={{
            color: color._black,
            marginVertical: 24,
            fontFamily: fonts.REGULAR,
            fontSize: 14,
            lineHeight: 24,
          }}
        >
          {Item.coachDescription}{" "}
        </Text>

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
                source={{ uri: `http://54.92.82.16:3001/data/${item?.coachPic}` }}
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
                    {item.coachName}
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
    );
  };

  const middleImage = () => {
    return (
      <Image
        style={{ height: 38, width: 48.3 }}
        source={require("../../../assets/images/orange_hearts.png")}
      />
    );
  };

  // const centerImage = () => {
  //   return (
  //     <TouchableOpacity
  //       // style = {{backgroundColor:'red'}}
  //       onPress={() => {
  //         let param = {
  //           endpoint: API_URL.favoritiesInsert,
  //           id: {
  //             userId: props.state?.loginReducer?.loginData?._id ? props.state?.loginReducer?.loginData?._id :
  //               props.state?.signupReducer?.signupSucessData?.UserData?._id,
  //             serviceId: props.state?.merchantReducer?.details?._id
  //           },
  //         }
  //         console.log(param, "PARARARAR")

  //         let data = {
  //           averageRating: result?.averageRating,
  //           price: result?.radioButtonsData[0]?.price,
  //           providerName: result?.title,
  //           providerfile: result?.image,
  //           providerlocationAddress: result?.address,
  //           ratingCount: result?.ratingCount,
  //           serviceId: result?._id,
  //         }
  //         props.state.roleReducer.role.id == 2 ?
  //           props.favouriteRequest(param)
  //           // : showAlert(`Please login as a user`, 4000)
  //           :
  //           !existingFavourite(result?._id) ?
  //             (props.guestFavouriteRequest(data), data ? showAlertSuccess(`Item added to your favourite list`) : null)
  //             : showAlertError(`Item already exist in your favourite list`)
  //       }}
  //     >
  //       <Image
  //         style={{ height: 21, width: 25, resizeMode: "contain", marginRight: 10, tintColor: color._primary_orange }}
  //         source={require("../../../assets/images/WhiteHeart.png")}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  const likeImage = () => {
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
          source={require("../../../assets/images/Like.png")}
        />
      </TouchableOpacity>
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
    dispatch(playRequest(apiData));
    // console.log("APPPPPPPP2-----", apiData)
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
    // return (
    //   <TouchableOpacity
    //     activeOpacity={0.9}

    //     // style = {{backgroundColor:'red'}}
    //     onPress={async () => {
    //       // console.log(result?._id,'serviceID')
    //       let param = {
    //         endpoint: API_URL.favoritiesInsert,
    //         id: {
    //           userId: props.state?.loginReducer?.loginData?._id ? props.state?.loginReducer?.loginData?._id :
    //             props.state?.signupReducer?.signupSucessData?.UserData?._id,
    //           serviceId: result?._id
    //         },
    //       }

    //       // let data = {
    //       //   ...result,
    //       //   averageRating: result?.averageRating,
    //       //   // price: result?.radioButtonsData[0]?.price,
    //       //   "coachId": result?.coachId,
    //       //   coachName: result?.coachName,
    //       //   "learnTitle": result?.learnTitle,
    //       //   "learnTime": result?.learnTime,
    //       //   image: result?.coachPic,
    //       //   serviceId: result?._id,
    //       // }
    //       if (role == 2 && !existingFavourite(result?._id)) {
    //         await props.LearnfavouriteRequest(param)
    //         // console.log("LearnApi",res)
    //         // showAlertSuccess(`Item added to your favourite list`)
    //       }
    //       else if (existingFavourite(result?._id)) {
    //         showAlertError(`Item already exist in your favourite list`)
    //       } else
    //         showAlertError(`Please login to add favourites`)

    //     }}
    //   >
    //     <Image
    //       style={{ height: 16, width: 16, resizeMode: "contain", tintColor: color._black }}
    //       source={require("../../../assets/images/WhiteHeart.png")}
    //     />
    //   </TouchableOpacity>
    // );
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

  function existingFavourite(id) {
    const exist = props.state.merchantReducer.favouritesGuest.find(
      (item) => item.serviceId === id
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
  const rightImage = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        // style = {{backgroundColor:'red'}}
        onPress={async () => {
          // console.log(result?._id,'serviceID')
          let param = {
            endpoint: API_URL.favoritiesInsert,
            id: {
              userId: props.state?.loginReducer?.loginData?._id
                ? props.state?.loginReducer?.loginData?._id
                : props.state?.signupReducer?.signupSucessData?.UserData?._id,
              serviceId: result?._id,
            },
          };

          // let data = {
          //   ...result,
          //   averageRating: result?.averageRating,
          //   // price: result?.radioButtonsData[0]?.price,
          //   "coachId": result?.coachId,
          //   coachName: result?.coachName,
          //   "learnTitle": result?.learnTitle,
          //   "learnTime": result?.learnTime,
          //   image: result?.coachPic,
          //   serviceId: result?._id,
          // }
          if (role == 2 && !existingFavourite(result?._id)) {
            await props.LearnfavouriteRequest(param);
            // console.log("LearnApi",res)
            // showAlertSuccess(`Item added to your favourite list`)
          } else if (existingFavourite(result?._id)) {
            showAlertError(`Item already exist in your favourite list`);
          } else showAlertError(`Please login to add favourites`);
        }}
      >
        <Image
          style={{
            height: 21,
            width: 25,
            resizeMode: "contain",
            marginRight: 10,
            tintColor: color._primary_orange,
          }}
          source={require("../../../assets/images/WhiteHeart.png")}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.scrollView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <CustomIcon
          type={"AntDesign"}
          name={"arrowleft"}
          size={24}
          color={color._black}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            flex: 0.35,
          }}
        >
          {centerImage()}
          {likeImage()}
          {shareImage()}
        </View>
      </View>

      <View style={styles.mainView}>
        {/* <BackHeader
          title={middleImage()}
          titleTxt={{ height: 50, width: 48.3 }}
          isRight
          rightContent={rightImage()}
        // rightStyl={{ height: 50, width: 50 }}
        /> */}

        {/* <ScrollView
          showsVerticalScrollIndicator={false}
        > */}
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id}
          renderItem={showData}
          // scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
        {/* </ScrollView> */}
        {/* <TouchableOpacity style={styles.bttnStyle}>
          <Text style={{ color: color._font_white, fontWeight: 'bold' }}>
            {"BOOK THIS COACH"}
          </Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity activeOpacity={0.9} style={styles.bttnStyle}>
        <Text style={{ color: color._font_white, fontWeight: "bold" }}>
          {"BOOK THIS COACH"}
        </Text>
      </TouchableOpacity>
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
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  LearnguestFavouriteRequest: (data) =>
    dispatch(LearnguestFavouriteRequest(data)),
  LearnremoveFavouriteRequest: (navigation) =>
    dispatch(LearnremoveFavouriteRequest(navigation)),
  LearnremoveGuestFavouriteRequest: (data) =>
    dispatch(LearnremoveGuestFavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoachDetail);
