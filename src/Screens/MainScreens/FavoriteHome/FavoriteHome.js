import {
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import * as Atom from "../../../Components/atoms";
import { useNavigation, useRoute } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import LocationIcon from "react-native-vector-icons/Entypo";
import styles from "./FavoriteHomeStyles";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackHeader } from "../../../Components/molecules";
import DropShadow from "react-native-drop-shadow";
import {
  favouriteListRequest,
  removeFavouriteRequest,
  removeGuestFavouriteRequest,
} from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";
import { ActivityIndicator } from "react-native-paper";
import { showAlertSuccess } from "../../../Common/Functions/CommonFunctions";

const FavoriteHome = (props) => {
  const route = useRoute();
  const { param } = route.params || { param: {} };
  const [favParam, setFavParam] = useState(param);
  const role = props.state.roleReducer.role.id;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState(props.state.merchantReducer?.favourites);
  const [checked, setChecked] = React.useState(true);
  const [checkedId, setCheckedId] = React.useState();
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );
  const [isEditMode, setIsEditMode] = useState(false);
  // console.log(JSON.stringify(props.state.merchantReducer?.favourites,null,2))
  useEffect(() => {
    setData(
      role == 1
        ? props.state.merchantReducer.favouritesGuest
        : props.state.merchantReducer?.favourites
    );
  }, [role]);

  useEffect(() => {
    setData(props.state.merchantReducer?.favourites);
  }, [props.state.merchantReducer?.favourites]);
  const handleDelete = (id) => {
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    let params = {
      endpoint: API_URL.deleteFavorite,
      data: {
        serviceId: id,
        userId: props.state?.loginReducer?.loginData?._id
          ? props.state?.loginReducer?.loginData?._id
          : props.state?.signupReducer?.signupSucessData?.UserData?._id,
      },
      callBack: () => {
        dispatch(favouriteListRequest(param));
        showAlertSuccess(`Item removed from your favourite list`);
      },
    };
    let serviceId = {
      serviceId: id,
    };
    role == 2
      ? props.removeFavouriteRequest(params)
      : props.removeGuestFavouriteRequest(serviceId);
  };

  //   <Atom.CheckBox
  //   label={item.title}
  //   containerStyle={{}}
  //   // checkValue = {typeOfDatesBool}
  //   // checkValue ={checkValue}
  //   checkValue={item.checked}
  //   labelStyle={styles.labelStyle}
  //   onPress={() => onPressChange(item)}
  //   status={checked ? 'checked' : 'unchecked'}
  // // status={types[0] == item.title ? 'checked' : 'unchecked'}
  // />
  console.log("checkedId", checkedId);
  const renderItemEdit = ({ item }) => {
    const onPressChange = (item) => {
      item?.serviceId == checkedId
        ? setCheckedId()
        : setCheckedId(item?.serviceId);
    };
    return (
      <View
        style={[
          styles.cardView,
          {
            flexDirection: "row",
          },
        ]}
      >
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
        <DropShadow style={[styles.shadowProp, { flex: 1, marginHorizontal:12 }]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("ListingDetail")}
          >
            <View style={[styles.card]}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 6,
                  // padding: 13,
                  // resizeMode: 'contain',
                }}
                source={{
                  uri: `http://54.92.82.16:3001/data/${item.providerfile}`,
                }}
              />
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Text
                  style={{
                    fontFamily: fonts.BOLD,
                    color: color._black,
                    fontSize: 15,
                  }}
                >
                  {item.providerName}{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 9,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.MEDIUM,
                      color: color._black,
                      fontSize: 11,
                    }}
                  >
                    {item.providerlocationAddress}{" "}
                    <Text>{item?.Distance.toFixed(2)} mi</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 9,
                  }}
                >
                  {item.averageRating != 0 ? (
                    <>
                      <Text
                        style={{
                          fontFamily: fonts.REGULAR,
                          color: color._black,
                          fontSize: 13,
                        }}
                      >
                        {item.averageRating}{" "}
                      </Text>
                      <Atom.Rating
                        // currentRating={Math.round(item.rating)}
                        currentRating={Math.round(item.averageRating)}
                      />
                    </>
                  ) : (
                    <Atom.Rating
                      // currentRating={Math.round(item.rating)}
                      currentRating={Math.round(item.averageRating)}
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: fonts.REGULAR,
                      color: color._black,
                      fontSize: 13,
                    }}
                  >
                    {" "}
                    {item.ratingCount} Ratings
                  </Text>
                </View>

                <Text
                  style={{
                    // marginTop: 9,
                    // marginBottom: 13,
                    fontFamily: fonts.SEMI_BOLD,
                    color: color._border_orange,
                    fontSize: 13,
                  }}
                >
                  Starting at{" "}
                  <Text
                    style={{
                      // marginTop: 9,
                      // marginBottom: 14,
                      fontFamily: fonts.BOLD,
                      color: color._border_orange,
                      fontSize: 20,
                    }}
                  >
                    ${item?.price}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </DropShadow>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardView}>
        <DropShadow style={styles.shadowProp}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("ListingDetail")}
          >
            <View style={styles.card}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 6,
                  // padding: 13,
                  // resizeMode: 'contain',
                }}
                source={{
                  uri: `http://54.92.82.16:3001/data/${item.providerfile}`,
                }}
              />
              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <Text
                  style={{
                    fontFamily: fonts.BOLD,
                    color: color._black,
                    fontSize: 15,
                  }}
                >
                  {item.providerName}{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 9,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.MEDIUM,
                      color: color._black,
                      fontSize: 11,
                    }}
                  >
                    {item.providerlocationAddress}{" "}
                    <Text>{item?.Distance.toFixed(2)} mi</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 9,
                  }}
                >
                  {item.averageRating != 0 ? (
                    <>
                      <Text
                        style={{
                          fontFamily: fonts.REGULAR,
                          color: color._black,
                          fontSize: 13,
                        }}
                      >
                        {/* {" "} */}
                        {item.averageRating}{" "}
                      </Text>
                      <Atom.Rating
                        // currentRating={Math.round(item.rating)}
                        currentRating={Math.round(item.averageRating)}
                      />
                    </>
                  ) : (
                    <Atom.Rating
                      // currentRating={Math.round(item.rating)}
                      currentRating={Math.round(item.averageRating)}
                    />
                  )}
                  <Text
                    style={{
                      fontFamily: fonts.REGULAR,
                      color: color._black,
                      fontSize: 13,
                    }}
                  >
                    {" "}
                    {/* {item.ratingCount}{" "}Ratings */}
                    {item.ratingCount} Ratings
                  </Text>
                </View>

                <Text
                  style={{
                    // marginTop: 9,
                    // marginBottom: 13,
                    fontFamily: fonts.SEMI_BOLD,
                    color: color._border_orange,
                    fontSize: 13,
                  }}
                >
                  {/* Starting at ${item.price} */}
                  Starting at{" "}
                  <Text
                    style={{
                      // marginTop: 9,
                      // marginBottom: 14,
                      fontFamily: fonts.BOLD,
                      color: color._border_orange,
                      fontSize: 20,
                    }}
                  >
                    ${item.price}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </DropShadow>
      </View>
    );
  };
  const renderHiddenItem = (dataItem) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.actionButton}
        onPress={() => handleDelete(dataItem.item.serviceId)}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("../../../assets/images/deleteCard.png")}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: color._white }}>
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
      <View
        style={{
          flex: 1,
          backgroundColor: color._white,
          paddingHorizontal: 20,
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
        {/* <FlatList
          data={dataList}
          keyExtractor={(item) => item.id}
          renderItem={showList}
          showsVerticalScrollIndicator={false}
        /> */}
        {/* isEditMode, */}
        {data?.length > 0 ? (
          isEditMode ? (
            <>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItemEdit}
                showsVerticalScrollIndicator={false}
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
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )
        ) : (
          // <SwipeListView
          //   data={data}
          //   renderItem={renderItem}
          //   ItemSeparatorComponent={() => {
          //     return <View style={{ height: 40 }} />;
          //   }}
          //   renderHiddenItem={renderHiddenItem}
          //   rightOpenValue={-55} // adjust this value based on your item width
          // />
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
    </View>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  removeFavouriteRequest: (navigation) =>
    dispatch(removeFavouriteRequest(navigation)),
  removeGuestFavouriteRequest: (data) =>
    dispatch(removeGuestFavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteHome);
