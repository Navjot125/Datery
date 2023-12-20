import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState } from "react";
import styles from "./HowToPlayStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Atom from "../../../Components/atoms";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import { API_URL } from "../../../Constants/Config";
import {
  playRequest,
  playfavouriteRequest, 
  playguestFavouriteRequest,
} from "../../../modules/play/actions";
import {
  CartListRequest,
  addToCartGuestRequest,
  addToCartRequest,
} from "../../../modules/Cart/actions";
import { showAlertError, showAlertSuccess } from "../../../Common/Functions/CommonFunctions";
import CustomIcon from "../../../assets/CustomIcon";
import Images from "../../../assets/Images";
import { LearnfavouriteListRequest, LearnfavouriteRequest, LearnremoveFavouriteRequest, LearnremoveGuestFavouriteRequest } from "../../../modules/learn/actions";

const HowToPlay = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // console.log(props.route.params.item, "HHHHOOOOOWWW")
  const [dataa, setDataa] = useState([props.route.params.item]);
  const role = props.state.roleReducer.role.id;
  // const dataa = props.state.learnReducer.details
  const [result, setResults] = useState(props.route.params.item); 
  const [isFavorite, setIsFavorite] = useState(props.route.params.item?.isFavorite);
  
  const onLoad = async () => {
    let apiData = {
      endpoint: API_URL.fetchAllGame,
      userToken: props?.state?.loginReducer?.userToken ? props?.state?.loginReducer?.userToken :
        props.state?.signupReducer?.signupSucessData?.Usertoken,
      id: {
        userId: props.state.loginReducer?.loginData._id ? props.state.loginReducer?.loginData._id :
          props.state?.signupReducer?.signupSucessData?.UserData?._id
      },
    };
    dispatch(playRequest(apiData))  
    console.log("APPPPPPPP-----", apiData)
  }
  const showList = ({ item }) => {
    // { console.log(item, "IIIIIIII"); }
    return (
      // <ScrollView>
      <View style={styles.card}>
        <Image
          source={{ uri: `http://54.92.82.16:3001/data/${item?.file[0]}` }}
          style={{ height: 196, width: "100%", borderRadius: 12 }}
        />
        <Text
          style={[
            styles.textTitle,
            { color: color._font_grey, opacity: 0.5, marginTop: 5 },
          ]}
        >
          {item.category}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "2%",
          }}
        >
          <Text style={styles.textTitle}>{item.gameTitle}</Text>
          <Image
            source={Images.pepperImage}
            style={{
              height: 15,
              width: 15,
              left: 5,
              tintColor: color._primary_orange,
            }}
          />
          <Image
            source={Images.pepperImage}
            style={{
              height: 15,
              width: 15,
              left: 5,
              tintColor: color._primary_orange,
            }}
          />
        </View>
        <View style={styles.newMain}>
          {item.labels &&
            Array.isArray(item.labels) &&
            item.labels.map((items) => (
              <View style={styles.newMain}>
                <View style={styles.newWrp}>
                  <Text style={styles.newWrpTxt}>{items}</Text>
                </View>
              </View>
            ))}
        </View>
        {/* <Text style={styles.textTitle}>{item.gameTitle}</Text> */}
        <Text style={styles.textContent}>{item.gameDescription}</Text>
        <Text style={styles.ruleHeading}>{"HowToPlay"}</Text>
        <Text style={styles.ruleContent}>{item.HowToPlay}</Text>
      </View>
      // </ScrollView>
    );
  };
  function existingFavourite(id) {
    const exist = props.state.playReducer.favouritesGuest.find(
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
            height: 20,
            width: 20,
            resizeMode: "cover",
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
            console.log('yes is favorite');
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
              console.log('role is 2');
              await props.LearnfavouriteRequest(param);
              setIsFavorite(!isFavorite)
              // showAlertSuccess(`Item added to your favourite list`);
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
            height: 20,
            width: 20,
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <CustomIcon
          type={"AntDesign"}
          name={"arrowleft"}
          size={24}
          style={{ flex: 1 }}
          color={color._black}
          onPress={() => {
            navigation.goBack();
          }}
        />
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: '700', lineHeight: 21, fontFamily: fonts.BOLD, color: color._black }}>
            Instructions
          </Text>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "flex-end",
            gap: 15,
          }}
        >
          {likeImage()}
          {centerImage()}
          {shareImage()}
        </View>
      </View>
      <View style={styles.mainView}>
        <FlatList
          data={dataa}
          keyExtractor={(item) => item._id}
          renderItem={showList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: "50%" }}
          key={">"}
        />

        <Atom.Button
          title={"LET’S PLAY"}
          containerStyle={{ marginBottom: 10 }}
          onPress={() =>
            navigation.navigate("Game", {
              questions: props.route.params.item,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  playfavouriteRequest: (data) => dispatch(playfavouriteRequest(data)),
  addToCartRequest: (data, navigation) =>
    dispatch(addToCartRequest(data, navigation)),
  addToCartGuestRequest: (data, navigation) =>
    dispatch(addToCartGuestRequest(data, navigation)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  playguestFavouriteRequest: (data) =>
    dispatch(playguestFavouriteRequest(data)),
    LearnremoveFavouriteRequest: (navigation) =>
      dispatch(LearnremoveFavouriteRequest(navigation)),
      LearnremoveGuestFavouriteRequest: (data) =>
        dispatch(LearnremoveGuestFavouriteRequest(data)),
  LearnfavouriteRequest: (data) => dispatch(LearnfavouriteRequest(data)),
  playRequest: (data) => dispatch(playRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HowToPlay);
