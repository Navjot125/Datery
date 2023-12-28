import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
  Pressable
} from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import styles from "./LoginStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import * as Atom from "../../../Components/atoms";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { roleRequest } from "../../../modules/Role/actions";
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { API_URL } from "../../../Constants/Config";
import { PASSWORD_VALIDATION, REQUIRED_ERROR_MESSAGE } from "../../../Constants/ErrorMessages";
import { loginFail, loginRequest, loginSuccess } from "../../../modules/Login/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { removeAnswer } from "../../../modules/SetAnswer/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import CustomIcon from "../../../assets/CustomIcon";
import Images from "../../../assets/Images";
import axiosClient from "../../../Utils/ApiClient";
import { addToCartSuccess } from "../../../modules/Cart/actions";
import { GoogleSignin } from '@react-native-community/google-signin';


const Login = memo((props) => {

  // console.log('Component rendered');
  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { signupSucessData } = useSelector(state => state.signupReducer)
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [checkImg, setCheckImg] = useState(false)
  const [googleToken, setGoogleToken] = useState()


  // Initialize GoogleSignIn
  // GoogleSignin.configure({
  //   webClientId: '290737786940-o9vntbtq736av2h54cvjmq8ncq9ee70i.apps.googleusercontent.com',
  // });



  const googleLogin = async () => {
    GoogleSignin.configure({
      offlineAccess: true, webClientId: '290737786940-o9vntbtq736av2h54cvjmq8ncq9ee70i.apps.googleusercontent.com',
    });
    try {
      await GoogleSignin.signOut()
      const idToken = await GoogleSignin.signIn();
      // try {
      let params = {
        endpoint: API_URL.socialSignUp,
        changeRole: props.roleRequest,
        navigation: () =>
          navigation.navigate('Welcome'),
        navigation2: () => navigation.navigate('Root', {
          screen: 'Home',
          // params: { elapsedTime: elapsedTimeInSeconds }
        })

        //   navigation2: () =>
        //     navigation.navigate("HomeTab", { screen: "Home" })

      };
      // console.log({
      //   socialMediaID: idToken.user.id,
      //   email: idToken.user.email,
      //   userName: idToken.user.name,
      // }, "LOGGg") 
      await onLogIn(params, {
        socialMediaID: idToken.user.id,
        email: idToken.user.email,
        userName: idToken.user.name,
        signUpType: 'google'
      })
    }
    catch (err) {
      // console.log(err)
    }
  }





  // const handleResSign = async () => {
  //   try {
  //     let params = {
  //       endpoint: API_URL.socialSignUp,
  //       changeRole: props.roleRequest,
  //       navigation: () =>
  //         navigation.navigate('Welcome'),
  //       navigation2: () => navigation.navigate('Root', {
  //         screen: 'Home',
  //         // params: { elapsedTime: elapsedTimeInSeconds }
  //       })

  //       //   navigation2: () =>
  //       //     navigation.navigate("HomeTab", { screen: "Home" })

  //     };
  //     onLogIn(params, {
  //       socialMediaID: googleToken.user.id,
  //       email: googleToken.user.email,
  //       userName: googleToken.user.name,
  //     })
  //     console.log(googleToken.user.name, "LOGGg")
  //     // navigation.navigate('Root', {
  //     //   screen: 'Home',
  //     //   // params: { elapsedTime: elapsedTimeInSeconds }
  //     // })
  //     // setRecipt(res.data.cartItem)
  //   }
  //   catch (error) {
  //     console.log("ERR", error)
  //   }
  // }

  const onLogIn = async (params, data) => {
    try {
      // console.log(data,'data',params,'params')
      let res = await axiosClient.post(params.endpoint, data)
      if (res) {
        console.log(res?.data, '..--------------------------------------------..');
        if (res?.data?.status) {
          console.log(res.data)
          // await put(setLoader(false));
          // showAlertSuccess(res.data.message);
          dispatch(loginSuccess(res.data));
          dispatch(addToCartSuccess(res.data?.cartcount));
          // await put(removeAnswer())
          // await dispatch(loginSuccess(res.data));
          // showAlert(res.data.message);
          // console.log(res.data.message, ' message from saga login ', params.changeRole, "ROLLEEE");
          params.changeRole({ user: 'user', id: 2 })
          let apiData = {
            endpoint: API_URL.getProfile,
            offset: 0,
            userToken: userToken ? userToken :
              signupSucessData?.Usertoken,
            id: {
              userId: loginData._id ? loginData._id :
                signupSucessData?.UserData?._id
            },
            // navigation: () =>
            //   // console.log("hi")
          };


          dispatch(datingProfileRequest(apiData))
          res?.data?.userProfile == true ?
            params.navigation2() : params.navigation()
          // callback({ params: params })
          // await call(datingProfileRequest(params));

        } else {
          // await put(setLoader(false));
          // showAlertError(res.data.message)
          dispatch(loginFail());
          // showAlert(res.data.message);
          // console.log(res.data.message);
        }
      } else {
        // await put(setLoader(false));
        // showAlert(res.data.message)
        // console.log(REQUIRED_ERROR_MESSAGE);
        // showAlert(ERROR_MESSAGE);
      }
    }
    catch (e) {
      // console.log(e)
    }
  }




  const SignupFormSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please provide valid email')
      .required('Email is required')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        // /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/,
        'Please provide a valid email',
      ),
    password: yup
      .string()
      .required('Password is required')
      // .matches(/\w*[A-Z]\w*/, PASSWORD_VALIDATION)
      // .matches(/\w*[a-z]\w*/, PASSWORD_VALIDATION)
      // .matches(/\d/, PASSWORD_VALIDATION)
      // .matches(/[@#$!%*^?&]/, PASSWORD_VALIDATION)
      .min(3, ({ min }) => PASSWORD_VALIDATION),
  });

  return (
    <SafeAreaView style={styles.container} >
      <CustomIcon
        type={'MaterialIcons'}
        name={'arrow-back'}
        size={30}
        style={{ left: 20, top: 5 }}
        color={color._black}
        onPress={() => {
          navigation.goBack()
        }}
      />
      {/* {console.log(props.state.loaderReducer.loader, 'loader')} */}
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
          {/* <ActivityIndicator
            // animating={props.state.loaderReducer?.loader}
            // style={{zIndex:4}}
            size="large" color={color._primary_orange} /> */}
        </View>
      }
      < ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false} >
        <View style={styles.mainView}>
          <Formik
            initialValues={{
              // userName: '',
              // email: 'param@gmail.com',
              email: "",
              // password: 'delhi@1A',
              password: '',
              role: 'user',
              isChecked: false
              // role: props.selectedRole.id,
            }}
            validationSchema={SignupFormSchema}
            // validateOnChange={false}
            // onSubmit={()=>console.log('fdfsdfd')}
            onSubmit={async (data) => {
              // console.log("hello")
              let params = {
                endpoint: API_URL.login,
                changeRole: props.roleRequest,
                navigation: () =>
                  navigation.navigate('Welcome'),
                navigation2: () => navigation.navigate('Root', {
                  screen: 'Home',
                  // params: { elapsedTime: elapsedTimeInSeconds }
                })

                //   navigation2: () =>
                //     navigation.navigate("HomeTab", { screen: "Home" })

              };

              // console.log(values)
              // props.loginRequest(values, params);
              // try {

              //   dispatch(loginRequest(values, params))
              // } catch (e) {
              //   console.log(e, 'err')
              // }
              // console.log(data, 'data', params, 'navigation --------------- ');
              // yield put(setLoader(true));
              onLogIn(params, data)
            }
            }
          >
            {({
              handleChange,
              // handleBlur,
              handleSubmit,
              values,
              errors,
              // setFieldTouched,
              touched,
              // isValid,
              setFieldValue,
              // handleReset,
              // validateOnChange
              // handlePress
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
                    onChangeText={(txt) => setFieldValue('email', txt)}

                    // onBlur={handleBlur('email')} 
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    < Text style={styles.inputErrorText}>
                      {errors.email}
                    </Text>
                  )}
                  <Atom.TextInput
                    name="password"
                    TextIcon={"key"}
                    typePassword={true}
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    // onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.inputErrorText}>
                      {errors.password}
                    </Text>
                  )}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <Text
                      onPress={() => navigation.navigate("ForgotPassword")}
                      style={styles.textinputStyle}
                    >
                      Forgot password?
                    </Text>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("SignUp")
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
                          // marginTop: 29,
                          // marginBottom: 29,
                        }}
                      >
                        Not a member?{" "}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.9}

                      >
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
                <View style={{ flexDirection: "row", marginTop: "5%" }}>

                  <CustomIcon
                    type={'MaterialCommunityIcons'}
                    name={values.isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
                    size={25}
                    onPress={() => setFieldValue('isChecked', !values.isChecked)}
                    color={color._primary_orange}
                    style={{ right: 5 }}
                  />
                  {/* </TouchableOpacity> */}
                  <Text style={{
                    fontSize: 12,
                    fontFamily: fonts.MEDIUM,
                    // opacity: 0.5,
                    color: color._black,
                  }}>
                    {
                      "Yes, I would like to received personalized Comfility emails with suggested dates."
                    }
                  </Text>
                </View>

                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Text
                    style={{
                      marginTop: '10%',
                      color: color._font_black,
                      fontFamily: fonts.MEDIUM,
                      fontSize: 12,
                    }}
                  >
                    By continuing, you agree to Comfilitiy’s
                    <Text style={{ color: color._font_orange }}>
                      {" "}
                      Terms of Service{" "}
                    </Text>
                    and acknowledge Comfility's
                    <Text onPress={() => { }} style={{ color: color._font_orange }}>
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
                    containerStyle={{ paddingHorizontal: 12, marginVertical: 48 }}
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
                    style={{ flexDirection: "row", marginTop: 19, marginBottom: 10 }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.9}

                      onPress={() => {
                        googleLogin()
                      }}

                    >
                      <Image source={GOOGLE_LOGO} style={styles.logo} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.9}

                    >
                      <Image source={APPLE_LOGO} style={styles.logo} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.9}

                    style={{ marginBottom: 20 }}
                    onPress={() => navigation.replace("Root")}
                  >
                  </TouchableOpacity>

                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView >
    </SafeAreaView >
  );
}, (prev, next) => {
  return prev.props?.state?.profileReducer?.role === next.props?.state?.profileReducer?.role
});

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
