import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import * as Molecules from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";

// const width = Dimensions.get("window").width;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
import LocationIcon from "react-native-vector-icons/Entypo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect, useSelector } from "react-redux";
import { setLoader } from "../../../modules/Loader/actions";
import {
  merchantDetailsRequest,
  merchantRequest,
} from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { AirbnbRating } from "@rneui/themed";
import CustomIcon from "../../../assets/CustomIcon";
import FastImage from "react-native-fast-image";

const AllHome = (props) => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const { merchants, totalMerchant } = useSelector(
    (state) => state.merchantReducer
  );
  const showList = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor:"red",
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          // style = {{flex:1}}
          onPress={() => {
            let param = {
              endpoint: API_URL.fetchSingleService,
              serviceId: { serviceId: item?._id },
              userToken: props?.state?.loginReducer?.userToken
                ? props?.state?.loginReducer?.userToken
                : props.state?.signupReducer?.signupSucessData?.Usertoken,
              navigation: () => navigation.navigate("ListingDetail", item),
              cb: (data) => {
                navigation.navigate("ListingDetail", (item = data));
              },
            };
            props.merchantDetailsRequest(param);
          }}
        >
          <Image
            style={{
              // width: 163,
              width: screenWidth * 0.9,
              height: screenHeight * 0.25,
              // height: 160,
              borderRadius: 12,
              // borderTopLeftRadius: 12,
              // borderTopRightRadius: 12,
              // marginLeft: 9,
              resizeMode: "cover",
              alignSelf: "center",
            }}
            source={{ uri: `http://54.92.82.16:3001/data/${item.image}` }}
            // source={item.image}
          />
          <Text style={styles.titleTxt}>{item.title} </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              // width: screenWidth * 0.42,
              // flexWrap: 'wrap',
              // backgroundColor:'red',
              justifyContent: "flex-start",
              flex: 1,
              left: -3,
              flexWrap: "wrap",
            }}
          >
            <LocationIcon
              name="location-pin"
              size={15}
              color={color._primary_orange}
              // style={{backgroundColor:'red'}}
            />
            <Text
              style={{
                fontFamily: fonts.MEDIUM,
                fontSize: 14,
                color: color._font_grey,
              }}
            >
              {item.address}
            </Text>
            {item?.typeOfVisit?.map((item, index) => (
              <View
                style={{
                  marginHorizontal: 5,
                  flexDirection: "row",
                }}
              >
                <FastImage
                  style={{ height: 15, width: 15, marginRight: 5 }}
                  source={
                    item == "Onsite"
                      ? require("../../../assets/images/onsite.png")
                      : require("../../../assets/images/travel.png")
                  }
                />
                <Text style={{ fontSize: 14 }}>{item}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 4,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {item.Rating == 0 ? null : (
              <Text
                style={{
                  fontFamily: fonts.BOLD,
                  // color: "#9796A1",
                  fontSize: 11,
                  color: color._black,
                  lineHeight: 15,
                }}
              >
                {item.Rating.toFixed(2)}{" "}
              </Text>
            )}
            <Atom.Rating
              disabled={true}
              currentRating={Math.round(item.Rating)}
            />
            <Text
              style={{
                fontFamily: fonts.BOLD,
                // color: "#9796A1",
                color: color._black,
                fontSize: 11,
                lineHeight: 15,
                left: 8,
              }}
            >
              {item.ratingCount} Rating
            </Text>

            <View
              style={{
                backgroundColor: color._primary_orange,
                padding: 3,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 25,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: color._white }}
              >
                Caribbean
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 4,
              marginBottom: 25,
              fontFamily: fonts.SEMI_BOLD,
              color: color._border_orange,
              fontSize: 13,
            }}
          >
            Starting at{" "}
            <Text
              style={{
                fontSize: 18,
                fontFamily: fonts.BOLD,
                fontWeight: "700",
                lineHeight: 21,
              }}
            >
              {"$"}
              {item.Price}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Item = ({ item }) => (
    <View
      style={{
        marginHorizontal: 5,
        marginBottom: 32,
        // marginTop: 22,
      }}
    >
      <Atom.Button
        title={item.name}
        onPress={() => {
          props.setFilter(item.name);
        }}
        style={
          item.selected
            ? { height: 45 }
            : {
                borderWidth: 1,
                backgroundColor: "#FFF",
                borderColor: color._dusty_white,
                height: 40,
                // paddingHorizontal: 26,
                paddingHorizontal: 16,
              }
        }
        textStyle={
          item.selected
            ? {}
            : {
                color: color._black,
                fontFamily: fonts.MEDIUM,
                fontSize: 16,
                lineHeight: 18,
              }
        }
      />
    </View>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };
  const handlePressSingle = (item) => {
    let renderData = [...data];
    for (let e of renderData) {
      if (e._id === item._id) {
        e.selected = true;
      } else {
        e.selected = false;
      }
    }
    onChange(renderData[0]);
    setData(renderData);
  };

  const handlePressMulti = (item) => {
    let renderData = [...data];

    if (item.name == "All") {
      if (item.selected) {
        for (let data of renderData) {
          data.selected = false;
        }
      } else {
        for (let data of renderData) {
          data.selected = true;
        }
      }
    } else {
      for (let data of renderData) {
        if (data._id == "1" && data.selected) {
          data.selected = false;
        }
        if (data._id == item._id) {
          data.selected = data.selected == null ? true : !data.selected;
          break;
        }
      }
    }
    const selectedData = renderData.filter((e) => e.selected).map((e) => e._id);
    onChange(selectedData);
    setData(renderData);
  };

  useEffect(() => {
    setList(props.state.merchantReducer?.merchants);
    // console.log('LIST______', merchants.length)
  }, [props.state.merchantReducer?.merchants]);

  return (
    <View style={{ flex: 1 }}>
      {/* {console.log(props.state.merchantReducer?.merchants.length)} */}
      {/* {console.log("merchants----===-=", JSON.stringify(merchants))} */}
      {merchants[0] == null ? null : (
        <FlatList
          data={merchants}
          // data={dataList}
          keyExtractor={(item) => item._id}
          renderItem={showList}
          // numColumns={0}
          contentContainerStyle={{ flexGrow: 1 }}
          key="#"
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          ListEmptyComponent={() => {
            Alert.alert("hello");
            // console.log('iwhbeiywbeif');
          }}
          onEndReachedThreshold={0.8}
          bounces={false}
          alwaysBounceVertical={false}
          ListFooterComponent={() => {}}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
  setLoader: (data) => dispatch(setLoader(data)),
  merchantRequest: (data, navigation) =>
    dispatch(merchantRequest(data, navigation)),
  merchantDetailsRequest: (data, navigation) =>
    dispatch(merchantDetailsRequest(data, navigation)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllHome);

// export default AllHome;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 142, 0, 0.1)",
    borderRadius: 10,
    height: 154,
  },
  image: {
    width: wp("48.1%"),
    resizeMode: "contain",
    height: "100%",
  },
  header: {
    color: "#000000",
    fontFamily: fonts.BOLD,
    fontSize: 24,
    textAlign: "left",
    lineHeight: 30,
  },
  body: {
    color: "#FFFFFF",
    fontFamily: fonts.BOLD,
    fontSize: 12,
    lineHeight: 24,
    backgroundColor: color._border_orange,
    width: 95,
    borderRadius: 122,
    textAlign: "center",
  },
  titleTxt: {
    marginTop: 9,
    fontFamily: fonts.BOLD,
    color: color._font_grey,
    fontSize: 18,
    // color: color._black,
    fontWeight: "700",
    textAlign: "left",
    lineHeight: 18,
  },
  rating: {
    // paddingVertical:20
  },
});
