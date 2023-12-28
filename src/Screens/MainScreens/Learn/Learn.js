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
  InteractionManager,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./HomeStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import AllLearn from "./AllLearn";
import { connect, useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CommonList from "../Home/CommonList";
import { API_URL } from "../../../Constants/Config";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import { CartListRequest } from "../../../modules/Cart/actions";
import {
  LearnAllDetailsRequest,
  LearnAllRequest,
  LearnfavouriteListRequest,
} from "../../../modules/learn/actions";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { roleRequest } from "../../../modules/Role/actions";

let page = 1;

const Learn = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  const role = props.state.roleReducer.role.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(false);
  const [geoCityName, setGeoCityName] = useState("");
  const [geoCityShortName, setGeoCityShortName] = useState("");
  // let [text, setText] = useState('');
  const [text, setText] = useState("");
  let [loc, setLoc] = useState("");
  // const [result, setResult] = useState(data[0]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [selectedItemIndex, setSelectedItemIndex] = useState("1");
  const [selectedItem, setSelectedItem] = useState(null);
  const [index, setIndex] = React.useState(0);
  const [loader, setLoader] = useState(true);
  const isFocused = useIsFocused();
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );

  const onLoad = async () => {
    // getCurrentCity()
    const token = userToken ? userToken : Usertoken;
    let apiData = {
      endpoint: API_URL.fetchAllLearn,
      token,
      id: {
        userId: props.state.loginReducer?.loginData._id
          ? props.state.loginReducer?.loginData._id
          : props.state?.signupReducer?.signupSucessData?.UserData?._id,
      },
      // navigation.navigate("DatingProfile"),
    };
    // console.log("HHHHH___test", apiData, role, "RIIIIIII")
    dispatch(LearnAllRequest(apiData));
    // role == 2 ?
    //   props.LearnAllRequest(apiData) : null
    // props.setLoader(false);
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
  }, [isFocused]);

  const getApiRes = (item) => {
    // console.log('ITTTTTT', item)
    const token = userToken ? userToken : Usertoken;

    let params = {
      endpoint: API_URL.fetchAllLearn,
      token,
      // coordinates: tempCords ? tempCords : userCords[0] !== undefined ? userCords : null,
      category:
        item.id == "2"
          ? "Article"
          : item.id == "3"
          ? "Video"
          : item.id == "4"
          ? "Coach"
          : null,
      // offset: 1,
      // sortby: allData[selectedItem - 1]?.name || ""
    };
    dispatch(LearnAllRequest(params));
    // console.log("PPPP+++", params)
    // props.LearnAllRequest(params)
  };

  const getSortRes = (item) => {
    console.log(item, "hhh");
const token = userToken ? userToken : Usertoken;
    let params = {
      endpoint: API_URL.fetchAllLearn,
      token,
      // coordinates: tempCords ? tempCords : userCords[0] !== undefined ? userCords : null,
      labels:
        allData.filter((val) => val.id === selectedItemIndex)[0].id == "2"
          ? "Conflict"
          : allData.filter((val) => val.id === selectedItemIndex)[0].id == "3"
          ? "Dating"
          : allData.filter((val) => val.id === selectedItemIndex)[0].id == "4"
          ? "Marriage"
          : allData.filter((val) => val.id === selectedItemIndex)[0].id == "5"
          ? "Support"
          : allData.filter((val) => val.id === selectedItemIndex)[0].id == "6"
          ? "Love"
          : null,
      labels: item.name,
    };
    dispatch(LearnAllRequest(params));
    // console.log("PPPP+++", params)
  };

  // const data = [
  //   {
  //     id: 1,
  //     title: "First Dates",
  //     intro:
  //       "As a species, we’re changing everyday. This then that or something else. As a species, we’re changing everyday. This then that or something else. As a species, we’re changing everyday. This then that or something else. As a species, we’re changing everyday. This then that or something else.",
  //     rulesHeading: "How to Play",

  //     content1: "1. Ask your partner the question.",

  //     content2: "2. Allow your partner up to a minute to answer the question.",

  //     content3: "3. Ask your partner the question.",

  //     content4: "4. Allow your partner up to a minute to answer the question. ",
  //   },
  // ];
  const endReached = () => {
    page += 1;
    const token = userToken ? userToken : Usertoken;

    let params = {
      endpoint: API_URL.fetchAllServices,
      token,
      coordinates: tempCords
        ? tempCords
        : userCords[0] !== undefined
        ? userCords
        : null,
      category:
        allData.filter((val) => val.id === selectedItemIndex)[0].id == "2"
          ? "6479bae337177e3f0a74c234"
          : allData.filter((val) => val.id === selectedItemIndex)[0].id == "3"
          ? "649161e44755a8d0372968a1"
          : allData.filter((val) => val.id === selectedItemIndex)[0].id == "4"
          ? "6482cc84dd8801bd2034316b"
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
          placeholder="Topics to learn about"
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
            color: color._black,
            alignSelf: "center",
            // opacity: 0.4,
            // lineHeight: 11,
          }}
        />
      </View>
    );
  };

  const allData = [
    { id: "1", title: "All" },
    { id: "2", title: "Article" },
    { id: "3", title: "Video" },
    { id: "4", title: "Coach" },
  ];

  const sortData = [
    { _id: 1, name: "Sex" },
    { _id: 2, name: "Conflict" },
    { _id: 3, name: "Dating" },
    { _id: 4, name: "Marriage" },
    { _id: 5, name: "Support" },
    { _id: 6, name: "Love" },
  ];

  const renderAllItem = ({ item, index }) => {
    return (
      <View style={{}}>
        <Pressable
          style={{
            paddingHorizontal: 15,
            paddingVertical: 20,
            marginHorizontal: 20,
            borderBottomWidth: 2,
            borderBottomColor:
              selectedItemIndex === item.id ? color._primary_orange : "white",
            borderColor: color._dusty_white,
          }}
          onPress={() => {
            getApiRes(item);
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
          // marginVertical:10
          // marginHorizontal: 5
          // marginRight:15
          marginTop: 10,
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
            paddingHorizontal: 20,
            paddingVertical: 9,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            backgroundColor:
              selectedItem === index + 1 ? color._black : "#FFFF",
          }}
          onPress={() => {
            setSelectedItem(item._id);
            getSortRes(item);
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

  return (
    <SafeAreaView style={styles.scrollView}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View>{search()}</View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate(
              index == 3 ? "FavoritesCoaches" : "LearnFavorites"
            );
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
        {/* <BackHeader title={search()} isRight rightContent={rightImage()} /> */}

        {loader ? (
          <ActivityIndicator color={color._primary_orange} size={"large"} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
          >
            <View
              style={
                {
                  // flexDirection: "row",
                  // marginTop: 22,
                  // backgroundColor: 'red',
                  // marginHorizontal: 20
                }
              }
            >
              {/* <View style={{ justifyContent: "center", alignItems: 'center' }}>
                  {/* <TouchableOpacity
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
                  </TouchableOpacity> */}
              {/* </View> */}
              {/* <View style={{}}> */}
              <CommonList data={sortData} renderItem={renderSortItem} />
              {/* </View> */}
            </View>
            {<AllLearn setFilter={setFilter} endReached={endReached} />}
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
  LearnAllRequest: (data) => dispatch(LearnAllRequest(data)),
  LearnAllDetailsRequest: (data, navigation) =>
    dispatch(LearnAllDetailsRequest(data, navigation)),
  LearnfavouriteListRequest: (data) =>
    dispatch(LearnfavouriteListRequest(data)),
  CartListRequest: (data) => dispatch(CartListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
