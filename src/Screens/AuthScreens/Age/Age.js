import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ProgressBar, Searchbar } from "react-native-paper";
import styles from "./AgeStyles";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { ScrollView } from "react-native-virtualized-view";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import { APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import * as PopUp from "../../../Components/models";
import * as Model from "../../../Components/models";
import { API_URL } from "../../../Constants/Config";
import { questionRequest } from "../../../modules/GetQuestions/actions";
import {
  removeAnswer,
  setAge,
  setGender,
  setSexualOrientation,
  answerRequest,
  setAnswer,
  setCity,
} from "../../../modules/SetAnswer/actions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CustomIcon from "../../../assets/CustomIcon";
import DatePicker from "react-native-date-picker";
const TouchableOpacityOrange = (props) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          borderRadius: 122,
          width: 161,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderColor: color._border_orange,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Mulish-Bold",
            fontSize: 16,

            lineHeight: 20,
            color: color._font_Dark,

            textAlign: "center",
          }}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const DATA = [
  { _id: 1, name: "17 - 19" },
  { _id: 2, name: "20 - 25" },
  { _id: 3, name: "26 - 30" },
  { _id: 4, name: "30 - 35" },
  { _id: 5, name: "35 - 40" },
  { _id: 6, name: "40 - 45" },
  { _id: 7, name: "45 - 50" },
  { _id: 8, name: "50 - 60" },
  { _id: 9, name: "60 - 70" },
  { _id: 10, name: "70+" },
];

const DATA1 = [
  { _id: 11, name: "Commitment" },
  { _id: 2, name: "Sex" },
  { _id: 3, name: "Finances" },
  { _id: 4, name: "Romance" },
  { _id: 5, name: "First Dates" },
  { _id: 6, name: "Dating" },
  { _id: 7, name: "Marriage" },
  { _id: 8, name: "Gifts" },
  { _id: 9, name: "Family" },
  { _id: 10, name: "Closure" },
];

