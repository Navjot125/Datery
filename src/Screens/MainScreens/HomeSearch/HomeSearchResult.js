import styles from './HomeSeachResultStyles'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Atom from "../../../Components/atoms";
import { BackHeader } from "../../../Components/molecules";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MapIcon from "react-native-vector-icons/Feather";
import LocationIcon from "react-native-vector-icons/Entypo";
import CartIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Cart from "../Cart";
import { connect, useDispatch } from "react-redux";
import * as  Models from "../../../Components/models";
import { API_URL } from '../../../Constants/Config';
import { merchantDetailsRequest, merchantRequest } from '../../../modules/Merchants/actions';
import { setLoader } from '../../../modules/Loader/actions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { tempCoordinates, userTempCoordinates } from '../../../modules/Profile/actions';

const HomeSearchResult = (props) => {
  const role = props.state.roleReducer.role.id
  const autocompleteRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [merchantData, setMerchantData] = useState(props.state.merchantReducer?.merchants ?
    props.state.merchantReducer?.merchants : [])
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchedResult, setSearchedResult] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [showMerchants, setShowMerchants] = useState(props?.route?.params?.setText ? true : false);
  const setNameOfCity = (data) => {
    if (data && data.address_components) {
      const cityComponent = data.address_components.find(component =>
        component.types.includes('locality'),
      );
      let coords = {
        coordinates: [data.geometry?.location?.lng, data.geometry?.location?.lat],
        city: data.address_components[0]?.long_name
      }
      {
        role == 1 ?
          props.tempCoordinates(coords) :
          props.userTempCoordinates(coords)
      }
      if (cityComponent) {
        const cityNam = cityComponent.long_name;
        setCityName(cityNam)
      }
      let params = {
        endpoint: API_URL.fetchAllServices,
        coordinates: [data?.geometry?.location?.lng, data?.geometry?.location?.lat,],
        serviceType: null,
        name: null,
        sortby: null
      };
      dispatch(merchantRequest(params))
      // props.merchantRequest(params)
    }
  }

  const search = () => {
    const onChangeSearch = (data, text) => {
      // console.log('data=====', data)
      setSearchedResult(data.filter(item => item.title.toLowerCase().includes(text.toLowerCase())))
    };

    const onFocus = () => {
      setShowMerchants(false);
    };

    const onBlur = () => {
      setShowMerchants(true);

    };
    // console.log(autocompleteRef?.current?.getCurrentLocation(),'hi')
    const renderLeftButton = () => (
      <View style={{
        marginRight: -0.5,
        backgroundColor: "#F8F7FA", height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        top: -2,
        left: 2,
      }}>
        <Image source={require('../../../assets/images/Location.png')} style={{
          width: 20,
          height: 20,
          alignSelf: 'center',
          justifyContent: 'center',
          tintColor: color._primary_orange
        }}
          resizeMode='center'
        />
      </View>
    );
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%'
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            width: '45%',
            left: 10

          }}
        >
          <Searchbar
            autoFocus={props?.route?.params?.setText ? true : false}
            forceTextInputFocus
            onFocus={() => { setShowMerchants(true) }}
            showDivider={false}
            mode="view"
            placeholder="Search"
            placeholderTextColor={'grey'}
            fontSize={16}
            // onChangeText={setText}
            onChangeText={(text) => onChangeSearch(merchantData, text)}
            // value={searchQuery}
            iconColor={color._primary_orange}
            style={{
              backgroundColor: "#F8F7FA",
              height: 40,
              width: '100%',
              borderBottomLeftRadius: 8,
              borderTopLeftRadius: 8,
            }}
            inputStyle={{
              fontFamily: fonts.REGULAR,
              fontSize: 10,
              color: "#000000",
              alignSelf: "center",
              left: -10
            }}
          />
          <View style={{
            height: 30,
            width: 2,
            backgroundColor: color._dusty_white,
            opacity: 0.5,
            zIndex: 23
          }} ></View>

        </View>

        <GooglePlacesAutocomplete
          ref={autocompleteRef}
          textInputProps={{
            onFocus: onFocus,
            onBlur: onBlur,
          }}
          renderLeftButton={renderLeftButton}
          initialValue={cityName}
          placeholder='Search'
          fetchDetails={true}
          onPress={(data, details = null) => {
            setSelectedPlace(details)
            setNameOfCity(details)
            navigation.goBack()
          }}
          query={{
            key: 'AIzaSyCWbsC3b6QgedZG8VQe2ux5lovNGxTptZM',
            language: 'en',
          }}
          enablePoweredByContainer={false}
          currentLocation={true}
          currentLocationLabel='Current location'
          styles={{
            textInputContainer: {
              width: '100%',
              // left: 2
            },
            textInput: {
              height: 40,
              fontFamily: fonts.REGULAR,
              backgroundColor: "#F8F7FA",
              fontSize: 17,
              color: "#000000",
              alignSelf: "center",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8

            },
            listView: {},
            row: {
              backgroundColor: '#FFFFFF',
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            separator: {
              height: 0.5,
              backgroundColor: '#c8c7cc',
            },
            description: {},
            loader: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: 20,
            },
          }}
        />
      </View>
    );
  };
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.9}

      style={{ justifyContent: 'center', marginTop: 15, }}
      onPress={() => {
        // let param = {
        //   endpoint: API_URL.fetchSingleService,
        //   serviceId: { serviceId: item._id },
        //   navigation: () => navigation.navigate("ListingDetail")
        // }
        // props.merchantDetailsRequest(param) 
        let param = {
          endpoint: API_URL.fetchSingleService,
          serviceId: { serviceId: item?._id },
          userToken: props?.state?.loginReducer?.userToken
          ? props?.state?.loginReducer?.userToken
          : props.state?.signupReducer?.signupSucessData?.Usertoken,
          navigation: () => navigation.navigate("ListingDetail", item),
          cb: (data) => {
            navigation.navigate("ListingDetail", item = data);
          },
        };
        props.merchantDetailsRequest(param);
      }}
    >
      <View style={{
        flexDirection: 'row', height: 30,
        alignItems: 'center',
      }} >
        <Image style={{
          height: 20, width: 20,
        }} source={require('../../../assets/images/Search.png')} />
        <Text style={{ fontFamily: fonts.MEDIUM, marginLeft: 15, fontSize: 20, color: color._black }} >{item?.title}</Text>
      </View>
      <View style={{ height: 1, width: '90%', backgroundColor: color._lightGray, marginTop: 10 }} />
    </TouchableOpacity>
  )
  return (
    <SafeAreaView style={styles.scrollView}>
      {
        props.state.loaderReducer?.loader &&
        <View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
        }}>
          <ActivityIndicator
            size="large" color={color._primary_orange} />
        </View>
      }
      <View style={styles.mainView}>
        <View
          style={{
            flexDirection: "row",
            width: '90%',
            // justifyContent: 'center',
            // alignItems: 'center',
            marginLeft: '5%'
          }}
        >
          <View style={{
            left: -30,
            top: 5,
          }}>
            <BackHeader
              onBackPress={() => {
                // props?.route?.params?.setText()
                navigation.goBack()
              }} isRight />
          </View>
          <View style={{
            width: '100%',
            // backgroundColor: 'yellow' 
          }} >{search()}</View>
          <View style={{
            flexDirection: "row",
            top: 10,
            // alignItems: "center"
          }}>
            <TouchableOpacity
              activeOpacity={0.9}

              onPress={() => {
                setModalVisible(true);
              }}
            >
              <CartIcon
                name="shoppingcart"
                size={19}
                color={color._border_orange}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          // props?.route?.params?.setText ?
          showMerchants ?
            searchedResult ?
              <View style={{ marginTop: 30, position: 'absolute', width: '100%' }} >
                <FlatList
                  data={searchedResult}
                  renderItem={renderItem}
                />
              </View> :
              props.state.merchantReducer?.merchants ?
                <View style={{ marginTop: 30, position: 'absolute', }} >
                  <FlatList
                    data={props.state.merchantReducer?.merchants}
                    renderItem={renderItem}
                  />
                </View>
                : null
            : null
        }
      </View>

      <Models.EmptyCartPopUp
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  merchantRequest: (data) => dispatch(merchantRequest(data)),
  tempCoordinates: (data) => dispatch(tempCoordinates(data)),
  userTempCoordinates: (data) => dispatch(userTempCoordinates(data)),
  merchantDetailsRequest: (data, navigation) => dispatch(merchantDetailsRequest(data, navigation)),

  setLoader: (data) => dispatch(setLoader(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchResult);
