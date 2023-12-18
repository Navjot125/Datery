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
import LocationIcon from "react-native-vector-icons/Entypo";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import Carousel, { Pagination } from "react-native-snap-carousel";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { setLoader } from "../../../modules/Loader/actions";
import { merchantDetailsRequest, merchantRequest } from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";



const Food = (props) => {
  const navigation = useNavigation();


  const [merchantData, setMerchantData] = useState(props.state.merchantReducer?.merchants ?
    props.state.merchantReducer?.merchants : [])

  const showList = ({ item }) => {
    return (
      <View
        style={{
          justifyContent: "space-between",
          marginLeft: 3,
          width: screenWidth * 0.45,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => {navigation.navigate("ListingDetail");}}
          onPress={() => {
            let param = {
              endpoint: API_URL.fetchSingleService,
              serviceId: { serviceId: item?._id },
              navigation: () => navigation.navigate("ListingDetail")
            }
            props.merchantDetailsRequest(param)
          }}
        >
          <Image
            style={{
              width: screenWidth * 0.42,
              height: screenHeight * 0.18,
              // borderTopLeftRadius: 12,
              // borderTopRightRadius: 12,
              borderRadius: 12,
              resizeMode: "cover",
            }}
            source={{ uri: `http://54.92.82.16:3001/data/${item.image}` }}
          // source={item.image}
          />
          <Text
            style={{
              marginTop: 9,
              fontFamily: fonts.BOLD,
              // color: "#1F2937",
              color: color._black,
              fontSize: 13,
            }}
          >
            {" "}
            {item.title}{" "}
          </Text>
          <View
            style={{
              flexDirection: "row", alignItems: "center", marginTop: 9,
              width: screenWidth * 0.42,
              flexWrap: 'wrap',
            }}
          >
            <Text
              style={{
                fontFamily: fonts.MEDIUM,
                // color: "#505050",
                fontSize: 11,
                color: color._black,
              }}
            >
              {" "}
              {item.address}{" "} {"\u2022"} {item.Distance.toFixed(2)} mi
              {/* {item.address}{" "} */}
            </Text>
          </View>
          <View style={{
            flexDirection: "row",
            marginTop: 9,
            flexWrap: 'wrap',
          }}>
            {item.Rating == 0 ?
              null :
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  // color: "#9796A1",
                  fontSize: 13,
                  color: color._black,
                }}
              >
                {" "}
                {item.Rating}{" "}
              </Text>
            }
            <Atom.Rating
              currentRating={Math.round(item.Rating)}
            />

            <Text
              style={{
                fontFamily: fonts.REGULAR,
                // color: "#9796A1",
                fontSize: 13,
                color: color._black,
              }}
            >
              {" "}
              {item.ratingCount}{" "}Ratings
            </Text>
          </View>
          <Text
            style={{
              marginTop: 9,
              marginBottom: 13,
              fontFamily: fonts.SEMI_BOLD,
              color: color._border_orange,
              fontSize: 13,
            }}
          >
            From $<Text style={{ fontSize: 14, fontFamily: fonts.BOLD }} >{item.Price}</Text>
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
      }}
    >
      <Atom.Button
        title={item.name}
        onPress={() => { props.setFilter(item.name)
          //  console.log('hello', item.name);
           }}
        style={
          item.selected
            ? { height: 45 }
            : {
              borderWidth: 1,
              backgroundColor: "#FFF",
              borderColor: color._dusty_white,
              height: 40,
              paddingHorizontal: 16,
            }
        }
        textStyle={
          item.selected
            ? {}
            : { color: color._black, fontFamily: fonts.MEDIUM, fontSize: 16, lineHeight: 18 }
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

  return (
    <View style={{ flex: 1 }}>

      {/* <ScrollView showsVerticalScrollIndicator={false}
      > */}
      {
        merchantData[0] == null ? null :
          <FlatList
            data={merchantData}
            keyExtractor={(item) => item.id}
            renderItem={showList}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
      }
      {/* </ScrollView> */}
    </View>
  );
};


const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({
  setLoader: (data) => dispatch(setLoader(data)),
  merchantRequest: (data, navigation) => dispatch(merchantRequest(data, navigation)),
  merchantDetailsRequest: (data, navigation) => dispatch(merchantDetailsRequest(data, navigation)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Food);
// export default Food;

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
});