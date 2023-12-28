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
import styles from "./AdviceDetailStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
// import BackButton from '../../../components/BackButton';
import DropShadow from "react-native-drop-shadow";
import { connect, useDispatch } from "react-redux";
import { BackHeader } from "../../../Components/molecules";
import Images from "../../../assets/Images";
import { CartListRequest, addToCartGuestRequest, addToCartRequest } from "../../../modules/Cart/actions";
import { showAlertError, showAlertSuccess } from "../../../Common/Functions/CommonFunctions";
import { API_URL } from "../../../Constants/Config";
import { LearnfavouriteListRequest, LearnfavouriteRequest, LearnguestFavouriteRequest, LearnremoveFavouriteRequest, LearnremoveGuestFavouriteRequest } from "../../../modules/learn/actions";
import CustomIcon from "../../../assets/CustomIcon";
import Icon from 'react-native-vector-icons/AntDesign';
import Navigation from "../../../Navigation";
import { useNavigation } from "@react-navigation/native";
import { playRequest } from "../../../modules/play/actions";
const AdviceDetail = (props) => {

  const navigation = useNavigation()
  // console.log("PROSSSSS++++", props.route.params);
  const role = props.state.roleReducer.role.id
  const dataa = props.state.learnReducer.details
  const [result, setResults] = useState(props.route.params);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValueName, setSelectedValueName] = useState();
  const [selectedValuePrice, setSelectedValuePrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState();
  const [emptyCart, setEmptyCart] = useState(false);
  const [valueDropdown, setValueDropdown] = useState(null);
  const [listData, setListData] = useState([props.route.params])
  const [imgChng, setImgChng] = useState('false')
  const [isFavorite, setIsFavorite] = useState(props.route?.params?.isFavorite);
  dispatch = useDispatch()
console.log('----------------------result',result);
  const likeImage = () => {
    return (
      <CustomIcon
        type={'FontAwesome'}
        name={!imgChng ? 'thumbs-up' : 'thumbs-o-up'}
        size={20}
        color={!imgChng ? color._primary_orange : color._black}
        onPress={() => {
          setImgChng(!imgChng)
        }}
      />
      // <TouchableOpacity
      //   activeOpacity={0.9}

      // // style = {{backgroundColor:'red'}}
      // // onPress={async () => {
      // //   let param = {
      // //     endpoint: API_URL.favoritiesInsert,
      // //     id: {
      // //       userId: props.state?.loginReducer?.loginData?._id ? props.state?.loginReducer?.loginData?._id :
      // //         props.state?.signupReducer?.signupSucessData?.UserData?._id,
      // //       serviceId: result?._id
      // //     },
      // //   }
      // //   // console.log(JSON.stringify(result, null, 2), "PARARARAR")

      // //   if (role == 2 && !existingFavourite(result?._id)) {
      // //     await props.LearnfavouriteRequest(param)
      // //     // console.log("LearnApi", res)
      // //     // showAlertSuccess(`Item added to your favourite list`)
      // //   }
      // //   else if (existingFavourite(result?._id)) {
      // //     showAlertError(`Item already exist in your favourite list`)
      // //   } else
      // //     showAlertError(`Please login to add favourites`)
      // // }}
      // >
      //   <Image
      //     style={{ height: 16, width: 16, resizeMode: "contain", tintColor: color._black }}
      //     source={require("../../../assets/images/Like.png")}
      //   />
      // </TouchableOpacity>
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
      setIsFavorite(!isFavorite)
    showAlertSuccess(`Item removed from your favourite list`);
    setTimeout(() => {
      handleFavListing();
    }, 250);
    // console.log('sfsf',id);
  };

  const onLoad = async () => {
    let apiData = {
      endpoint: API_URL.fetchAllLearn,
      userToken: props?.state?.loginReducer?.userToken ? props?.state?.loginReducer?.userToken :
        props.state?.signupReducer?.signupSucessData?.Usertoken,
      id: {
        userId: props.state.loginReducer?.loginData._id ? props.state.loginReducer?.loginData._id :
          props.state?.signupReducer?.signupSucessData?.UserData?._id
      },
    };
    dispatch(playRequest(apiData))  
    console.log("APPPPPPPP2-----", apiData)
  }

  const centerImage = () => {
    return (
      <CustomIcon
        type={"Entypo"}
        name={isFavorite ? "heart" : "heart-outlined"}
        size={25}
        color={isFavorite ? color._primary_orange : null}
        onPress={async () => {
          if (!isFavorite) {
            onLoad()
            console.log('yes is favorite 2');
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
              console.log('role is 2 2');
              await props.LearnfavouriteRequest(param);
              setIsFavorite(!isFavorite)
            } else if (existingFavourite(result?._id)) {
              showAlertError(`Item already exist in your favourite list`);
            } else showAlertError(`Please login to add favourites`);
          } else {
            onLoad(),
            console.log('not in favorite'),
            handleDelete(result?._id);
          }
        }}
      />
    );
    // return (
    //   // <TouchableOpacity
    //   //   activeOpacity={0.9}
    //   // // style = {{backgroundColor:'red'}}
    //   // >
    //   <CustomIcon
    //     type={'Entypo'}
    //     name={!existingFavourite(result?._id) ? 'heart' : 'heart-outlined'}
    //     size={25}
    //     color={!existingFavourite(result?._id) ? color._primary_orange : null}
    //     onPress={async () => {
    //       let param = {
    //         endpoint: API_URL.favoritiesInsert,
    //         id: {
    //           userId: props.state?.loginReducer?.loginData?._id ? props.state?.loginReducer?.loginData?._id :
    //             props.state?.signupReducer?.signupSucessData?.UserData?._id,
    //           serviceId: result?._id
    //         },
    //       }
    //       // console.log(JSON.stringify(result, null, 2), "PARARARAR")

    //       if (role == 2 && !existingFavourite(result?._id)) {
    //         await props.LearnfavouriteRequest(param)
    //         // console.log("LearnApi", res)
    //         // showAlertSuccess(`Item added to your favourite list`)
    //       }
    //       else if (existingFavourite(result?._id)) {
    //         showAlertError(`Item already exist in your favourite list`)
    //       } else
    //         showAlertError(`Please login to add favourites`)
    //     }}
    //   />
    //   /* <Image
    //     style={{ height: 16, width: 16, resizeMode: "contain", tintColor: color._black, padding: 10 }}
    //     source={require("../../../assets/images/WhiteHeart.png")}
    //   /> */
    //   // </TouchableOpacity>
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
          style={{ height: 16, width: 16, resizeMode: "contain", tintColor: color._black }}
          source={require("../../../assets/images/Share.png")}
        />
      </TouchableOpacity>
    );
  };

  function existingFavourite(id) {
    const exist = role === 1 ? props.state.learnReducer.favourites.find(item => item.serviceId === id) : props.state.learnReducer.favouritesGuest.find(item => item.serviceId === id)
    return exist ? true : false;
  }
  function getLabelById(id) {
    const radioButton = result.radioButtonsData.find(item => item._id === id);
    return radioButton ? radioButton.label : null;
  }

  function getPriceById(id) {
    const radioButton = result.radioButtonsData.find(item => item._id === id);
    return radioButton ? radioButton.price : null;
  }


  const showData = ({ item }) => {
    const formatDate = (isoDateString) => {
      const createdAtDate = new Date(isoDateString);
      return `${createdAtDate.toDateString()}`;
    };
    return (
      <View
        style={{
          marginTop: 11.9,
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: `http://54.92.82.16:3001/data/${item?.file}` }}
          style={{ height: 196, width: "100%", borderRadius: 12 }}
        />
        <Text style={styles.mainHeading}>{item.learnTitle}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textStyle}>
            {item.coachName} {"|"}
          </Text>
          <Text style={styles.textStyle}>
            {" "}
            {formatDate(item.createdAt)} {"|"}
          </Text>
          <Text style={styles.textStyle}> {item.learnTime} </Text>
        </View>
        <View
          style={{
            borderRadius: 50,
            marginTop: 10,
            backgroundColor: color._primary_orange,
            alignSelf: "flex-start",
          }}
        >
        </View>
        <Text
          style={{
            color: color._black,
            marginVertical: 24,
            fontFamily: fonts.REGULAR,
            fontSize: 14,
          }}
        >
          {item.learnDescription}{" "}
        </Text>

        {/* <DropShadow style={styles.shadowProp}>
          <View style={[styles.card]}>
            {/* <View
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
                {/* <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontFamily: fonts.BOLD,
                      fontSize: 20,
                      color: color._black,
                    }}
                  >
                    {"Jane Smith"}
                  </Text>
                  {/* <View
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
                  </View> */}
        {/* </View>  */}

        {/* <Text
                  style={{
                    fontFamily: fonts.REGULAR,
                    fontSize: 10,
                    color: color._black,
                  }}
                >
                  {"Jane graduated with a B.S. in Psychology from the University of Louisiana State Universtiy. She has experience in blank. She is a freelance writer and writes stories on her free time. "}
                </Text>

              </View>
            </View> */}
        {/* </View>
        </DropShadow>  */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 10, alignItems: 'center' }}>
        <CustomIcon
          type={'AntDesign'}
          name={'arrowleft'}
          size={24}
          color={color._black}
          onPress={() => { navigation.goBack() }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flex: 0.35 }}>
          {likeImage()}
          {centerImage()}
          {shareImage()}
        </View>
      </View>
      <View style={styles.mainView}>
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id}
          renderItem={showData}
          // scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  LearnfavouriteRequest: (data) => dispatch(LearnfavouriteRequest(data)),
  addToCartRequest: (data, navigation) => dispatch(addToCartRequest(data, navigation)),
  addToCartGuestRequest: (data, navigation) => dispatch(addToCartGuestRequest(data, navigation)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  LearnguestFavouriteRequest: (data) => dispatch(LearnguestFavouriteRequest(data)),
  LearnremoveFavouriteRequest: (navigation) =>
    dispatch(LearnremoveFavouriteRequest(navigation)),
    LearnremoveGuestFavouriteRequest: (data) =>
      dispatch(LearnremoveGuestFavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdviceDetail);
