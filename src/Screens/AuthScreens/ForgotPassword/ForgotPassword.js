import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";

import styles from "./ForgotPasswordStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as Models from "../../../Components/models";
import { Formik } from "formik";
import * as yup from "yup";
import { API_URL } from "../../../Constants/Config";
import axiosClient from "../../../Utils/ApiClient";
import { showAlertError } from "../../../Common/Functions/CommonFunctions";

const ForgotPassword = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const ForgotSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please provide valid email")
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"),
  });
  const onForgotRequest = async (params, data) => {
    console.log(data, "------data");
    try {
      let res = await axiosClient.post(params.endpoint, data);
      if (res?.data?.status) {
        console.log("onForgotRequest - ", res.data);
        setModalVisible(!modalVisible);
      } else {
        showAlertError(res.data.message);
      }
    } catch (err) {
      console.log("error in onForgotRequest", err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Molecules.BackHeader />
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ForgotSchema}
          onSubmit={async (data) => {
            let params = {
              endpoint: API_URL.forgotPassword,
            };
            onForgotRequest(params, data);
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
            <View style={styles.screenView}>
              <Image
                resizeMode="contain"
                source={LOGO_ORANGE}
                style={styles.logoImage}
              />
              <Text style={styles.mainHeading}>Forgot Password?</Text>
              <Text style={styles.textHeading}>
                Enter your email below, and we'll send you a link to reset your
                password.
              </Text>
              <View style={{ paddingHorizontal: 12 }}>
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
              </View>
              <Atom.Button
                // onPress={() => {
                //   setModalVisible(!modalVisible);
                // }}
                onPress={handleSubmit}
                containerStyle={{ paddingHorizontal: 12, marginVertical: "8%" }}
                title={"SUBMIT"}
              />
            </View>
          )}
        </Formik>
      </View>
      <Models.CommonPopUp
        title={"Successful"}
        discription={"We have emailed you a link to reset your password."}
        isVisible={modalVisible}
        btnTxt={"BACK TO LOGIN"}
        onPress={() => {
          setModalVisible(!modalVisible);
          navigation.navigate("Login");
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
