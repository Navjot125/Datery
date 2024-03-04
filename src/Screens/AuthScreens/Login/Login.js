import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { memo, useState } from "react";
import styles from "./LoginStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import * as Atom from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { roleRequest } from "../../../modules/Role/actions";
import { Formik } from "formik";
import * as yup from "yup";
import { API_URL } from "../../../Constants/Config";
import { PASSWORD_VALIDATION2 } from "../../../Constants/ErrorMessages";
import {
  loginFail,
  loginRequest,
  loginSuccess,
} from "../../../modules/Login/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { removeAnswer } from "../../../modules/SetAnswer/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import axiosClient from "../../../Utils/ApiClient";
import { addToCartSuccess } from "../../../modules/Cart/actions";
import { GoogleSignin } from "@react-native-community/google-signin";
import { showAlertError } from "../../../Common/Functions/CommonFunctions";
import { ActivityIndicator } from "react-native-paper";
import { put } from "redux-saga/effects";

const Login = memo(
  (props) => {
    const { userToken, loginData } = useSelector((state) => state.loginReducer);
    const { signupSucessData } = useSelector((state) => state.signupReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // Initialize GoogleSignIn
    // GoogleSignin.configure({
    //   webClientId: '290737786940-o9vntbtq736av2h54cvjmq8ncq9ee70i.apps.googleusercontent.com',
    // });

    const googleLogin = async () => {
      GoogleSignin.configure({
        offlineAccess: true,
        webClientId:
          "290737786940-o9vntbtq736av2h54cvjmq8ncq9ee70i.apps.googleusercontent.com",
      });
      try {
        await GoogleSignin.signOut();
        const idToken = await GoogleSignin.signIn();
        // try {
        let params = {
          endpoint: API_URL.socialSignUp,
          changeRole: props.roleRequest,
          navigation: () => navigation.navigate("Welcome"),
          navigation2: () =>
            navigation.navigate("Root", {
              screen: "Home",
            }),
        };
        // console.log({
        //   socialMediaID: idToken.user.id,
        //   email: idToken.user.email,
        //   userName: idToken.user.name,
        // }, "LOGGg")
        // await onLogIn(params, {
        //   socialMediaID: idToken.user.id,
        //   email: idToken.user.email,
        //   userName: idToken.user.name,
        //   signUpType: "google",
        // });
      } catch (err) {
        console.log("Error in googleLogin ----", err);
      }
    };

    const onLogIn = async (params, data) => {
      try {
        dispatch(setLoader(true));
        let res = await axiosClient.post(params.endpoint, data);
        if (res?.data?.status) {
          console.log(res.data);
          dispatch(loginSuccess(res.data));
          dispatch(addToCartSuccess(res.data?.cartcount));
          params.changeRole({ user: "user", id: 2 });
          let apiData = {
            endpoint: API_URL.getProfile,
            offset: 0,
            userToken: userToken ? userToken : signupSucessData?.Usertoken,
            id: {
              userId: loginData._id
                ? loginData._id
                : signupSucessData?.UserData?._id,
            },
          };
          dispatch(datingProfileRequest(apiData));
          res?.data?.userProfile == true
            ? params.navigation2()
            : params.navigation();
        } else {
          showAlertError(res.data.message);
          dispatch(loginFail());
        }
      } catch (e) {
        console.log("error", e);
      }
    };

    const SignupFormSchema = yup.object().shape({
      email: yup
        .string()
        .email("Please provide valid email")
        .required("Email is required")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"),
      password: yup
        .string()
        .required("Password is required")
        .min(3, ({ min }) => PASSWORD_VALIDATION2),
    });

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainView}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignupFormSchema}
              onSubmit={async (data) => {
                let params = {
                  endpoint: API_URL.login,
                  changeRole: props.roleRequest,
                  cb: (data) => dispatch(datingProfileRequest(data)),
                  // cb: (data) => console.log(data, "apiData-----------"),
                  navigation: () => navigation.navigate("Welcome"),
                  navigation2: () =>
                    navigation.navigate("Root", {
                      screen: "Home",
                    }),
                };
                dispatch(loginRequest(params, data));
                // onLogIn(params, data);
              }}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <>
                  <Image
                    resizeMode="contain"
                    source={LOGO_ORANGE}
                    style={styles.logoImage}
                  />
                  <Text style={styles.textHeading}>
                    Sign in to your Datery profile
                  </Text>
                  <View>
                    <Atom.TextInput
                      name="email"
                      TextIcon={"email-outline"}
                      placeholder="Email"
                      onChangeText={(txt) => setFieldValue("email", txt)}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.inputErrorText}>{errors.email}</Text>
                    )}
                    <Atom.TextInput
                      name="password"
                      TextIcon={"key"}
                      typePassword={true}
                      placeholder="Password"
                      onChangeText={handleChange("password")}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.inputErrorText}>
                        {errors.password}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        onPress={() => navigation.navigate("ForgotPassword")}
                        style={styles.textinputStyle}
                      >
                        Forgot password?
                      </Text>
                      <Pressable
                        onPress={() => {
                          navigation.navigate("SignUp");
                        }}
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: fonts.REGULAR,
                            fontSize: 14,
                            color: color._primary_orange,
                          }}
                        >
                          Not a member?{" "}
                        </Text>
                        <TouchableOpacity activeOpacity={0.9}>
                          <Text
                            onPress={() => navigation.navigate("SignUp")}
                            style={{
                              color: color._font_orange,
                            }}
                          >
                            Sign up
                          </Text>
                        </TouchableOpacity>
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text
                      style={{
                        marginTop: "10%",
                        color: color._font_black,
                        fontFamily: fonts.MEDIUM,
                        fontSize: 12,
                      }}
                    >
                      By continuing, you agree to Datery’s
                      <Text style={{ color: color._font_orange }}>
                        {" "}
                        Terms of Service{" "}
                      </Text>
                      and acknowledge Datery's
                      <Text
                        onPress={() => {}}
                        style={{ color: color._font_orange }}
                      >
                        {" "}
                        Privacy Policy{" "}
                      </Text>
                    </Text>
                    <Atom.Button
                      onPress={handleSubmit}
                      // onPress={() => {
                      //   navigation.reset({
                      //     index: 0,
                      //     routes: [{ name: 'Root', params: { screen: 'Home' } }],
                      //   })
                      // }}
                      containerStyle={{
                        paddingHorizontal: 12,
                        marginVertical: 28,
                      }}
                      title={"SIGN IN"}
                    />
                    <Text
                      style={{
                        fontFamily: fonts.REGULAR,
                        fontSize: 12,
                        color: color._black,
                      }}
                    >
                      Or log in with
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 19,
                        marginBottom: 10,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          googleLogin();
                        }}
                      >
                        <Image source={GOOGLE_LOGO} style={styles.logo} />
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.9}>
                        <Image source={APPLE_LOGO} style={styles.logo} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{ marginBottom: 20 }}
                      onPress={() => navigation.replace("Root")}
                    >
                      <Text style={styles.textinputStyle}>
                        Countinue as Guest
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  },
  (prev, next) => {
    return (
      prev.props?.state?.profileReducer?.role ===
      next.props?.state?.profileReducer?.role
    );
  }
);
const mapStateToProps = (state) => ({
  state: state,
});
const mapDispatchToProps = (dispatch) => ({
  loginRequest: (data, navigation, callback) =>
    dispatch(loginRequest(data, navigation, callback)),
  roleRequest: (data) => dispatch(roleRequest(data)),
  setLoader: (data) => dispatch(setLoader(data)),
  removeAnswer: (data) => dispatch(removeAnswer(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
