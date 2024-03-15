import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { ProgressBar } from "react-native-paper";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { useNavigation } from "@react-navigation/native";
import { BackHeader } from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import styles from "./LocationStyle";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  answerRequest,
  removeAnswer,
  setAnswer,
  setCity,
} from "../../../modules/SetAnswer/actions";
import { API_URL } from "../../../Constants/Config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Location = (props) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState();
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const Usertoken = useSelector(
    (state) => state?.signupReducer?.signupSucessData?.Usertoken
  );
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  let filteredArray = [];
  let mergedObject = {};
  const setAnsers = async () => {
    await props.setAnswer();
    filteredArray = props?.state?.answerReducer?.answers?.filter(
      (item) => item !== undefined && !Array.isArray(item)
    );
    mergedObject = Object.assign({}, ...filteredArray);
  };
  let datingData;

  const setLoc = (details) => {
    setCity({
      ...city,
      city: [
        { locationName: details?.formatted_address },
        {
          latlong: [
            details?.geometry?.location.lng,
            details?.geometry?.location.lat,
          ],
        },
        { placeId: details?.place_id },
      ],
    });
  };
  const insertData2 = () => {
    const token = userToken ? userToken : Usertoken;
    let params = {
      mergedObject: city,
      endpoint: API_URL.datingDataInsert,
      token,
      id: props?.state?.loginReducer?.UserData?._id
        ? props?.state?.loginReducer?.UserData?._id
        : props.state?.signupReducer?.signupSucessData?.UserData?._id
        ? props.state?.signupReducer?.signupSucessData?.UserData?._id
        : props.state?.loginReducer?.loginData?._id,
      navigation: () => navigation.navigate("Root", { screen: "Home" }),
    };
    console.log("mergedObject", params);
    dispatch(answerRequest(params));
    // props.answerRequest(mergedObject, params);
  };

  const insertData = () => {
    let params = {
      endpoint: API_URL.datingDataInsert,
      userToken: props?.state?.loginReducer?.userToken
        ? props?.state?.loginReducer?.userToken
        : props.state?.signupReducer?.signupSucessData?.Usertoken,
      id: props?.state?.loginReducer?.UserData?._id
        ? props?.state?.loginReducer?.UserData?._id
        : props.state?.signupReducer?.signupSucessData?.UserData?._id,
      navigation: () => navigation.navigate("Done"),
    };
    datingData = [
      { userId: props?.state?.answerReducer?.userId?.userId },
      { age: props?.state?.answerReducer?.age?.age },
      { gender: props?.state?.answerReducer?.gender?.gender },
      {
        SexualOrientation:
          props?.state?.answerReducer?.SexualOrientation?.sexualOrientation,
      },
      {
        relationshipStatus:
          props?.state?.answerReducer?.relationshipStatus?.relationshipStatus,
      },
      {
        CurrentRelationshipLength:
          props?.state?.answerReducer?.CurrentRelationshipLength
            ?.currentRelationshipLength,
      },
      {
        longestRealtionshipLength:
          props?.state?.answerReducer?.longestRealtionshipLength
            ?.longestRelationshipLength,
      },
      { howManyDates: props?.state?.answerReducer?.howManyDates?.howManyDates },
      { budget: props?.state?.answerReducer?.budget?.budget },
      { typeOfDates: props?.state?.answerReducer?.typeOfDates?.typeOfDates },
      { topic: props?.state?.answerReducer?.topic?.topic },
      { datingCoach: props?.state?.answerReducer?.datingCoach?.datingCoach },
      { kids: props?.state?.answerReducer?.kids?.kids },
      { city: props?.state?.answerReducer?.city?.city },
      { anniversary: props?.state?.answerReducer?.anniversary?.anniversary },
      {
        PartnerBirthday:
          props?.state?.answerReducer?.PartnerBirthday?.PartnerBirthday,
      },
    ];
    removeUndefinedObjects = (datingData) => {
      return datingData.filter((obj) => {
        for (let key in obj) {
          if (obj[key] === undefined) {
            return false;
          }
        }
        return true;
      });
    };
    filteredArray = removeUndefinedObjects(datingData)?.filter(
      (item) => item !== undefined && !Array.isArray(item)
    );
    mergedObject = Object.assign({}, ...filteredArray);
    props.answerRequest(mergedObject, params);
  };
  return (
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
      <View style={styles.mainView}>
        <BackHeader />
        <View style={{ marginTop: 29 }}>
          {/* <ProgressBar
            progress={1}
            color={color._primary_orange}
            style={styles.progressBox}
          /> */}

          {/* <Text style={styles.textStyle}>13 of 13</Text> */}
        </View>
        <Text style={styles.textHeading}>What city do you live in?</Text>
        <View style={{ flex: 1, marginTop: "8%" }}>
          <GooglePlacesAutocomplete
            placeholder={"Search"}
            fetchDetails={true}
            onPress={(data, details) => {
              setLoc(details);
            }}
            query={{
              key: "AIzaSyCWbsC3b6QgedZG8VQe2ux5lovNGxTptZM",
              language: "en",
            }}
            enablePoweredByContainer={false}
            currentLocation={true}
            textInputProps={{
              placeholderTextColor: "black",
              returnKeyType: "search",
            }}
            currentLocationLabel="Current location"
            styles={{
              textInputContainer: {
                height: 50,
                // width: 164,
                padding: 5,
                borderWidth: 1,
                borderColor: "#DCDCDD",
                borderRadius: 50,
                alignSelf: "flex-end",
              },
              textInput: {
                borderRadius: 50,
                height: 36,
                fontFamily: fonts.REGULAR,
                alignSelf: "center",
                fontSize: 12,
                color: color._black,
                top: 2,
              },
              listView: {
              },
              row: {
                height: 40,
                flexDirection: "row",
              },
              separator: {
                height: 0.5,
                backgroundColor: "#c8c7cc",
              },
              loader: {
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 20,
              },
            }}
          />
        </View>
        <Atom.Button
          onPress={() => {
            insertData2();
            // insertData()
            // navigation.navigate("Root", { screen: "Home" });
          }}
          containerStyle={{
            marginBottom: "8%",
          }}
          title={"NEXT"}
        />
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) => dispatch(removeAnswer(data, navigation)),
  answerRequest: (data, navigation) =>
    dispatch(answerRequest(data, navigation)),
  setCity: (data) => dispatch(setCity(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
