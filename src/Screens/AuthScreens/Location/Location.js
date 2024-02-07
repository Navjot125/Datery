import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
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
import { connect } from "react-redux";
import { answerRequest, removeAnswer, setAnswer, setCity } from "../../../modules/SetAnswer/actions";
import { API_URL } from "../../../Constants/Config";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Location = (props) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => {
    setSearchQuery(query)
  };

  let filteredArray = []
  let mergedObject = {}
  const setAnsers = async () => {
    await props.setAnswer()
    filteredArray = props?.state?.answerReducer?.answers?.filter(item => item !== undefined && !Array.isArray(item));
    mergedObject = Object.assign({}, ...filteredArray);
  }
  let datingData



  const insertData = () => {
    let params = {
      endpoint: API_URL.datingDataInsert,
      userToken: props?.state?.loginReducer?.userToken ? props?.state?.loginReducer?.userToken :
        props.state?.signupReducer?.signupSucessData?.Usertoken,
      id: props?.state?.loginReducer?.UserData?._id ? props?.state?.loginReducer?.UserData?._id :
        props.state?.signupReducer?.signupSucessData?.UserData?._id,
      navigation: () =>
        navigation.navigate("Done")
    };
    datingData = [
      { userId: props?.state?.answerReducer?.userId?.userId },
      { age: props?.state?.answerReducer?.age?.age, },
      { gender: props?.state?.answerReducer?.gender?.gender, },
      { SexualOrientation: props?.state?.answerReducer?.SexualOrientation?.sexualOrientation, },
      { relationshipStatus: props?.state?.answerReducer?.relationshipStatus?.relationshipStatus, },
      { CurrentRelationshipLength: props?.state?.answerReducer?.CurrentRelationshipLength?.currentRelationshipLength, },
      { longestRealtionshipLength: props?.state?.answerReducer?.longestRealtionshipLength?.longestRelationshipLength, },
      { howManyDates: props?.state?.answerReducer?.howManyDates?.howManyDates, },
      { budget: props?.state?.answerReducer?.budget?.budget, },
      { typeOfDates: props?.state?.answerReducer?.typeOfDates?.typeOfDates, },
      { topic: props?.state?.answerReducer?.topic?.topic, },
      { datingCoach: props?.state?.answerReducer?.datingCoach?.datingCoach, },
      { kids: props?.state?.answerReducer?.kids?.kids, },
      { city: props?.state?.answerReducer?.city?.city, },
      { anniversary: props?.state?.answerReducer?.anniversary?.anniversary, },
      { PartnerBirthday: props?.state?.answerReducer?.PartnerBirthday?.PartnerBirthday, },
    ]
    removeUndefinedObjects = (datingData) => {
      return datingData.filter(obj => {
        for (let key in obj) {
          if (obj[key] === undefined) {
            return false;
          }
        }
        return true;
      });
    }
    filteredArray = removeUndefinedObjects(datingData)?.filter(item => item !== undefined && !Array.isArray(item));
    mergedObject = Object.assign({}, ...filteredArray);
    props.answerRequest(mergedObject, params);
  }
  return (
    <SafeAreaView style={styles.container}>
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
        <BackHeader />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={1}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          
          <Text style={styles.textStyle}>13 of 13</Text>
        </View>
        <Text style={styles.textHeading}>What city do you live in?</Text>
        <View style={{ flex: 1, marginTop: "8%" }}>
          {/* <Searchbar
            placeholder="Search for a city"
            placeholderTextColor={'grey'} 
            onChangeText={onChangeSearch}
            value={searchQuery}
            iconColor={color._primary_orange}
            style={{
              backgroundColor: "#F8F7FA",
              height: 40,
            }}
            inputStyle={{
              fontFamily: fonts.REGULAR,
              fontSize: 16,
              // color: "#000000",
              color:'black',
              alignSelf: "center",
              // opacity: 0.4,
              // lineHeight: 11,
              justifyContent:'center',
              alignItems:'center',
            }}
          /> */}
          <GooglePlacesAutocomplete
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
              props.setCity({
                city: [{ locationName: details?.formatted_address }, { latlong: [details?.geometry?.location.lng, details?.geometry?.location.lat] },
                { placeId: details?.place_id }]
              })
            }}
            query={{
              key: 'AIzaSyCWbsC3b6QgedZG8VQe2ux5lovNGxTptZM',
              language: 'en',
            }}
            currentLocation={true}
            currentLocationLabel='Current location'
          />
        </View>
        <Atom.Button
          onPress={() => {
            // insertData()
            navigation.navigate("Root", { screen: "Home" });
          }}
          containerStyle={{
            marginBottom: "8%"
          }}
          title={"NEXT"}
        />
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer: (data, navigation) =>
    dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) =>
    dispatch(removeAnswer(data, navigation)),
  answerRequest: (data, navigation) =>
    dispatch(answerRequest(data, navigation)),
  setCity: (data) => dispatch(setCity(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
