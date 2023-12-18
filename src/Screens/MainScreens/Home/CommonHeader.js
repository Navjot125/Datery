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
    StyleSheet,
    PermissionsAndroid,
    Alert,
} from "react-native";
import * as  Models from "../../../Components/models";
import React, { memo, useEffect, useState } from "react";
import styles from "./HomeStyles";
import { ActivityIndicator, Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import MapIcon from "react-native-vector-icons/Feather";
import CartIcon from "react-native-vector-icons/AntDesign";
import { API_URL } from "../../../Constants/Config";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { roleRequest } from "../../../modules/Role/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import { CartListRequest } from "../../../modules/Cart/actions";
import { favouriteListRequest } from "../../../modules/Merchants/actions";




const CommonHeader = (props) => {
    const navigation = useNavigation()
    const [error, setError] = useState(false);
    let [loc, setLoc] = useState('');
    const routes = useNavigationState(state => state.routes)
    const role = props.state.roleReducer.role.id
    const userCity = props?.state?.profileReducer?.datingData?.userProfile?.locationAddress
    const tempName = role == 1 ? props.state?.profileReducer?.tempLocatioName : props.state?.profileReducer?.userTempLocatioName
    const [emptyCart, setEmptyCart] = useState(false);
    const dispatch = useDispatch()
    const { userToken, loginData } = useSelector(state => state.loginReducer)
    const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
    const [geoCityName, setGeoCityName] = useState('');
    const [geoCityShortName, setGeoCityShortName] = useState('');
    // const [cordinates, setCordinates] = useState()




    const search = () => {
        let loc = role == 1 ? tempName ? tempName : props.geoCityShortName ? props.geoCityName?.length > 10 ? props.geoCityShortName : props.geoCityName : '' : tempName ? tempName : userCity ? userCity : props.geoCityName ? props.geoCityName?.length > 10 ? props.geoCityShortName : props.geoCityName : ''
        // console.log(role, "role-LOC")

        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    left: 2
                    // height: 40,
                    // backgroundColor: 'red',
                    // borderRadius: 20
                }}
            >
                <Searchbar

                    onTouchEnd={() => navigation.navigate('HomeSearchResult', { setText: props.setText })}
                    // disable={true}
                    // editable={false}
                    showDivider={false}
                    mode="view"
                    placeholder="Things to do"
                    placeholderTextColor={color._gray}
                    fontSize={14}
                    onChangeText={onChangeSearch}
                    // value={searchQuery}
                    iconColor={color._primary_orange}
                    style={{
                        backgroundColor: "#F8F7FA",
                        height: 40,
                        width: '48%',
                        zIndex: 3,
                        borderBottomLeftRadius: 8,
                        borderTopLeftRadius: 8
                    }}
                    inputStyle={{
                        fontFamily: fonts.REGULAR,
                        fontSize: 10,
                        color: color._gray,
                        alignSelf: "center",
                        // lineHeight: 11,
                        left: -10
                    }}
                />
                {/* <View style={{ height: 30, width: 1, backgroundColor: color._dusty_white, opacity: 0.5 }} ></View> */}
                <Searchbar
                    onTouchEnd={() => { props.page = 0; navigation.navigate('HomeSearchResult', { setLoc: setLoc, clearLoc: "clearLoc" }) }}
                    showDivider={false}
                    icon={"map-marker"}
                    mode="view"
                    placeholder={role == 1 ? tempName ? tempName : props.geoCityShortName ? props.geoCityName?.length > 10 ? props.geoCityShortName : props.geoCityName : '' : tempName ? tempName : userCity ? userCity : props.geoCityName ? props.geoCityName?.length > 10 ? props.geoCityShortName : props.geoCityName : ''}
                    placeholderTextColor={color._gray}
                    fontSize={14}
                    // value={props.geoCityName}
                    iconColor={color._primary_orange}
                    style={{
                        backgroundColor: "#F8F7FA",
                        height: 40,
                        width: '48%',
                        overflow: 'hidden',
                        // flexDirection: 'row',
                        color: color._primary_orange,
                        textAlign: "center",
                        borderBottomRightRadius: 8,
                        borderTopRightRadius: 8
                    }}
                    clearIcon={true}
                    inputStyle={{
                        fontFamily: fonts.REGULAR,
                        fontSize: 10,
                        color: color._gray,
                        // color: color._primary_orange,
                        alignSelf: "center",
                        left: -10,
                    }}
                    loading={loc.length > 0 ? false : true}
                // loading={role == 1 ? props.geoCityShortName ? false : error ? false : true : userCity ? false : props.geoCityShortName ? false : error ? false : true}
                />
            </View>
        );
    };

    const [searchQuery, setSearchQuery] = React.useState("");

    const onChangeSearch = (query) => {
        // navigation.navigate('HomeSearchResult')
        setSearchQuery(query)
    };
    // console.log(routes[routes.length - 1].name)
    return (

        <View
            style={{
                flexDirection: "row",
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '5%'
            }}
        >
            {/* get current route name and check  */}
            {/* {routes[routes.length - 1].name === 'MapViews' ? (
                <TouchableOpacity
                    activeOpacity={0.9}

                    onPress={() => { navigation.goBack() }} >
                    <Image source={require('../../../assets/images/ListView.png')}
                        style={{ height: 23, width: 23, left: 5 }}
                        // resizeMode="center"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            ) : (
                <MapIcon name="map" size={24} color={color._border_orange}
                    // style={{ left: 5 }}
                    onPress={() => navigation.navigate("MapViews")}
                />
            )} */}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    const token = userToken ? userToken :
                        Usertoken
                    const cords = props.state.merchantReducer?.details?.locationCordinates?.coordinates || 0
                    let param = {
                        endpoint: API_URL.fetchFavoriteServices,
                        token,
                        coordinates: cords,
                        id: {
                            userId: props.state?.loginReducer?.loginData?._id ? props.state?.loginReducer?.loginData?._id :
                                props.state?.signupReducer?.signupSucessData?.UserData?._id,
                        },
                        navigation: () => navigation.navigate('FavoriteHome', {
                            param
                        })
                    }
                    role == 2 ?
                        dispatch(favouriteListRequest(param)) : navigation.navigate('FavoriteHome')
                }}
            >
                <Image
                    style={{ height: 16, width: 20, tintColor: color._black, resizeMode: 'contain' }}
                    source={require("../../../assets/images/Heart.png")}
                />
            </TouchableOpacity>
            <View>{search()}</View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                    activeOpacity={0.9}

                    onPress={() => {
                        // Alert.alert('hello')
                        // navigation.navigate("ReviewCart")
                        // navigation.navigate('ReviewCart')
                        const token = userToken ? userToken :
                            Usertoken

                        let param = {
                            endpoint: API_URL.getCartItem,
                            token,
                            userId: {
                                userId: props.state?.loginReducer?.loginData?._id ? props.state?.loginReducer?.loginData?._id :
                                    props.state?.signupReducer?.signupSucessData?.UserData?._id,
                            },
                            navigation: () => {
                                navigation.navigate("ReviewCart")
                            }
                        }
                        role == 2 ?
                            props.state.cartReducer?.cartCount == null ? setEmptyCart(true) : props.state.cartReducer?.cartCount == 0 ?
                                setEmptyCart(true) :
                                (props.CartListRequest(param),
                                    // console.log(param, "pcxppp"),
                                    navigation.navigate("ReviewCart"))

                            :
                            // navigation.navigate('FavoriteHome')
                            // navigation.navigate("ReviewCart")
                            props.state.cartReducer?.cartCount == null
                                ? setEmptyCart(true) :
                                props.state.cartReducer?.cartCount == 0 ?
                                    setEmptyCart(true) :
                                    navigation.navigate("ReviewCart")
                        // console.log(props.state.cartReducer?.cartCount, '[[[[[[[[[[[[[[', role)
                    }}
                >
                    <CartIcon
                        name="shoppingcart"
                        size={19}
                        color={color._border_orange}
                        style={{ marginLeft: 8, right: 5 }}

                    />
                </TouchableOpacity>
            </View>
            <Models.EmptyCartPopUp
                isVisible={emptyCart}
                onRequestClose={() => {
                    setEmptyCart(!emptyCart);
                }}
            />
        </View>
    )
}
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
    CartListRequest: (data) => dispatch(CartListRequest(data)),
});





export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader);






