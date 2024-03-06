import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  InteractionManager,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import color from "../../../Constants/Color";
import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-native-element-dropdown";
import styles from "./DatingProfileStyle";
import { BackHeader } from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
import * as Model from "../../../Components/models";
import { useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import {
  datingProfileRequest,
  updateProfileRequest,
} from "../../../modules/Profile/actions";
import { API_URL } from "../../../Constants/Config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import fonts from "../../../Constants/Fonts";
import { ActivityIndicator } from "react-native-paper";

const DatingProfile = (props) => {
  // defaultButtonText
  // Sexual Orientation
  // Longest Relationship
  const datingData = useSelector((state) => state?.profileReducer?.datingData);
  const navigation = useNavigation();
  const userName = props.state?.profileReducer?.datingData?.userName;
  const [modalVisibleAvailablity, setModalVisibleAvailablity] =
    React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [typeOfDatesBool, seTtypeOfDatesBool] = React.useState(true);
  const [age, setAge] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.age
  );
  const [gender, setGender] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.gender
  );
  // "currentRelationshipLength": "3 - 5 Years", Not
  const [sexualOrientation, setSexualOrientation] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.sexualOrientation
  );
  const [relationshipStatus, setRelationshipStatus] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.relationshipStatus
  );
  const [anniversary, setAnniversary] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.anniversary
  );
  const [partnerBirthday, setPartnerBirthday] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.PartnerBirthday
  );
  const [longestRelationship, setLongestRelationship] = useState(
    props.state?.profileReducer?.datingData?.userProfile
      ?.longestRelationshipLength
  );
  const [dates, setDates] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.howManyDates
  );
  const [budget, setBudget] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.budget
  );
  const [kids, setKids] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.kids
  );
  const [city, setCity] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.locationAddress
  );
  const [datingCoach, setDatingCoach] = useState(
    props.state?.profileReducer?.datingData?.userProfile?.datingCoach
  );
  const [updateDatingData, setUpdateDatingData] = useState({});
  const [dateActivities, setDateActivities] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loader, setLoader] = useState(true);
  const role = props.state.roleReducer.role.id;
  let types = props.state?.profileReducer?.datingData?.userProfile?.typeOfDates;
  let topicsFromReducer =
    props.state?.profileReducer?.datingData?.userProfile?.topic;
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setUpdateDatingData({
        ...updateDatingData,
        userId: props.state.loginReducer?.loginData._id
          ? props.state.loginReducer?.loginData._id
          : props.state?.signupReducer?.signupSucessData?.UserData?._id,
      });
      renderInitialValues();
      renderInitialValuesOfTopics();
      let timeout = setTimeout(() => {
        setLoader(false);
      }, 300);
      return () => {
        if (timeout) clearTimeout(timeout);
      };
    });
  }, []);

  // ["Active & Adventurous", "Food & Drinks", "Entertainment"] types
  // console.log(props.state.profileReducer?.datingData?.userName, '[-==-==-==-=]');
  let activities = [];
  let dataTopicsArray = [];
  const [dateTopics, setDateTopics] = useState([
    {
      id: 1,
      title: "Commitment",
      checked: false,
    },
    {
      id: 2,
      title: "Sex",
      checked: false,
    },
    {
      id: 3,
      title: "Finances",
      checked: false,
    },
    {
      id: 4,
      title: "Romance",
      checked: false,
    },
    {
      id: 5,
      title: "First Dates",
      checked: false,
    },
    {
      id: 6,
      title: "Dating",
      checked: false,
    },
    {
      id: 7,
      title: "Marriage",
      checked: false,
    },
    {
      id: 8,
      title: "Gifts",
      checked: false,
    },
    {
      id: 9,
      title: "Family",
      checked: false,
    },
    {
      id: 10,
      title: "Closure",
      checked: false,
    },
  ]);
  const [checkBoxArray, setCheckBoxArray] = useState([
    {
      id: 1,
      title: "Instructional Classes",
      checked: false,
    },
    {
      id: 2,
      title: "Active & Adventurous",
      checked: false,
    },
    {
      id: 3,
      title: "SPA & Massages",
      checked: false,
    },
    {
      id: 4,
      title: "Food & Drinks",
      checked: false,
    },
    {
      id: 5,
      title: "Guided Tours",
      checked: false,
    },
    {
      id: 6,
      title: "Entertainment",
      checked: false,
    },
    {
      id: 7,
      title: "DIY",
      checked: false,
    },
    {
      id: 8,
      title: "Free / Low Cost",
      checked: false,
    },
  ]);

  const setLoc = (details) => {
    setUpdateDatingData({
      ...updateDatingData,
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
  const onPlaceOrder = () => {
    function addObjectProperty(obj, dateActivities, topics) {
      dateActivities?.length > 0 ? (obj.typeOfDates = dateActivities) : obj;
      topics?.length > 0 ? (obj.topic = topics) : obj;
      return obj;
    }
    const updatedObject = addObjectProperty(
      updateDatingData,
      dateActivities,
      topics
    );
    // console.log(updatedObject, 'updatedObject----------------------------');
    let data = {
      updateDatingData: updatedObject,
      endpoint: API_URL.editProfile,
      userToken: props?.state?.loginReducer?.userToken
        ? props?.state?.loginReducer?.userToken
        : props.state?.signupReducer?.signupSucessData?.Usertoken,
    };
    props.updateProfileRequest(data);
    setModalVisibleAvailablity(true);
  };

  const DropDown = (props) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <Text style={styles.textinputStyle}>{props.titleText}</Text>
        <Dropdown
          style={styles.dropdown}
          // defaultButtonText
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.inputSearchStyle}
          itemContainerStyle={{
            height: 40,
            marginHorizontal: 5,
            marginVertical: 5,
          }}
          containerStyle={{}}
          data={props.data}
          dropdownPosition={"bottom"}
          labelField="label"
          valueField="value"
          search
          searchPlaceholder="Search..."
          value={props.value}
          onChange={(item) => {
            props.setValue(item.value);
          }}
        />
      </View>
    );
  };

  const ageData = [
    { value: "17 - 19", label: "17 - 19" },
    { value: "20 - 25", label: "20 - 25" },
    { value: "26 - 30", label: "26 - 30" },
    { value: "30 - 35", label: "30 - 35" },
    { value: "35 - 40", label: "35 - 40" },
    { value: "40 - 45", label: "40 - 45" },
    { value: "45 - 50", label: "45 - 50" },
    { value: "50 - 60", label: "50 - 60" },
    { value: "60 - 70", label: "60 - 70" },
    { value: "70+", label: "70+" },
  ];

  const genderData = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Non-binary", label: "Non-binary" },
    {
      value: "I do not identify with these options",
      label: "I do not identify with these options",
    },
  ];

  const SexualOrientationData = [
    {
      value: "Exclusively attracted to women",
      label: "Exclusively attracted to women",
    },
    { value: "Mostly attracted to women", label: "Mostly attracted to women" },
    {
      value: "Exclusively attracted to men",
      label: "Exclusively attracted to men",
    },
    { value: "Mostly attracted to men", label: "Mostly attracted to men" },
    {
      value: "Equally attracted to men and women",
      label: "Equally attracted to men and women",
    },
    { value: "Asexual or non-sexual", label: "Asexual or non-sexual" },
  ];
  const RelationshipStatusData = [
    { value: "Single", label: "Single" },
    { value: "Dating", label: "Dating" },
    { value: "In a relationship", label: "In a relationship" },
    { value: "Married", label: "Married" },
  ];

  const LongestRelationshipData = [
    { value: "9+ Years", label: "9+ Years" },
    { value: "5 - 9 Years", label: "5 - 9 Years" },
    { value: "3 - 5 Years", label: "3 - 5 Years" },
    { value: "1 - 3 Years", label: "1 - 3 Years" },
    { value: "6 -12 months", label: "6 -12 months" },
    { value: "Less than 6 Months", label: "Less than 6 Months" },
  ];

  const HowManyDatesData = [
    { value: "10+ dates", label: "10+ dates" },
    { value: "8 - 9 dates", label: "8 - 9 dates" },
    { value: "5 - 7 dates", label: "5 - 7 dates" },
    { value: "3 - 4 dates", label: "3 - 4 dates" },
    { value: "1 - 2 dates", label: "1 - 2 dates" },
    { value: "None", label: "None" },
  ];

  const BudgetData = [
    { value: "$300+", label: "$300+" },
    { value: "$200 - $300", label: "$200 - $300" },
    { value: "$150 - $200", label: "$150 - $200" },
    { value: "$100 - $150", label: "$100 - $150" },
    { value: "$50 - $100", label: "$50 - $100" },
    { value: "$50 or less", label: "$50 or less" },
    { value: "I don’t pay for dates", label: "I don’t pay for dates" },
  ];

  const KidsData = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
  ];

  const DatingCoachData = [
    { value: "Very Likely", label: "Very Likely" },
    { value: "Likely", label: "Likely" },
    { value: "Slightly Likely", label: "Slightly Likely" },
    { value: "Slightly Unlikely", label: "Slightly Unlikely" },
    { value: "Unlikely", label: "Unlikely" },
    { value: "Very Unlikely", label: "Very Unlikely" },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, marginTop: 24 }}>
        <Atom.CheckBox
          label={item.title}
          containerStyle={{}}
          // checkValue = {typeOfDatesBool}
          // checkValue ={checkValue}
          checkValue={item.checked}
          labelStyle={styles.labelStyle}
          onPress={() => onPressChange(item)}
          status={checked ? "checked" : "unchecked"}
          // status={types[0] == item.title ? 'checked' : 'unchecked'}
        />
      </View>
    );
  };
  const onLoad = async () => {
    let apiData = {
      endpoint: API_URL.getProfile,
      userToken: props?.state?.loginReducer?.userToken
        ? props?.state?.loginReducer?.userToken
        : props.state?.signupReducer?.signupSucessData?.Usertoken,
      id: {
        userId: props.state.loginReducer?.loginData._id
          ? props.state.loginReducer?.loginData._id
          : props.state?.signupReducer?.signupSucessData?.UserData?._id,
      },
    };
    role == 2
      ? (props.datingProfileRequest(apiData), console.log("workinf"))
      : null;
    props.setLoader(false);
  };

  const renderTopicsItem = ({ item }) => {
    return (
      <View style={{ flex: 1, marginTop: 24 }}>
        <Atom.CheckBox
          label={item.title}
          containerStyle={{}}
          checkValue={item.checked}
          labelStyle={styles.labelStyle}
          // onPress={(e) => console.log(e, 'njbh')}
          onPress={() => onPressChangeTopics(item)}
          // status={checked ? 'checked' : 'unchecked'}
          status={checked ? "checked" : "unchecked"}
        />
      </View>
    );
  };

  const onPressChange = (newData) => {
    const newChecked = checkBoxArray.map((item) => {
      if (newData.title.includes(item.title)) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setCheckBoxArray(newChecked);
    newChecked.map((e) => {
      if (e.checked == true) {
        activities.push(e.title);
        setDateActivities(activities);
      }
    });
  };
  const onPressChangeTopics = (newData) => {
    const newChecked = dateTopics.map((item) => {
      if (newData.title.includes(item.title)) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setDateTopics(newChecked);
    newChecked.map((e) => {
      if (e.checked == true) {
        dataTopicsArray.push(e.title);
        setTopics(dataTopicsArray);
      }
    });
  };

  const renderInitialValues = () => {
    const updatedCheckBoxArray = checkBoxArray.map((item) => {
      if (types?.includes(item.title)) {
        return {
          ...item,
          checked: true,
        };
      }
      return item;
    });
    setCheckBoxArray(updatedCheckBoxArray);
  };
  const renderInitialValuesOfTopics = () => {
    const updatedTopicsArray = dateTopics.map((item) => {
      if (topicsFromReducer?.includes(item.title)) {
        return {
          ...item,
          checked: true,
        };
      }
      return item;
    });
    setDateTopics(updatedTopicsArray);
  };

  // console.log(props.state.profileReducer?.datingData?.userProfile?.locationAddress);
  return (
    <SafeAreaView
      style={[
        styles.scrollView,
        loader && {
          justifyContent: "center",
        },
      ]}
    >
      {loader ? (
        <ActivityIndicator color={color._primary_orange} size={"large"} />
      ) : (
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.mainView]}>
            <>
              <BackHeader title={"Dating Profile"} />
              <View style={{ flex: 1 }}>
                <Text style={styles.header}>Initial Setup</Text>
                <Text
                  style={[
                    styles.textinputStyle,
                    { color: color._primary_orange },
                  ]}
                >
                  Onboarding
                </Text>
                <Text style={styles.header}>Answers</Text>
                <DropDown
                  titleText={"Age"}
                  data={ageData}
                  value={age}
                  // labelField="label"
                  // value={value}
                  // setValue={setAge}
                  // setValue={(value) => { setAge(value), setUpdateDatingData([...updateDatingData, { 'age': value }]) }}
                  // setValue={(value) => { setAge(value), onChangeDropDown({ key: 'age', age: value }) }}
                  setValue={(value) => {
                    setAge(value),
                      setUpdateDatingData({ ...updateDatingData, age: value });
                  }}
                />
                {/* {console.log(updateDatingData, 'kdfndkjsbfsddnsa')} */}
                <DropDown
                  titleText={"Gender Identity"}
                  data={genderData}
                  value={gender}
                  // setValue={setGender}
                  setValue={(value) => {
                    setGender(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        gender: value,
                      });
                  }}
                  // setValue={(value) => { setGender(value), setUpdateDatingData([...updateDatingData, { 'gender': value }]) }}
                />
                <DropDown
                  titleText={"Sexual Orientation"}
                  data={SexualOrientationData}
                  value={sexualOrientation}
                  setValue={(value) => {
                    setSexualOrientation(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        sexualOrientation: value,
                      });
                  }}
                  //setValue={setSexualOrientation}
                />
                <DropDown
                  titleText={"Relationship Status"}
                  data={RelationshipStatusData}
                  value={relationshipStatus}
                  // setValue={setRelationshipStatus}
                  setValue={(value) => {
                    setRelationshipStatus(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        relationshipStatus: value,
                      });
                  }}
                />
                <DropDown
                  titleText={"Anniversary"}
                  data={ageData}
                  value={anniversary}
                  // setValue={setAnniversary}
                  setValue={(value) => {
                    setAnniversary(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        anniversary: value,
                      });
                  }}
                />
                <DropDown
                  titleText={"Partner’s Birthday"}
                  data={ageData}
                  value={partnerBirthday}
                  // setValue={setPartnerBirthday}
                  setValue={(value) => {
                    setPartnerBirthday(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        PartnerBirthday: value,
                      });
                  }}
                />
                <DropDown
                  titleText={"Longest Relationship"}
                  data={LongestRelationshipData}
                  value={longestRelationship}
                  // setValue={setLongestRelationship}
                  setValue={(value) => {
                    setLongestRelationship(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        longestRelationshipLength: value,
                      });
                  }}
                />
                <DropDown
                  titleText={"Number of dates in the past six months"}
                  data={HowManyDatesData}
                  value={dates}
                  // setValue={setDates}
                  setValue={(value) => {
                    setDates(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        howManyDates: value,
                      });
                  }}
                />
                <DropDown
                  titleText={"Average amount of money per date"}
                  data={BudgetData}
                  value={budget}
                  // setValue={setBudget}
                  setValue={(value) => {
                    setBudget(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        budget: value,
                      });
                  }}
                />
                <DropDown
                  titleText={"Kids under the age of 12 years old"}
                  data={KidsData}
                  value={kids}
                  // setValue={setKids}
                  setValue={(value) => {
                    setKids(value),
                      setUpdateDatingData({ ...updateDatingData, kids: value });
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 18,
                    zIndex: 2,
                  }}
                >
                  <Text style={styles.textinputStyle}>Current City</Text>
                  <GooglePlacesAutocomplete
                    placeholder={
                      updateDatingData?.city?.[0]?.locationName
                        ? updateDatingData?.city?.[0]?.locationName
                        : props.state.profileReducer?.datingData?.userProfile
                            ?.locationAddress
                        ? props.state.profileReducer?.datingData?.userProfile
                            ?.locationAddress
                        : "Search"
                    }
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
                        height: 40,
                        width: 164,
                        padding: 5,
                        borderWidth: 1,
                        borderColor: "#DCDCDD",
                        borderRadius: 50,
                        alignSelf: "flex-end",
                      },
                      textInput: {
                        placeholderTextColor: "red",
                        borderRadius: 50,
                        height: 36,
                        fontFamily: fonts.REGULAR,
                        // backgroundColor: "#F8F7FA",
                        alignSelf: "center",
                        fontSize: 12,
                        color: color._black,
                        top: 2,
                      },
                      listView: {
                        // backgroundColor: 'yellow'
                      },
                      row: {
                        // backgroundColor: '#FFFFFF',
                        // backgroundColor: 'red',
                        // padding: 13,
                        height: 40,
                        flexDirection: "row",
                      },
                      separator: {
                        height: 0.5,
                        backgroundColor: "#c8c7cc",
                      },
                      // description: {},
                      loader: {
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        height: 20,
                      },
                    }}
                  />
                </View>
                {/* <DropDown
              titleText={"Current City"}
              data={ageData}
              value={city}
              // setValue={setCity}
              setValue={(value) => { setCity(value), setUpdateDatingData({ ...updateDatingData, locationCordinates: value }) }}
            /> */}
                <DropDown
                  titleText={"Seek advice from a dating/relationship coach"}
                  data={DatingCoachData}
                  value={datingCoach}
                  // setValue={setDatingCoach}
                  setValue={(value) => {
                    setDatingCoach(value),
                      setUpdateDatingData({
                        ...updateDatingData,
                        datingCoach: value,
                      });
                  }}
                />
                <Text style={styles.header}>Date Activity Interests</Text>
                <FlatList
                  data={checkBoxArray}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  scrollEnabled={false}
                />
                <Text style={styles.header}>Relationship Topics Interests</Text>
                <FlatList
                  data={dateTopics}
                  renderItem={renderTopicsItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  scrollEnabled={false}
                />
              </View>
              <Atom.Button
                onPress={() => {
                  setUpdateDatingData({
                    ...updateDatingData,
                    userId: props.state.loginReducer?.loginData._id
                      ? props.state.loginReducer?.loginData._id
                      : props.state?.signupReducer?.signupSucessData?.UserData
                          ?._id,
                  }),
                    onPlaceOrder();
                }}
                containerStyle={{ marginVertical: "8%" }}
                title={"SAVE"}
              />
            </>
          </View>
        </ScrollView>
      )}

      <Model.CommonPopUp
        isVisible={modalVisibleAvailablity}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Dating Profile Updated!"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt="BACK TO PROFILE"
        onPress={() => {
          setModalVisibleAvailablity(false), navigation.goBack(), onLoad();
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfileRequest: (data) => dispatch(updateProfileRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatingProfile);
