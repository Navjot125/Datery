import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  InteractionManager,
  ActivityIndicator,
  Image,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import styles from "./PlayStyles";
import { Searchbar } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import { useNavigation } from "@react-navigation/native";
import All from "./All";
import { connect, useDispatch, useSelector } from "react-redux";
import CommonList from "../Home/CommonList";
import { API_URL } from "../../../Constants/Config";
import {
  playDetailsRequest,
  playRequest,
  playfavouriteListRequest,
} from "../../../modules/play/actions";
import { CartListRequest } from "../../../modules/Cart/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { roleRequest } from "../../../modules/Role/actions";
import { useFocusEffect } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

let page = 1;

const Play = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userCity =
    props?.state?.profileReducer?.datingData?.userProfile?.locationAddress;
  const [filter, setFilter] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState("1");
  const [selectedItem, setSelectedItem] = useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [loader, setLoader] = useState(true);
  const { userToken, loginData, loginDatingData } = useSelector(
    (state) => state.loginReducer
  );
  const loginCordinates = loginDatingData?.locationCordinates?.coordinates;
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );

  useFocusEffect(
    React.useCallback(() => {
      onLoad();
    }, [])
  );

  const onLoad = async () => {
    let apiData = {
      endpoint: API_URL.fetchAllGame,
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
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      onLoad();
    });
    let timeout = setTimeout(() => {
      setLoader(false);
    }, 3000);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    getSortRes(selectedItem, selectedItemIndex);
  }, [selectedItem, selectedItemIndex]);

  const getSortRes = (sortItem, cat) => {
    console.log(sortData[sortItem - 1]?.name, "sortItem", sortItem, "cat", cat);
    try {
      let params = {
        userToken: props?.state?.loginReducer?.userToken
          ? props?.state?.loginReducer?.userToken
          : props.state?.signupReducer?.signupSucessData?.Usertoken,
        endpoint: sortData[sortItem - 1]?.name
          ? cat == "1"
            ? `${`${API_URL?.fetchAllGame}`}?labels=${
                sortData[sortItem - 1]?.name
              }`
            : `${`${API_URL?.fetchAllGame}?category=${String(
                allData[cat - 1]?.title
              ).replace("&", "%26")}`}&labels=${sortData[sortItem - 1]?.name}`
          : `${
              cat == "1"
                ? API_URL.fetchAllGame
                : `${API_URL?.fetchAllGame}?category=${String(
                    allData[cat - 1]?.title
                  ).replace("&", "%26")}`
            }`,
      };
      // console.log("params-------------==", params);
      dispatch(playRequest(params));
      // console.log("PssP+++", params);
    } catch (error) {
      console.log(error, "error in getSortRes in play");
    }
  };

  const allData = [
    { id: "1", title: "All" },
    { id: "2", title: "Q&A" },
    { id: "3", title: "Physical" },
    { id: "4", title: "Solo" },
  ];

  const sortData = [
    { _id: 1, name: "Marriage" },
    { _id: 2, name: "Dating" },
    { _id: 3, name: "Support" },
    { _id: 4, name: "Love" },
    { _id: 5, name: "Conflict" },
  ];

  const renderAllItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            marginHorizontal: 20,
            borderBottomWidth: 2,
            borderBottomColor:
              selectedItemIndex === item.id ? color._primary_orange : "white",
          }}
          onPress={() => {
            setSelectedItemIndex(item.id);
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: selectedItemIndex === item.id ? color._black : "#1C1A17",
            }}
          >
            {item.title}
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderSortItem = ({ item, index }) => {
    return (
      <View
        style={{
          // marginHorizontal: 20,
          // marginBottom: 32,
          justifyContent: "center",
          alignItems: "center",
          // marginHorizontal: 5
          // marginRight:15
          // marginTop: 22,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            borderWidth: 2,
            backgroundColor: "#FFF",
            borderColor:
              selectedItem === index + 1 ? color._black : color._dusty_white,
            // height: 40,
            // paddingHorizontal: 26,
            // marginHorizontal: 30,
            paddingHorizontal: 10,
            paddingVertical: 9,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 8,
            backgroundColor:
              selectedItem === index + 1 ? color._black : "#FFFF",
          }}
          onPress={() => {
            selectedItem === item?._id
              ? setSelectedItem()
              : setSelectedItem(item._id);

            // props.setFilter(item.name), console.log('hello', item.name);
          }}
        >
          <Text
            style={{
              color: selectedItem === index + 1 ? "#FFFF" : color._black,
              fontFamily: fonts.MEDIUM,
              fontSize: 16,
              lineHeight: 18,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const endReached = () => {
    page += 1;
    let params = {
      endpoint: API_URL.fetchAllServices,
      coordinates: loginCordinates,
      // tempCords
      //   ? tempCords
      //   : null,
      gametype:
        allData.filter((val) => val.id === selectedItemIndex)[0].id == "2"
          ? "Dating"
          : allData.filter((val) => val.id === selectedItemIndex)[0].id == "3"
          ? "Relationship"
          : allData.filter((val) => val.id === selectedItemIndex)[0].id == "4"
          ? "Counsellors"
          : null,
      sortby: sortData[selectedItem - 1]?.name || "",
      offset: page,
    };
    dispatch(LearnAllRequest(params));
  };

  const search = () => {
    return (
      <View>
        <Searchbar
          placeholder="Games to play "
          placeholderTextColor={"grey"}
          fontSize={16}
          onChangeText={onChangeSearch}
          // value={searchQuery}
          iconColor={color._primary_orange}
          style={{
            backgroundColor: "#F8F7FA",
            height: 40,
            width: 316,
            borderRadius: 8,
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

  return (
    <SafeAreaView style={styles.scrollView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // justifyContent:'center',
          alignItems: "center",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <View>{search()}</View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("FavoritesGames");
          }}
        >
          <Image
            style={{
              height: 20,
              width: 22,
              resizeMode: "contain",
              tintColor: color._black,
            }}
            source={require("../../../assets/images/Heart.png")}
          />
        </TouchableOpacity>
      </View>
      <CommonList data={allData} renderItem={renderAllItem} />
      <View
        style={[
          styles.mainView,
          loader && {
            justifyContent: "center",
          },
        ]}
      >
        {loader ? (
          <ActivityIndicator color={color._primary_orange} size={"large"} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
            // contentContainerStyle={{marginHorizontal:20}}
          >
            <View
              style={{
                // flexDirection: "row",
                // marginTop: 8,
                // left:-10
                // backgroundColor: 'red',
                marginHorizontal: 12,
              }}
            >
              {/* <View style={{ justifyContent: "center", alignItems: 'center' }}>
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
                      style={{ width: 39, height: 39, resizeMode: 'center', tintColor: color._black }}
                    />
                  </TouchableOpacity>
                </View> */}

              {/* <View style={{ paddingRight: 20 }}> */}
              <CommonList data={sortData} renderItem={renderSortItem} />
              {/* </View> */}
            </View>

            {<All setFilter={setFilter} endReached={endReached} />}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) => dispatch(removeAnswer(data, navigation)),
  setLoader: (data) => dispatch(setLoader(data)),
  playRequest: (data) => dispatch(playRequest(data)),
  playDetailsRequest: (data, navigation) =>
    dispatch(playDetailsRequest(data, navigation)),
  playfavouriteListRequest: (data) => dispatch(playfavouriteListRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
