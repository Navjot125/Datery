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
import React from "react";

import styles from "./ChangePasswordStyles";
import { BackHeader } from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
// import TextInputSimple from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as Model from "../../../Components/models";
import { Formik } from "formik";
import * as yup from "yup";
import { PASSWORD_VALIDATION } from "../../../Constants/ErrorMessages";
import { setLoader } from "../../../modules/Loader/actions";
import { API_URL } from "../../../Constants/Config";
import { changePasswordRequest } from "../../../modules/Login/actions";
import { ActivityIndicator } from "react-native-paper";
import color from "../../../Constants/Color";

const ChangePassword = (props) => {
  const ChangePasswordSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .required("Password is required")
      .matches(/\w*[A-Z]\w*/, PASSWORD_VALIDATION)
      .matches(/\w*[a-z]\w*/, PASSWORD_VALIDATION)
      .matches(/\d/, PASSWORD_VALIDATION)
      .matches(/[@#$!%*^?&]/, PASSWORD_VALIDATION)
      .min(8, ({ min }) => PASSWORD_VALIDATION),
    newPassword: yup
      .string()
      .required("Password is required")
      .matches(/\w*[A-Z]\w*/, PASSWORD_VALIDATION)
      .matches(/\w*[a-z]\w*/, PASSWORD_VALIDATION)
      .matches(/\d/, PASSWORD_VALIDATION)
      .matches(/[@#$!%*^?&]/, PASSWORD_VALIDATION)
      .min(8, ({ min }) => PASSWORD_VALIDATION),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
    // .required("Confirm Password is required")
  });

  const navigation = useNavigation();
  const [modalVisibleFailed, setModalVisibleFailed] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [modalVisibleAvailablity, setModalVisibleAvailablity] =
    React.useState(false);
  const onPlaceOrder = () => {
    setModalVisibleAvailablity(true);
    setModalVisibleFailed(false);
  };
  const onPlaceOrderFail = (msg) => {
    setMsg(msg)
    setModalVisibleAvailablity(false);
    setModalVisibleFailed(true);
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
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
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          // onSubmit={()=>console.log('fdfsdfd')}
          onSubmit={(values) => {
            let params = {
              endpoint: API_URL.changePassword,
              onPlaceOrder: onPlaceOrder,
              userToken: props.state.loginReducer.userToken,
              onPlaceOrderFail: onPlaceOrderFail,
            };
            // console.log(values, 'values',)
            props.changePasswordRequest(
              {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
              },
              params
            );
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldTouched,
            touched,
            isValid,
          }) => (
            <>
              <BackHeader title={"Change Password"} />
              <View style={{ flex: 1 }}>
                <Text style={styles.header}> Current Password </Text>
                <Atom.TextInputSimple
                  name="currentPassword"
                  onChangeText={handleChange("currentPassword")}
                  // onBlur={handleBlur('newPassword')}
                  value={values.currentPassword}
                  typePassword={true}
                />
                {touched.currentPassword && errors.currentPassword && (
                  <Text style={styles.inputErrorText}>
                    {errors.currentPassword}
                  </Text>
                )}
                <Text
                  onPress={() => navigation.navigate("ForgotPassword")}
                  style={styles.textinputStyle}
                >
                  Forgot password?
                </Text>
                <Text style={styles.header}> New Password </Text>
                <Atom.TextInputSimple
                  onChangeText={handleChange("newPassword")}
                  name="newPassword"
                  // onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  typePassword={true}
                />
                {touched.newPassword && errors.newPassword && (
                  <Text style={styles.inputErrorText}>
                    {errors.newPassword}
                  </Text>
                )}
                <Text style={styles.header}> Confirm Password </Text>
                <Atom.TextInputSimple
                  onChangeText={handleChange("confirmPassword")}
                  name="confirmPassword"
                  // onBlur={handleBlur('newPassword')}
                  value={values.confirmPassword}
                  typePassword={true}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.inputErrorText}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
              <Atom.Button
                // onPress={() => {
                // onPlaceOrder()
                // }}
                onPress={() => handleSubmit()}
                containerStyle={{ marginVertical: "8%" }}
                title={"SUBMIT"}
              />
            </>
          )}
        </Formik>
      </View>
      <Model.CommonPopUp
        isVisible={modalVisibleAvailablity}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Password successfully changed."
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt="BACK TO PROFILE"
        onPress={() => {
          setModalVisibleAvailablity(false), navigation.navigate("Profile");
        }}
      />
      <Model.CommonPopUp
        isVisible={modalVisibleFailed}
        title="Opps"
        titleTxt={{ fontSize: 24 }}
        // discription="Something went wrong, please try again."
        discription={msg}
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt="TRY AGAIN"
        onPress={() => setModalVisibleFailed(false)}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  changePasswordRequest: (data, navigation) =>
    dispatch(changePasswordRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
