import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import styles from "./LearnFavoritesStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";
import axiosClient from "../../../Utils/ApiClient";
import LocationIcon from "react-native-vector-icons/Entypo";
import * as Atom from "../../../Components/atoms";
import {
  removeFavouriteRequest,
  removeGuestFavouriteRequest,
} from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";
import {
  LearnfavouriteListRequest,
  LearnremoveFavouriteRequest,
  LearnremoveGuestFavouriteRequest,
} from "../../../modules/learn/actions";
import Images from "../../../assets/Images";
import { showAlertSuccess } from "../../../Common/Functions/CommonFunctions";
const LearnFavorites = (props) => {
  const role = props.state.roleReducer.role.id;
  const navigation = useNavigation();
  const { favourites } = useSelector((state) => state.learnReducer);
  const [dataa, setDataa] = useState(props.state.learnReducer?.favourites);
  const [isEditMode, setIsEditMode] = useState(false);
  const [checkedId, setCheckedId] = React.useState();
  const [checked, setChecked] = React.useState(true);
  const dispatch = useDispatch();

  const [data, setData] = useState([
    {
      id: 1,
      media: require("../../../assets/images/Alice.png"),
      title: "Being an supportive boyfriend",
      title2: "Dating 101",
      name: "Chelsea Smith",
      date: "March 6, 2023",
      mediaType: ["Video"],
      duration: "5 min",
    },
    {
      id: 2,
      media: require("../../../assets/images/Alice.png"),
      title: "Top 10 Tips to Prepare for a First Date",
      name: "Jane Smith",
      date: "Dec 10, 2022",
      mediaType: ["Article"],
      duration: "5 min read",
    },
    {
      id: 3,
      media: require("../../../assets/images/Alice.png"),
      title: "Top 10 Tips to Prepare for a First Date",
      name: "Jane Smith",
      date: "Dec 10, 2022",
      mediaType: ["Article"],
      duration: "5 min read",
    },
    {
      id: 4,
      media: require("../../../assets/images/Alice.png"),
      title: "Being an supportive boyfriend",
      title2: "Dating 101",
      name: "Chelsea Smith",
      date: "March 6, 2023",
      mediaType: ["Video"],
      duration: "5 min",
    },
    {
      id: 5,
      title: "Mindy Smith",
      title2: "M.S., LMFT Dallas, TX | Virtual",
      name: "Approachable, Direct & Warm",
      media: require("../../../assets/images/dummyImage.png"),
      mediaType: ["Coach"],
    },
  ]);

  // console.log(JSON.stringify(favourites,null,2))

  const handleFavListing = () => {
    dispatch(
      LearnfavouriteListRequest({
        endpoint: API_URL.fetchFavoriteLearn,
        userId: props.state.loginReducer.loginData._id,
      })
    );
  };
  useEffect(() => {
    handleFavListing();

    // setDataa(role == 1 ? props.state.learnReducer.favouritesGuest : props.state.learnReducer?.favourites);
  }, []);
  // const handleDelete = (id) => {
  //   setData((prevData) => prevData.filter((item) => item.id !== id));
  // };

  const handleDelete = (id) => {
    // console.log(id, "IIDDDDd");
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    let param = {
      endpoint: API_URL.deleteFavorite,
      data: {
        serviceId: id,
        userId: props.state.loginReducer.loginData._id,
      },
    };

    let serviceId = {
      serviceId: id,
    };
    role == 2
      ? props.LearnremoveFavouriteRequest(param)
      : props.LearnremoveGuestFavouriteRequest(serviceId);

    showAlertSuccess(`Item removed from your favourite list`);
    setTimeout(() => {
      handleFavListing();
    }, 250);
    // console.log('sfsf',id);
  };

  const renderItemEdit = ({ item }) => {
    const onPressChange = (item) => {
      console.log("item", item?._id);
      item?._id == checkedId ? setCheckedId() : setCheckedId(item?._id);
    };
    const formatDate = (isoDateString) => {
      const createdAtDate = new Date(isoDateString);
      return `${createdAtDate.toDateString()}`;
    };
    const splittedStr = item?.file ? String(item?.file[0]).split(".") : "";
    const isVideo =
      splittedStr.length > 0
        ? splittedStr[splittedStr.length - 1] === "mp4"
        : false;
    return (
      <View style={{ flexDirection: "row" }}>
        <Atom.CheckBox
          // label={item?.title}
          containerStyle={{}}
          // checkValue = {typeOfDatesBool}
          // checkValue ={checkValue}
          checkValue={item?.checked}
          labelStyle={styles.labelStyle}
          onPress={() => onPressChange(item)}
          status={checked ? "checked" : "unchecked"}
          // status={types[0] == item.title ? 'checked' : 'unchecked'}
        />
        {item?.learnType !== "64b9239001e60e6d882e737d" ? (
          <TouchableOpacity
            style={[
              styles.card,
              {
                height: 110,
              },
            ]}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate(
                item.learnType == "64b9239001e60e6d882e737d"
                  ? "CoachDetail"
                  : !isVideo
                  ? "AdviceDetail"
                  : "CourseOverview",
                {
                  item,
                }
              );
            }}
          >
            <FastImage
              style={{ width: 95, height: 95, borderRadius: 6 }}
              source={
                !isVideo
                  ? {
                      uri: `http://54.92.82.16:3001/data/${item?.file[0]}`,
                    }
                  : {
                      uri: `http://54.92.82.16:3001/data/${item?.thumbnailFile}`,
                    }
              }
              // resizeMode="contain"
            />
            <View
              style={{
                paddingHorizontal: 10,
                width: "59%",
              }}
            >
              <Text>
                {item?.learncategories == "Video" ? "VIDEO" : "ARTICLE"}
              </Text>
              <Text style={styles.textTitle}>
                {" "}
                {item?.learnTitle?.length > 14
                  ? `${item?.learnTitle.slice(0, 14)}...`
                  : item?.learnTitle}
              </Text>
              {/* <Text style={styles.textTitle}>{item.learnTitle}</Text> */}
              <Text style={{ fontSize: 15, color: "#1F2937" }}>
                Chelsea Smith
              </Text>
              {/* <Text style={[styles.textBetween, { marginTop: 10 }]}>
                        {" "}
                        {item.coachName}
                      </Text> */}
              <View style={{ flex: 1 }}>
                <View style={styles.lastText}>
                  <Text style={styles.orangeText}>
                    {formatDate(item.createdAt)}
                  </Text>
                  {/* <View
                            style={{
                              height: 5,
                              width: 5,
                              backgroundColor: "grey",
                              borderRadius: 10,
                            }}
                          ></View>
                          <Text style={[styles.orangeText]}>
                            {item.learnTime}
                          </Text> */}
                </View>
                <View
                  style={{
                    backgroundColor: color._primary_orange,
                    alignSelf: "flex-start",
                    padding: 3,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    marginTop: 5,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "white" }}>
                    {item?.labels}
                  </Text>
                </View>
              </View>
            </View>
            {/* <View style={{ right: 20 }}>
                      <Image
                        source={!isVideo ? Images.DocsImage : Images.vedioImage}
                        style={{ height: 40, width: 30, resizeMode: "contain" }}
                      />
                    </View> */}
            {/* </View> */}
          </TouchableOpacity>
        ) : item.learnType === "64b9239001e60e6d882e737d" ? (
          <View style={[styles.card]}>
            <FastImage
              source={{
                uri: `http://54.92.82.16:3001/data/${item?.coachPic}`,
              }}
              style={{ height: 95, width: 95, borderRadius: 6 }}
            />
            <View
              style={{
                padding: 15,
                width: "59%",
                // marginTop:15
                // flexWrap:'wrap',
                height: 110,
              }}
            >
              <Text style={{}}>COACH</Text>
              <Text style={styles.textTitle}>{item.coachName}</Text>
              <Text
                style={[styles.textBetween, { color: "black", marginTop: 2 }]}
              >
                {" "}
                {item.coachAddress}
              </Text>
              {/* <Text
                style={[styles.textBetween, { color: "black", marginTop: 8 }]}
              >
                {" "}
                {item.coachApproach}
              </Text> */}

              {/* <View style={{ flex: 1, marginTop: 15,justifyContent:'space-between' }}> */}
              <View style={[styles.lastText, { marginTop: 6 }]}>
                {/* <Text style={styles.orangeText}>
                  {formatDate(item.createdAt)}
                </Text> */}
                {/* <View
                          style={{
                            height: 5,
                            width: 5,
                            backgroundColor: "grey",
                            borderRadius: 10,
                          }}
                        ></View>
                        <Text
                          style={[
                            styles.orangeText,
                            { textTransform: "capitalize" },
                          ]}
                        >
                          {item.coachAvailability}
                        </Text> */}
              </View>
              <View
                style={{
                  backgroundColor: color._primary_orange,
                  alignSelf: "flex-start",
                  padding: 3,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  // marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 13, color: "white" }}>
                  {item?.labels}
                </Text>
              </View>
              {/* </View> */}
            </View>
            {/* <View style={styles.iconWrap}>
              <Image
                source={Images.WhistleImage}
                style={{
                  height: 15,
                  width: 16,
                  resizeMode: "cover",
                  right: 20,
                }}
              />
            </View> */}
          </View>
        ) : (
          <FastImage
            source={Images.BallerinaImage}
            style={{ height: 85, width: 85, borderRadius: 6 }}
          />
        )}
      </View>
    );
  };
  const renderItem = ({ item }) => {
    const formatDate = (isoDateString) => {
      const createdAtDate = new Date(isoDateString);
      return `${createdAtDate.toDateString()}`;
    };
    const splittedStr = item?.file ? String(item?.file[0]).split(".") : "";
    const isVideo =
      splittedStr.length > 0
        ? splittedStr[splittedStr.length - 1] === "mp4"
        : false;
    return (
      <View style={[styles.cardView, { marginHorizontal: 15 }]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate(
              item.learnType == "64b9239001e60e6d882e737d"
                ? "CoachDetail"
                : !isVideo
                ? "AdviceDetail"
                : "CourseOverview",
              {
                item,
              }
            );
          }}
        >
          <View style={[styles.card]}>
            {item?.learnType !== "64b9239001e60e6d882e737d" ? (
              <>
                <FastImage
                  style={{ width: 95, height: "85%", borderRadius: 6 }}
                  source={
                    !isVideo
                      ? {
                          uri: `http://54.92.82.16:3001/data/${item?.file[0]}`,
                        }
                      : {
                          uri: `http://54.92.82.16:3001/data/${item?.thumbnailFile}`,
                        }
                  }
                  resizeMode="cover"
                />
                <View
                  style={{
                    padding: 15,
                    width: "74%",
                  }}
                >
                  <Text>
                    {item?.learncategories == "Video" ? "VIDEO" : "ARTICLE"}
                  </Text>
                  <Text style={styles.textTitle}>
                    {item?.learnTitle?.length > 14
                      ? `${item?.learnTitle.slice(0, 14)}...`
                      : item?.learnTitle}
                  </Text>
                  <Text style={{ fontSize: 15, color: "#1F2937" }}>
                    Chelsea Smith
                  </Text>
                  {/* <Text style={[styles.textBetween, { marginTop: 10 }]}>
                        {" "}
                        {item.coachName}
                      </Text> */}
                  <View style={{ flex: 1 }}>
                    <View style={styles.lastText}>
                      <Text style={styles.orangeText}>
                        {formatDate(item.createdAt)}
                      </Text>
                      {/* <View
                            style={{
                              height: 5,
                              width: 5,
                              backgroundColor: "grey",
                              borderRadius: 10,
                            }}
                          ></View>
                          <Text style={[styles.orangeText]}>
                            {item.learnTime}
                          </Text> */}
                    </View>
                    {/* {console.log("item", JSON.stringify(item))} */}
                    <View
                      style={{
                        backgroundColor: color._primary_orange,
                        alignSelf: "flex-start",
                        padding: 3,
                        borderRadius: 5,
                        paddingHorizontal: 5,
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ fontSize: 13, color: "white" }}>
                        {item?.labels}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* <View
                    // style={{ right: 20 }}
                    >
                      <Image
                        source={!isVideo ? Images.DocsImage : Images.vedioImage}
                        style={{ height: 40, width: 30, resizeMode: "contain" }}
                      />
                    </View> */}
              </>
            ) : item.learnType === "64b9239001e60e6d882e737d" ? (
              <>
                <FastImage
                  source={{
                    uri: `http://54.92.82.16:3001/data/${item?.coachPic}`,
                  }}
                  style={{ width: 95, height: "85%", borderRadius: 6 }}
                />
                <View
                  style={{
                    padding: 15,
                    width: "74%",
                    // marginTop:15
                    // flexWrap:'wrap',
                  }}
                >
                  <Text style={{}}>COACH</Text>
                  <Text style={styles.textTitle}>{item.coachName}</Text>
                  <Text
                    style={[
                      styles.textBetween,
                      { color: "black", marginTop: 2 },
                    ]}
                  >
                    {" "}
                    {item.coachAddress}
                  </Text>
                  {/* <Text
                    style={[
                      styles.textBetween,
                      { color: "black", marginTop: 8 },
                    ]}
                  >
                    {" "}
                    {item.coachApproach}
                  </Text> */}
                  {/* <View style={{ flex: 1, marginTop: 15,justifyContent:'space-between' }}> */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* <Text style={styles.orangeText}>
                      {formatDate(item.createdAt)}
                    </Text> */}
                    <Text style={styles.textLoc}>
                      <LocationIcon
                        name="location-pin"
                        size={15}
                        color={color._primary_orange}
                      />
                      {"Dallas"}
                    </Text>
                    <FastImage
                      source={require("../../../assets/images/Video.png")}
                      style={{ width: 15, height: 10, marginHorizontal: 4 }}
                    />
                    <Text
                      style={[
                        styles.orangeText,
                        { textTransform: "capitalize" },
                      ]}
                    >
                      {item.coachAvailability}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: color._primary_orange,
                      alignSelf: "flex-start",
                      padding: 3,
                      borderRadius: 5,
                      paddingHorizontal: 5,
                      marginTop: 5,
                    }}
                  >
                    <Text style={{ fontSize: 13, color: "white" }}>
                      {item?.labels}
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              </>
            ) : (
              // Else Block, render a default image or any other content
              <FastImage
                source={Images.BallerinaImage}
                style={{ height: 85, width: 85, borderRadius: 6 }}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const emptyData = () => {
    // Alert.alert('')
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            color: color._black,
            fontFamily: fonts.MEDIUM,
          }}
        >
          {"No Favorities"}
        </Text>
      </View>
    );
  };

  const renderHiddenItem = (dataItem) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => handleDelete(dataItem.item._id)}
      >
        <FastImage
          style={{ height: 20, width: 20 }}
          source={require("../../../assets/images/deleteCard.png")}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        {/* <View style={styles.header}> */}
        {/* <BackHeader title={"Favorites"} /> */}
        {/* </View> */}
        {/* <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 15 }}
        > */}

        <View
          style={{
            flex: 1,
            backgroundColor: color._white,
            // paddingHorizontal: 20,
          }}
        >
          <BackHeader title="Favorites" />
          <Text
            onPress={() => {
              setIsEditMode(!isEditMode);
            }}
            style={{
              right: 20,
              position: "absolute",
              top: 20,
              color: color._primary_orange,
            }}
          >
            Edit
          </Text>
          {favourites?.length > 0 ? (
            isEditMode ? (
              <>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={favourites}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItemEdit}
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[
                    styles.button,
                    {
                      backgroundColor: !checkedId
                        ? "#DCDDE0"
                        : color._primary_orange,
                      borderRadius: 40,
                    },
                  ]}
                  // onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={[
                      styles.title,
                      {
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        fontWeight: 600,
                      },
                    ]}
                  >
                    {"REMOVE SELECTED ITEMS"}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={favourites}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            )
          ) : (
            <Text
              style={{
                flex: 1,
                alignSelf: "center",
                top: "40%",
                fontFamily: fonts.BOLD,
                color: "#1F2937",
                fontSize: 17,
              }}
            >
              Your favourite list is empty
            </Text>
          )}
        </View>

        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        /> */}
        {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={showData}
          /> */}

        {/* <SwipeListView
          data={favourites}
          renderItem={renderItem}
          ListEmptyComponent={emptyData}
          contentContainerStyle={{ flexGrow: 1 }}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-55} // adjust this value based on your item width
        /> */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  LearnremoveFavouriteRequest: (navigation) =>
    dispatch(LearnremoveFavouriteRequest(navigation)),
  LearnremoveGuestFavouriteRequest: (data) =>
    dispatch(LearnremoveGuestFavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnFavorites);
