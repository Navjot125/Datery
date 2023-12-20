import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import styles from "./WelcomeStyle";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import * as Models from "../../../Components/models";
import { API_URL } from "../../../Constants/Config";
import { questionRequest } from "../../../modules/GetQuestions/actions";
import { setUserId } from "../../../modules/SetAnswer/actions";
import { merchantRequest } from "../../../modules/Merchants/actions";

const Welcome = (props) => {
  const navigation = useNavigation();
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Image
          resizeMode="cover"
          source={LOGO_ORANGE}
          style={styles.logoImage}
        />
        <Text style={styles.mainHeading}>Hello!</Text>
        <Text style={styles.headings}>Thank you for joining Comfility.</Text>
        <Text style={styles.heading2}>
          We are here to help you succeed in the ever-changing dating world.
        </Text>
        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={styles.textStyle}>
            No matter your relationship status, age, background, or dating
            history, Comfility is here for you!
          </Text>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.text2}>
              Continue to update your dating profile to maximize your
              experience.
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}

              onPress={() => {
                props.setUserId({
                  userId: props?.state?.loginReducer?.loginData?._id ? props?.state?.loginReducer?.loginData?._id :
                    props?.state?.signupReducer?.signupSucessData?.UserData?._id
                })
                navigation.navigate('Age')
              }}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonText}> CONITINUE </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                const token = userToken ? userToken : Usertoken;
                let data = { sortby: 'Price' }
                let params = {
                  endpoint: API_URL.fetchAllServices,
                  coordinates: null,
                  serviceType: null,
                  token
                };
                props.merchantRequest(data, params)
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Root', params: { screen: 'Home' } }],
                })
                // navigation.navigate('Root', {
                //   screen: 'Home',
                //   // params: { elapsedTime: elapsedTimeInSeconds }
                // })
                // navigation.navigate("HomeTab", { screen: "Home" })
              }}
            >
              <Text style={styles.orangeText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  questionRequest: (data, navigation) =>
    dispatch(questionRequest(data, navigation)),
  setUserId: (data) => dispatch(setUserId(data)),
  merchantRequest: (data, navigation) => dispatch(merchantRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
