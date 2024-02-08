import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import styles from "./SignUpStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { roleRequest } from "../../../modules/Role/actions";
import { signupRequest } from "../../../modules/SignUp/actions";
import { API_URL } from "../../../Constants/Config";
import { validateEmail } from "../../../Constants/Validation";
import { Formik } from "formik";
import * as yup from "yup";
import { PASSWORD_VALIDATION } from "../../../Constants/ErrorMessages";
import { setLoader } from "../../../modules/Loader/actions";
import { removeAnswer } from "../../../modules/SetAnswer/actions";
import CustomIcon from "../../../assets/CustomIcon";

const SignUp = (props) => {
  // const [isChecked, setIsChecked] = useState(false);

  const SignupFormSchema = yup.object().shape({
    userName: yup
      .string()
      .required("Username is required")
      .min(3, "Must be at least 3 characters"),
    email: yup
      .string()
      .email("Please provide valid email")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(/\w*[A-Z]\w*/, PASSWORD_VALIDATION)
      .matches(/\w*[a-z]\w*/, PASSWORD_VALIDATION)
      .matches(/\d/, PASSWORD_VALIDATION)
      .matches(/[@#$!%*^?&]/, PASSWORD_VALIDATION)
      .min(8, ({ min }) => PASSWORD_VALIDATION),
  });

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <CustomIcon
        type={"MaterialIcons"}
        name={"arrow-back"}
        size={30}
        style={{ left: 20, top: 5 }}
        color={color._black}
        onPress={() => {
          navigation.goBack();
        }}
      />
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
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainView}>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
              role: "user",
              isChecked: false,
            }}
            validationSchema={SignupFormSchema}
            // onSubmit={values => {
            //   let params = {
            //     endpoint: API_URL.Signup,
            //     changeRole: props.roleRequest,
            //     navigation: () =>
            //       navigation.navigate('Welcome'),
            //   };
            //   const callbackSignUp = () => {
            //     // console.log('hello callback');
            //   }
            //   props.signupRequest(values, params, callbackSignUp);
            // }}
            onSubmit={() => {
              navigation.navigate("Welcome");
            }}
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
            }) => (
              <>
                <Image
                  resizeMode="contain"
                  source={LOGO_ORANGE}
                  style={styles.logoImage}
                />
                <Text style={styles.mainHeading}>Sign Up</Text>
                <Text style={styles.textHeading}>
                  Sign up to create a Datery profile
                </Text>
                <View style={{ paddingHorizontal: 12 }}>
                  <Atom.TextInput
                    TextIcon={"account-outline"}
                    placeholder="Username"
                    name="userName"
                    onChangeText={handleChange("userName")}
                    // onBlur={handleBlur('userName')}
                    value={values.userName}
                  />
                  {touched.userName && errors.userName && (
                    <Text style={styles.inputErrorText}>{errors.userName}</Text>
                  )}
                  <Atom.TextInput
                    TextIcon={"email-outline"}
                    name="email"
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    // onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.inputErrorText}>{errors.email}</Text>
                  )}
                  <Atom.TextInput
                    TextIcon={"key"}
                    name="Password"
                    typePassword={true}
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    // onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.inputErrorText}>{errors.password}</Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    right: "2%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.SEMI_BOLD,
                      fontSize: 12,
                      color: color._primary_orange,
                    }}
                  >
                    Have an account?{" "}
                  </Text>
                  <TouchableOpacity activeOpacity={0.9}>
                    <Text
                      onPress={() => navigation.navigate("Login")}
                      style={{
                        color: color._primary_orange,
                      }}
                    >
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: "5%",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <CustomIcon
                      type={"MaterialCommunityIcons"}
                      name={
                        values.isChecked
                          ? "checkbox-marked"
                          : "checkbox-blank-outline"
                      }
                      size={25}
                      onPress={() =>
                        setFieldValue("isChecked", !values.isChecked)
                      }
                      color={color._primary_orange}
                      style={{ right: 5 }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: fonts.MEDIUM,
                        opacity: 0.5,
                        color: color._black,
                      }}
                    >
                      {
                        "Yes, I would like to received personalized Datery emails with suggested dates."
                      }
                    </Text>
                  </View>
                  <Atom.Button
                    containerStyle={{
                      paddingHorizontal: 12,
                      marginVertical: "8%",
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}
                    title={"SIGN UP"}
                  />
                  <Text
                    style={{
                      fontFamily: fonts.REGULAR,
                      fontSize: 12,
                      color: color._black,
                    }}
                  >
                    Or sign up with
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 19,
                      marginBottom: 10,
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.9}>
                      <Image source={GOOGLE_LOGO} style={styles.logo} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9}>
                      <Image source={APPLE_LOGO} style={styles.logo} />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  signupRequest: (data, navigation, callbackSignUp) =>
    dispatch(signupRequest(data, navigation, callbackSignUp)),
  roleRequest: (data) => dispatch(roleRequest(data)),
  setLoader: (data) => dispatch(setLoader(data)),
  removeAnswer: (data) => dispatch(removeAnswer(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