const Age = (props) => {
  const navigation = useNavigation();
  var question = props?.state?.questionsReducer?.questions[0]?.question;
  var data = props?.state?.questionsReducer?.questions[0]?.value;
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [relationshipStatus, setRelationshipStatus] = React.useState(null);
  const [modalVisibleAvailablity, setModalVisibleAvailablity] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [sexualOrientation, setSexualOrientation] = React.useState();
  const [currentRelationshipLength, setCurrentRelationshipLength] =
    React.useState();
  const [longestRelationshipLength, setLongestRealtionshipLength] =
    React.useState();
  const [howManyDates, setHowManyDates] = React.useState();
  const [datingCoach, setDatingCoach] = React.useState();
  const [topic, setTopic] = React.useState();
  const [typeOfDates, settypeOfDates] = React.useState([]);
  const [kids, setKids] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [budget, setBudget] = React.useState();
  const [anniversary, setAnniversary] = React.useState();
  const [PartnerBirthday, setPartnerBirthday] = React.useState();
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  // const { Usertoken, signupSucessData } = useSelector(state => state)
  const Usertoken = useSelector(
    (state) => state?.signupReducer?.signupSucessData?.Usertoken
  );
  const [date, setDate] = useState(new Date());
  const datePickerRef = useRef(null);

  const handleDateChange = (newDate) => {
    setDate(new Date(newDate));
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.onPressDate();
    }
  };

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

  const insertData = () => {
    // console.log(props?.state?.loginReducer)
    const token = userToken ? userToken : Usertoken;
    let params = {
      endpoint: API_URL.datingDataInsert,
      token,
      id: props?.state?.loginReducer?.UserData?._id
        ? props?.state?.loginReducer?.UserData?._id
        : props.state?.signupReducer?.signupSucessData?.UserData?._id
        ? props.state?.signupReducer?.signupSucessData?.UserData?._id
        : props.state?.loginReducer?.loginData?._id,
      navigation: () =>
        navigation.reset({
          index: 0,
          routes: [{ name: "Done", params: { screen: "Done" } }],
        }),
      // navigation.navigate("Done")
    };
    console.log(params);
    datingData = [
      { userId: props?.state?.answerReducer?.userId?.userId },
      { age: age },
      { gender: gender },
      { SexualOrientation: sexualOrientation },
      { relationshipStatus: relationshipStatus },
      { CurrentRelationshipLength: currentRelationshipLength },
      { longestRealtionshipLength: longestRelationshipLength },
      { howManyDates: howManyDates },
      { budget: budget },
      { typeOfDates: typeOfDates },
      { topic: topic },
      { datingCoach: datingCoach },
      { kids: kids },
      // { city: city, },
      { anniversary: anniversary },
      { PartnerBirthday: PartnerBirthday },
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

  const [step, setStep] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <CustomIcon
          type={"AntDesign"}
          name={"arrowleft"}
          color={color._black}
          size={30}
          onPress={() => {
            {
              step == 1 && navigation.goBack();
            }
            setStep((step) => step - 1);
          }}
        />
        <View style={{ marginTop: 29 }}>
          <ProgressBar
            progress={step / 13}
            color={color._primary_orange}
            style={styles.progressBox}
          />
          <Text style={styles.textStyle}>{step} of 13</Text>
        </View>
        {step == 1 && (
          <>
            <Text style={styles.textHeading}>What is your age?</Text>
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                marginTop: 52,
                flex: 1,
              }}
            >
              <Molecules.SelectItem
                DATA={DATA}
                onChange={(data) => {
                  setAge(data.name);
                  // console.log(data.name, 'data value ')
                }}
                multiSelect={false}
                numColumns={2}
                double={true}
              />
            </View>
          </>
        )}
        {step == 2 && (
          <>
            <Text style={styles.textHeading}>
              Which of the following best describes your gender identity?
            </Text>

            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                marginTop: "8%",
              }}
            >
              <Molecules.SelectItem
                DATA={[
                  { _id: 4, name: "Male" },
                  { _id: 2, name: "Female" },
                  { _id: 3, name: "Non-binary" },
                  { _id: 5, name: "I do not identify with these options" },
                ]}
                onChange={(data) => {
                  setGender({ gender: data.name });
                }}
              />
            </View>
          </>
        )}
        {step == 3 && (
          <>
            <Text style={styles.textHeading}>
              What is your sexual orientation?
            </Text>

            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                marginTop: "8%",
              }}
            >
              <Molecules.SelectItem
                DATA={[
                  { _id: 4, name: "Exclusively attracted to women" },
                  { _id: 2, name: "Mostly attracted to women" },
                  { _id: 3, name: "Exclusively attracted to men" },
                  { _id: 5, name: "Mostly attracted to men" },
                  { _id: 6, name: "Equally attracted to men and women" },
                  { _id: 7, name: "Asexual or non-sexual" },
                ]}
                onChange={(data) => {
                  setSexualOrientation({ sexualOrientation: data.name });
                }}
              />
            </View>
          </>
        )}

        {step == 4 && (
          <>
            <Text style={styles.textHeading}>
              What is your relationship status?
            </Text>

            <View style={{ flex: 1, marginTop: "8%" }}>
              <Molecules.SelectItem
                DATA={[
                  { _id: 4, name: "Single" },
                  { _id: 2, name: "Dating" },
                  { _id: 3, name: "In a relationship" },
                  { _id: 5, name: "Married" },
                ]}
                onChange={(data) => {
                  setRelationshipStatus({ relationshipStatus: data.name });
                  setRelationshipStatus(data.name);
                  // console.log("DATTTTTT", data.name);
                }}
              />
              {relationshipStatus !== "Single" &&
                relationshipStatus !== null && (
                  <View style={{ marginTop: "2%" }}>
                    <Pressable
                      onPress={() =>
                        // openDatePicker()
                        setModalVisible(true)
                      }
                    >
                      <Atom.TextInput
                        TextIcon={"calendar"}
                        iconColor={color._mediumGray}
                        placeholder={"Anniversary"}
                        editable={false}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setModalVisible(true);
                      }}
                    >
                      <Atom.TextInput
                        TextIcon={"calendar"}
                        iconColor={color._mediumGray}
                        placeholder={"Partner’s Birthday"}
                        editable={false}
                      />
                    </Pressable>
                  </View>
                )}
            </View>
          </>
        )}
        {step == 5 && (
          <>
            <Text style={styles.textHeading}>
              How long have you been in your current relationship?
            </Text>

            <View style={{ flex: 1, marginTop: "8%" }}>
              <Molecules.SelectItem
                DATA={[
                  { _id: 4, name: "9+ Years" },
                  { _id: 2, name: "5 - 9 Years" },
                  { _id: 3, name: "3 - 5 Years" },
                  { _id: 5, name: "1 - 3 Years" },
                  { _id: 6, name: "6 -12 months" },
                  { _id: 7, name: "Less than 6 Months" },
                ]}
                onChange={(data) => {
                  setCurrentRelationshipLength({
                    currentRelationshipLength: data.name,
                  });
                }}
              />
            </View>
          </>
        )}
        {step == 6 && (
          <>
            <Text style={styles.textHeading}>
              How long has your longest relationship been?
            </Text>

            <View style={{ flex: 1, marginTop: "8%" }}>
              <Molecules.SelectItem
                DATA={[
                  { _id: 4, name: "9+ Years" },
                  { _id: 2, name: "5 - 9 Years" },
                  { _id: 3, name: "3 - 5 Years" },
                  { _id: 5, name: "1 - 3 Years" },
                  { _id: 6, name: "6 -12 months" },
                  { _id: 7, name: "Less than 6 Months" },
                ]}
                onChange={(data) => {
                  setLongestRealtionshipLength({
                    longestRelationshipLength: data.name,
                  });
                }}
              />
            </View>
          </>
        )}
        {step == 7 && (
          <>
            <Text style={styles.textHeading}>
              How many “official dates” have you been on in the last six months?
            </Text>

            <View style={{ flex: 1, marginTop: "8%" }}>
              <Molecules.SelectItem
                DATA={[
                  { _id: 4, name: "10+ dates" },
                  { _id: 2, name: "8 - 9 dates" },
                  { _id: 3, name: "5 - 7 dates" },
                  { _id: 5, name: "3 - 4 dates" },
                  { _id: 6, name: "1 - 2 dates" },
                  { _id: 7, name: "None" },
                ]}
                onChange={(data) => {
                  setHowManyDates({ howManyDates: data.name });
                }}
              />
            </View>
          </>
        )}
        {step == 8 && (
          <>
            <Text style={styles.textHeading}>
              What is averge amount of money you perfer to spend on a date?
            </Text>

            <View style={{ flex: 1, marginTop: "8%" }}>
              <Molecules.SelectItem
                DATA={[
                  { _id: 4, name: "$300+" },
                  { _id: 2, name: "$200 - $300" },
                  { _id: 3, name: "$150 - $200" },
                  { _id: 5, name: "$100 - $150" },
                  { _id: 6, name: "$50 - $100" },
                  { _id: 7, name: "$50 or less" },
                  { _id: 8, name: "I don’t pay for dates" },
                ]}
                onChange={(data) => {
                  setBudget({ budget: data.name });
                }}
              />
            </View>
          </>
        )}
        {step == 9 && (
          <>
            <Text style={styles.textHeading}>
              What kind of date activities are you interested in?
            </Text>
            <Text style={styles.orangeText}>( Select all that apply )</Text>
            <View style={{ flex: 1, marginTop: "8%" }}>
              <Molecules.SelectItem
                DATA={[
                  { _id: 10, name: "Instructional Classes" },
                  { _id: 2, name: "Active & Adventurous" },
                  { _id: 3, name: "SPA & Massages" },
                  { _id: 4, name: "Food & Drinks" },
                  { _id: 5, name: "Guided Tours" },
                  { _id: 6, name: "Entertainment" },
                  { _id: 7, name: "DIY" },
                  { _id: 8, name: "Free/ Low Cost" },
                ]}
                onChange={(data) => {
                  // console.log(data, 'type of dates on change data')
                  settypeOfDates({ typeOfDates: data });
                }}
                multiSelect={true}
              />
            </View>
          </>
        )}
        {step == 10 && (
          <>
            <Text style={styles.textHeading}>
              Which relationship topics are you interested in learning about?
            </Text>
            <Text style={styles.orangeText}>( Select all that apply )</Text>
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                marginTop: 24,
              }}
            >
              <Molecules.SelectItem
                DATA={DATA1}
                onChange={(data) => {
                  setTopic({ topic: data });
                }}
                multiSelect={true}
                numColumns={2}
                double={true}
              />
            </View>
          </>
        )}
        {step == 11 && (
          <>
            <Text style={styles.textHeading}>
              How likely are you to seek relationship advice from a dating or
              relationship coach?
            </Text>

            <View style={{ flex: 1, marginTop: "8%" }}>
              <Molecules.SelectItem
                DATA={[
                  { _id: 1, name: "Very Likely" },
                  { _id: 2, name: "Likely" },
                  { _id: 3, name: "Slightly Likely" },
                  { _id: 4, name: "Slightly Unlikely" },
                  { _id: 5, name: "Unlikely" },
                  { _id: 6, name: "Very Unlikely" },
                ]}
                onChange={(data) => {
                  setDatingCoach({ datingCoach: data.name });
                }}
              />
            </View>
          </>
        )}
        {step == 12 && (
          <>
            <Text style={styles.textHeading}>
              Do you have kids under 12 years old?
            </Text>

            <View style={{ flex: 1, marginTop: "8%" }}>
              <Molecules.SelectItem
                DATA={[
                  { _id: 1, name: "Yes" },
                  { _id: 2, name: "No" },
                ]}
                onChange={(data) => {
                  setKids({ kids: data.name });
                }}
              />
            </View>
          </>
        )}
        {step == 13 && (
          <>
            <Text style={styles.textHeading}>What city do you live in?</Text>
            <View style={{ flex: 1, marginTop: "8%" }}>
              {/* {/* <Searchbar
                  placeholder="Search for a city"
                  placeholderTextColor={'grey'}
                  onChangeText={(data, details = null) => {
                    props.setCity({
                      city: [{ locationName: details?.formatted_address }, { latlong: [details?.geometry?.location.lng, details?.geometry?.location.lat] },
                      { placeId: details?.place_id }]
                    })
                  }}
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
                    color: 'black',
                    alignSelf: "center",
                    // opacity: 0.4,
                    // lineHeight: 11,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }} */}
              {/* /> */}

              <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  props.setCity({
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
                }}
                query={{
                  key: "AIzaSyCWbsC3b6QgedZG8VQe2ux5lovNGxTptZM",
                  language: "en",
                }}
                currentLocation={true}
                currentLocationLabel="Current location"
              />
            </View>
          </>
        )}

        <Atom.Button
          onPress={() => {
            {
              step == 13
                ? // insertData()
                  navigation.navigate("AddCard", { fromOnboarding: true })
                : setStep((step) => step + 1);
            }
            // props.setAge(age)
            // navigation.navigate("Gender");
          }}
          containerStyle={{ marginBottom: "8%" }}
          title={"NEXT"}
        />
      </View>

      {/* <DatePicker
        ref={datePickerRef}
        style={{ width: 200 }}
        date={date}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        minDate="2023-01-01"
        maxDate="2030-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={handleDateChange}
      /> */}

      <PopUp.DatePcr
        date={date}
        isVisible={modalVisible}
        onDateChange={handleDateChange}
        onPress={() => {
          // navigation.navigate("PurchasedActivity"),
          setModalVisible(!modalVisible);
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      {/* <Model.CommonPopUp
        isVisible={false}
        // onRequestClose={() => { setModalVisibleAvailablity(false) }}
        title="Plan Dates"
        titleTxt={{ fontSize: 24 }}
        discription="User account required to plan dates."
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt={"SIGN IN"}
        onPress={() => { setModalVisibleAvailablity(false) }}
      /> */}
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) => dispatch(removeAnswer(data, navigation)),
  setAge: (data) => dispatch(setAge(data)),
  answerRequest: (data, navigation) =>
    dispatch(answerRequest(data, navigation)),
  setCity: (data) => dispatch(setCity(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Age);
