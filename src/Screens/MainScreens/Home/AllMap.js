import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import * as Molecules from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import LocationIcon from "react-native-vector-icons/Entypo";
import Geolocation from "@react-native-community/geolocation";

// const width = Dimensions.get("window").width;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

import Carousel, { Pagination } from "react-native-snap-carousel";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { setLoader } from "../../../modules/Loader/actions";
import {
  merchantDetailsRequest,
  merchantRequest,
} from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";
import MapView, {
  Callout,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { number } from "yup";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

// const data = [
//     {
//         title: "Balance Dance Studios",
//         // image: require("../../../assets/images/Dance.png"),
//         address: "8130 Texas Drive, Dallas",
//         id: '1',
//         LatLng: { latitude: 43.72965878594172, longitude: -79.74931628786995 },
//         Rating: '3.9',
//         Distance: 2.8874511600319086,
//         ratingCount: '198',
//         image: [
//             "1687250348054.png"
//         ],
//         Price: 110,
//         locationCordinates: {
//             coordinates: [
//                 -96.59018896253463,
//                 32.68625862785006
//             ],
//             type: "Point"
//         },
//     },
//     {
//         title: "Chef Jon",
//         // image: require("../../../assets/images/ChefMap.png"),
//         // rating: '4.9',
//         // ratingCount: '123',
//         address: "8130 Texas Drive, Dallas",
//         id: '2',
//         LatLng: { latitude: 43.10585697641913, longitude: -79.11082324186994 },
//         Rating: '4.9',
//         Distance: 2.8874511600319086,
//         ratingCount: '123',
//         image: [
//             "1688036358978.png"
//         ],
//         Price: 121,
//         locationCordinates: {
//             coordinates: [
//                 -96.84657995205492,
//                 32.77866958581833
//             ],
//             type: "Point"
//         },
//     },
//     {
//         title: "Best Dance School in Texas",
//         // image: require("../../../assets/images/Ballerina.png"),
//         // rating: '4',
//         // ratingCount: '143',
//         address: "8130 Texas Drive, Dallas",
//         id: '3',
//         LatLng: { latitude: 43.16680312868048, longitude: -79.23923759881697 },
//         Rating: '1.9',
//         Distance: 23.8874511600319086,
//         ratingCount: '13',
//         image: [
//             "1687250348054.png"
//         ],
//         Price: 91,
//         locationCordinates: {
//             coordinates: [
//                 -96.59018896253463,
//                 32.68625862785006
//             ],
//             type: "Point"
//         },
//     },
//     {
//         title: "Balance Dance Studios",
//         // image: require("../../../assets/images/Ballerina.png"),
//         // rating: '3.9',
//         // ratingCount: '198',
//         address: "8130 Texas Drive, Dallas",
//         id: '4',
//         LatLng: { latitude: 43.72965878594172, longitude: -79.74931628786995 },
//         Rating: '3.1',
//         Distance: 213.8874511600319086,
//         ratingCount: '193',
//         image: [
//             "1688036358978.png"
//         ],
//         Price: 201,
//         locationCordinates: {
//             coordinates: [
//                 -96.84657995205492,
//                 32.77866958581833
//             ],
//             type: "Point"
//         },
//     },
// ];

const AllMap = (props) => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const mapRef = useRef(null);
  const flatlistRef = useRef(null);
  const [viewableIndex, setViewableIndex] = useState(null);
  const [viewableItems, setViewableItems] = useState([]);
  const [geoCityName, setGeoCityName] = useState("");
  const [geoCityShortName, setGeoCityShortName] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const zoomOutFactor = 800;

  const handleScrollToIndex = (index) => {
    flatlistRef.current.scrollToIndex({ index, animated: true });
  };
  // const viewabilityConfig = useRef({
  //     // itemVisiblePercentThreshold: 50,
  //     // waitForInteraction: true,
  //     // minimumViewTime: 5,
  //   })
  const focusOnMarker = (marker) => {
    const region = {
      // latitude: marker?.viewableItems[0]?.item.LatLng?.latitude,
      // longitude: marker?.viewableItems[0]?.item.LatLng?.longitude,
      latitude:
        marker?.viewableItems[0]?.item?.locationCordinates?.coordinates[1],
      longitude:
        marker?.viewableItems[0]?.item?.locationCordinates?.coordinates[0],
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    mapRef.current.animateToRegion(region);
  };
  const onViewableItemsChanged = React.useRef(({ viewableItems, changed }) => {
    // if (changed && changed.length != 0) {
    // console.log(viewableItems)
    focusOnMarker({ viewableItems });
    // }
  });
  // const getCurrentCity = () => {
  //     const apiKey = 'AIzaSyCWbsC3b6QgedZG8VQe2ux5lovNGxTptZM';

  //     Geolocation.getCurrentPosition(
  //         position => {
  //             const latitude = position.coords.latitude;
  //             const longitude = position.coords.longitude;

  //             setLat(latitude)
  //             setLong(longitude)

  //             const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  //             fetch(geocodingUrl)
  //                 .then(response => response.json())
  //                 .then(data => {
  //                     console.log("DDDD======", data.status)
  //                     if (data.status === 'OK') {
  //                         const results = data.results;
  //                         if (results.length > 0) {
  //                             let coords = {
  //                                 coordinates: [results[0].geometry.location.lng, results[0].geometry.location.lat]
  //                             }
  //                             // props.tempCoordinates(coords)
  //                             // Extract the city name from the address components
  //                             const addressComponents = results[0].address_components;
  //                             const cityComponent = addressComponents.find(component => {
  //                                 return component.types.includes('locality');
  //                             });
  //                             const cityName = cityComponent ? cityComponent.long_name : 'City Not Found';
  //                             const cityShortName = cityComponent ? cityComponent?.short_name : 'City Not Found';
  //                             console.log("CITY----", cityName)
  //                             console.log("CITY=====", cityShortName)

  //                             setGeoCityName(cityName)

  //                             setGeoCityShortName(cityShortName)
  //                             // Display the city name to the user or use it in your desired way
  //                         } else {
  //                             setError(true)
  //                             console.log('No results found');
  //                         }
  //                     } else {
  //                         setError(true)
  //                         console.log(`Geocoding API request failed with status: ${data.status}`);
  //                     }
  //                 })
  //                 .catch(error => {
  //                     console.log('Error:', error);
  //                     setError(true)
  //                 });
  //         },
  //         error => {
  //             setError(true)
  //             // Handle error cases
  //             console.log(error, 'last');
  //         },
  //         { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
  //         // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  // };

  // const onLoad = async () => {
  //     getCurrentCity()
  //     // let apiData = {
  //     //     endpoint: API_URL.getProfile,
  //     //     userToken: props?.state?.loginReducer?.userToken ? props?.state?.loginReducer?.userToken :
  //     //         props.state?.signupReducer?.signupSucessData?.Usertoken,
  //     //     id: {
  //     //         userId: props.state.loginReducer?.loginData._id ? props.state.loginReducer?.loginData._id :
  //     //             props.state?.signupReducer?.signupSucessData?.UserData?._id
  //     //     },

  //     //     // navigation.navigate("DatingProfile"),
  //     // };

  //     // // role == 2 ?
  //     // //     props.datingProfileRequest(apiData) : null

  //     // props.setLoader(false);
  // }
  // useEffect(() => {

  //     onLoad()
  //     // getApiRes()
  // }, [])

  // const onViewableItemsChanged = ({ viewableItems }) => {

  // };
  const isItemInViewable = (item) => {
    return (
      viewableItems.findIndex(
        (viewableItem) => viewableItem.index === item.index
      ) !== -1
    );
  };

  const showList = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          // marginLeft: 10,
          flex: 1,
          width: 170,
          marginHorizontal: 13,
          // justifyContent: 'flex-start',
          // alignItems: 'flex-start',
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            let param = {
              endpoint: API_URL.fetchSingleService,
              serviceId: { serviceId: item?._id },
              navigation: () => navigation.navigate("ListingDetail"),
            };
            props.merchantDetailsRequest(param);
          }}
        >
          <Image
            style={{
              height: 120,
              width: 170,
              // borderTopRightRadius: 10, borderTopLeftRadius: 10,
              borderRadius: 12,
              // resizeMode: "cover",
            }}
            // resizeMode="center"
            source={{ uri: `http://54.92.82.16:3001/data/${item.image}` }}
            // source={item.image}
          />
          <View
            style={{
              paddingLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                marginTop: 10,
                color: color._black,
                fontFamily: fonts.BOLD,
              }}
            >
              {" "}
              {item.title}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 9,
                width: deviceWidth * 0.42,
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.MEDIUM,
                  fontSize: 11,
                  color: color._black,
                }}
              >
                {/* {console.log(item, 'item?.Distance')} */}
                {item.address} {"\u2022"} {item?.Distance.toFixed(2)} mi
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 4,
                flexWrap: "wrap",
              }}
            >
              {item.Rating == 0 ? null : (
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
              )}
              <Atom.Rating currentRating={Math.round(item.Rating)} />
              <Text
                style={{
                  fontFamily: fonts.REGULAR,
                  // color: "#9796A1",
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
                marginTop: 4,
                marginBottom: 25,
                fontFamily: fonts.SEMI_BOLD,
                color: color._border_orange,
                fontSize: 13,
                marginVertical: 20,
              }}
            >
              From $
              <Text style={{ fontSize: 14, fontFamily: fonts.BOLD }}>
                {item.Price}
              </Text>
            </Text>
          </View>
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
          props.setFilter(item.name), console.log("IIIII+++", item.name);
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
            : { color: color._black, fontFamily: fonts.MEDIUM, fontSize: 16 }
        }
      />
    </View>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  useEffect(() => {
    setList(props.state.merchantReducer?.merchants);
  }, [props.state.merchantReducer?.merchants]);
  // console.log(list.length,'LSIT_______')

  return (
    <View
      style={{
        flex: 1,
        // marginHorizontal: 20,
      }}
    >
      <View style={[styles.map, { marginTop: 10 }]}>
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          // provider={PROVIDER_GOOGLE}
          customMapStyle={[
            {
              featureType: "poi",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              stylers: [{ visibility: "off" }],
            },
          ]}
          // style={{  position: 'absolute', top: 0, left: 0, right: 0, bottom:0, flex:1,}}
          style={{
            // marginHorizontal: 20,
            // height: deviceHeight-200, width: deviceWidth,
            height: deviceHeight - 450,
          }}
          loadingEnabled={false}
          loadingIndicatorColor={color._primary_orange}
          initialRegion={{
            // latitude: 43.252590567138085,
            // longitude: -79.86988256242857,
            latitude: list[1]?.locationCordinates?.coordinates[0] || 30.236666,
            longitude: list[1]?.locationCordinates?.coordinates[1] || 56.109394,
            latitudeDelta: 0.0922 * zoomOutFactor,
            longitudeDelta: 0.0421 * zoomOutFactor,
          }}
        >
          {list?.length
            ? list.map((dataa, index) =>
                dataa.locationCordinates ? (
                  <Marker
                    onPress={(index) => {
                      handleScrollToIndex(index);
                      // console.log(dataa, "DDDDAAAAA=====", '1', index);
                    }}
                    resizeMode="contain"
                    key={index}
                    // coordinate={{ latitude: data?.LatLng?.latitude, longitude: data?.LatLng?.longitude }}
                    coordinate={{
                      latitude: dataa?.locationCordinates?.coordinates[0],
                      longitude: dataa?.locationCordinates?.coordinates[1],
                    }}
                    title={dataa.title}
                  >
                    {/* {console.log(dataa?.locationCordinates?.coordinates[1], dataa?.locationCordinates?.coordinates[0])} */}
                    <View
                      style={{
                        height: 70,
                        width: 60,
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        resizeMode="cover"
                        style={{ height: 45, width: 35 }}
                        source={require("../../../assets/images/Location.png")}
                      />
                    </View>
                  </Marker>
                ) : null
              )
            : null}
        </MapView>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          // backgroundColor: 'black'
        }}
      >
        {props.state.merchantReducer?.merchants[0] == null ? null : (
          <FlatList
            data={props.state.merchantReducer?.merchants}
            ref={flatlistRef}
            // data={dataList}
            keyExtractor={(item) => item._id}
            renderItem={showList}
            // numColumns={2}
            // showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            key="_"
            onEndReached={() => {
              props.endReached();
            }}
            onEndReachedThreshold={0.8}
            onViewableItemsChanged={onViewableItemsChanged.current}
            // viewabilityConfig={viewabilityConfig.current}
            // onViewableItemsChanged={() => { focusOnMarker(viewableItems) }}
            pagingEnabled
            viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
          />
        )}
      </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(AllMap);

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
  map: {
    backgroundColor: "white",
    flex: 1,
    // marginHorizontal:20
    // justifyContent: 'center'
  },
});
