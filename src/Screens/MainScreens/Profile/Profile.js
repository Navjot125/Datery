import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import * as Atom from "../../../Components/atoms";
import styles from "./ProfileStyle";
import { fontConfig } from "react-native-paper/lib/typescript/src/styles/fonts";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import DropShadow from "react-native-drop-shadow";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { roleRequest } from "../../../modules/Role/actions";
import ProfileGuestUser from "../../GuestScreens/ProfileGuestUser/ProfileGuestUser";
import {
  removeAll,
  signOutRequest,
  signOutSuccess,
} from "../../../modules/Login/actions";
import { API_URL } from "../../../Constants/Config";
import {
  aboutComfilityRequest,
  datingProfileRequest,
} from "../../../modules/Profile/actions";
import { setLoader } from "../../../modules/Loader/actions";
import axiosClient from "../../../Utils/ApiClient";
import { REQUIRED_ERROR_MESSAGE } from "../../../Constants/ErrorMessages";

const Profile = (props) => {
  const navigation = useNavigation();
  const role = props?.state?.roleReducer?.role?.id;
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state?.loaderReducer);
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { signupSucessData } = useSelector((state) => state.signupReducer);
  const SignupToken = signupSucessData?.Usertoken;
  const [recent, setRecent] = useState();
  const userName = loginData?.userName
    ? loginData?.userName
    : signupSucessData?.UserData?.userName;
  const email = loginData?.email
    ? loginData?.email
    : signupSucessData?.UserData?.email;
  const isFocused = useIsFocused();

  useEffect(() => {
    handleRecentPurchase();
  }, [isFocused]);

  const DATA = [
    {
      id: "1",
      title: "Dating Profile",
      onPress: () => {
        navigation.navigate("DatingProfile");
      },
    },
    // {
    //   id: "2",
    //   title: "Purchase History ",
    //   onPress: () => navigation.navigate("PurchaseHistory"),
    // },
    {
      id: "3",
      title: "Payment Methods",
      onPress: () => navigation.navigate("PaymentMethods"),
    },
    {
      id: "4",
      title: "Reviews",
      onPress: () => navigation.navigate("UserReviews"),
    },
    {
      id: "5",
      title: "Notifications",
      onPress: () => navigation.navigate("NotificationsSetting"),
    },
    {
      id: "6",
      title: "Location",
      onPress: () => navigation.navigate("LocationSetting"),
    },
    {
      id: "7",
      title: "Email Preferences ",
      onPress: () => navigation.navigate("EmailPreference"),
    },
    {
      id: "8",
      title: "Change Password",
      onPress: () => navigation.navigate("ChangePassword"),
    },
    {
      id: "9",
      title: "Customer Support",
      onPress: () => {
        let params = {
          endpoint: API_URL.aboutComfilityget,
          type: { type: "Customer Support" },
          navigation: () => navigation.navigate("CustomerSupport"),
        };
        props.aboutComfilityRequest(params);
      },
    },
    // {
    //   id: "10",
    //   title: "Join the Datery Marketplace",
    //   onPress: () => console.log("hi")
    // },
    {
      id: "11",
      title: "Rate & Review Us",
      onPress: () => console.log("hi"),
    },
    {
      id: "12",
      title: "About Datery",
      onPress: () => navigation.navigate("AboutComfility"),
    },
    {
      id: "13",
      title: "Sign out",
      onPress: async () => {
        handleSignOut();
      },
    },
  ];

  const handleSignOut = async () => {
    try {
      let params = {
        endpoint: API_URL.logOut,
        changeRole: props.roleRequest,
        userToken: userToken ? userToken : SignupToken,
        navigation: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Root", params: { screen: "Profile" } }],
          }),
      };
      dispatch(signOutRequest(params));
    } catch (error) {
      console.log(error?.response?.data, "EEEe in handleSignOut", error);
    }
  };

  const handleNavigate = () => {
    navigation.navigate("PurchaseHistory");
  };
  const handleRecentPurchase = async () => {
    try {
      const res = await axiosClient.get(API_URL.recentPurchase, {
        params: { userId: loginData?._id },
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken ? userToken : SignupToken,
        },
      });
      if (res.data.status) setRecent(res.data.cartItem);
    } catch (error) {
      console.log("ERR in handleRecentPurchase2", error?.response?.data);
    }
  };

  const Item = ({ title, onPress }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.item}
      onPress={() => {
        onPress();
      }}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const showData = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          elevation: 5, // Add elevation for shadow (Android only)
          borderRadius: 15,
          // flex: 1,
          marginVertical: 5,
          // backgroundColor:'red'
        }}
        onPress={() => {
          navigation.navigate("PurchasedActivity", { bId: item._id });
        }}
      >
        <View style={[styles.card]}>
          <Image
            source={{
              uri: `http://54.92.82.16:3001/data/${item?.providerImage}`,
            }}
            style={{
              height: 95,
              width: 110,
              borderRadius: 6,
              marginHorizontal: 5,
            }}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 5,
              // backgroundColor:'red'
              // padding: 15,
              // width: "80%",
            }}
          >
            <Text style={styles.textTitle}>{item.serviceName}</Text>
            <Text style={styles.textBetween}> {item.providerName}</Text>
            <Text style={styles.textLoc}>{"$160"}</Text>
            <TouchableOpacity activeOpacity={0.9} style={styles.mediaType2}>
              <Text style={styles.mediaType}>
                <Icon
                  name={"calendar-alt"}
                  size={11}
                  color={color._primary_orange}
                />
                {"  "}
                {item?.time ? item?.time : "Buy Now, Book Later"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {role == 2 ? (
        <SafeAreaView style={styles.container}>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
          >
            <View style={styles.view}>
              {/* <Text style={styles.mainHeading}>{props.state.profileReducer?.datingData?.userName}</Text> */}
              <Text style={styles.mainHeading}>{userName}</Text>
              <Text style={styles.textHeading}>{email}</Text>
              {/* <View style={styles.mainView}> */}
              {/* <Text style={styles.title2}>Recent Purchase</Text>
                <FlatList
                  data={recent?.splice(0, 1)}
                  keyExtractor={(item) => item.id}
                  renderItem={showData}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />

                <Atom.Button
                  onPress={handleNavigate}
                  // containerStyle={{ marginTop: 28 }}
                  title={"See All Purchases"}
                /> */}
              {/* </View> */}
              <View style={{ marginTop: 10, marginBottom: 41 }}>
                {/* <Text
                  style={{
                    fontFamily: fonts.SEMI_BOLD,
                    fontSize: 16,
                    color: color._font_grey,
                    marginBottom: 5,
                    fontWeight: "600",
                  }}
                >
                  Settings
                </Text> */}
                <FlatList
                  scrollEnabled={false}
                  data={DATA}
                  renderItem={({ item }) => (
                    <Item title={item.title} onPress={item.onPress} />
                  )}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <ProfileGuestUser />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
  setLoader: (data) => dispatch(setLoader(data)),
  signOutRequest: (data) => dispatch(signOutRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
  aboutComfilityRequest: (data, navigation) =>
    dispatch(aboutComfilityRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
