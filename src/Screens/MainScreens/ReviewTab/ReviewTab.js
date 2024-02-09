import { Text, View, FlatList, scrollView, Modal, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import styles from "./ReviewTabStyles";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import * as Atoms from "../../../Components/atoms";
import { Dropdown } from "react-native-element-dropdown";
import { BackHeader } from "../../../Components/molecules";
import { Image } from "react-native";
import * as Model from "../../../Components/models";
import Icon from 'react-native-vector-icons/AntDesign';
import base from "../../../Constants/CommonStyle";
import { ReviewAllRequest } from "../../../modules/userReview/actions";
import { API_URL } from "../../../Constants/Config";


const dataDropDown = [
  { label: "Most Recent", value: "1" },
  { label: "Two", value: "2" },
  { label: "Three", value: "3" },
  { label: "Four", value: "4" },
  { label: "Five", value: "5" },
];

const ReviewTab = ({ dReview, setListData, listData }) => {
  const navigation = useNavigation();

  // const type = props?.route?.params?.type

  const [valueDropdown, setValueDropdown] = useState(null);
  // const [result, setResult] = useState(dReview)
  const [showModal, setShowModal] = useState(false);
  const [modalVisibleAvailablity, setModalVisibleAvailablity] = React.useState(false);
  const dispatch = useDispatch()
  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
  const [ratingVal, setRatingVal] = useState(0)
  const [review, setReview] = useState({
    title: "",
    summary: '',
    rating: 3,
    img: null
  });
  const [state, setState] = useState({
    setDefault: false,
  });
  const handleState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };
  const handleChange = (name, value) => {
    setReview({ ...review, [name]: value });
  };

  // { console.log(dReview._id, "DDDD___") }

  const handleResponse = () => {
    try {
      // console.log('hii')
      // Create a card token using react-native-stripe-sdk
      const token = userToken ? userToken :
        Usertoken
      const data = {
        userId: loginData._id ? loginData._id :
          signupSucessData?.UserData?._id,
        serviceId: dReview._id,
        title: review.title,
        rating: ratingVal,
        summary: review.summary,
        file: review.img

      }
      // if (!data.default) delete data.default
      // setLoader(false);
      const callback = (res) => {
        // navigation.goBack()
        let arr = [res.data, ...listData]
        // arr.push(res.data)
        // console.log(arr, 'res.data')
        setListData(arr)
        setShowModal(false)
        // setLoader(false)
      }
      dispatch(ReviewAllRequest({ data, callback, token, endpoint: API_URL.addReview, }))
      // setReview({
      //   name: "",
      //   cardNumber: '',
      //   expiryMonth: '',
      //   expiryYear: '',
      //   cvv: '',
      // })
    } catch (error) {
      // setLoader(false);
      // console.log("ERRROORrr", error)
      // Handle any errors that occurred during the payment process
      Alert.alert(error.Error);
    }
  };




  const onPlaceOrder = () => {
    setModalVisibleAvailablity("true")
    handleResponse()
  };


  const showReviews = ({ item }) => {
    const formatDate = (isoDateString) => {
      const createdAtDate = new Date(isoDateString);
      return `${createdAtDate.toDateString()}`;
    };
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textNew}> {item.title}</Text>
        <Text style={styles.textsmall}> {item.username}</Text>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ flexDirection: "row", alignSelf: 'flex-start' }}>
            <Atoms.Rating
              disabled={true}
              currentRating={Math.round(item.rating)}
            // titleStyle={{ paddingVertical: 8 }}
            />
          </View>
          <Text style={styles.dateText}>{formatDate(item?.createdAt)}</Text>
        </View>
        <Text style={styles.text}>{item?.summary}</Text>
      </View>
    );
  };

  return (
    <View style={styles.scrollView}>
      <View style={{
        flexDirection: 'row', alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 20
        // backgroundColor:'red',
      }}>
        <Text
          style={{ color: color._black, fontSize: 18, fontWeight: "700" }}
        >Reviews</Text>
        <View style={{ flexDirection: 'row', flex: 0.5, justifyContent: 'space-between', alignItems: "center" }}>
          <Text style={styles.review}>Sort By </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.placeholderStyle}
            data={dataDropDown}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={"Most Recent"}
            value={valueDropdown}
            onChange={(item) => {
              setValueDropdown(item.value);
            }}
          />
        </View>
      </View>
      <FlatList
        data={listData && listData?.length > 3 ? listData.splice(0, 3) : listData}
        keyExtractor={(item) => item._id}
        renderItem={showReviews}
        showsVerticalScrollIndicator={false}
      />
      <Text
        style={{
          alignSelf: "center",
          color: color._primary_orange,
          fontSize: 13,
          fontFamily: fonts.BOLD,
          marginTop: 10
        }}
        onPress={() => navigation.navigate("MerchantReviews", { mId: dReview._id })}
      >
        View All Reviews
      </Text>

      <Text
        style={{
          // alignSelf: "center",
          color: color._black,
          fontSize: 13,
          fontFamily: fonts.MEDIUM,
          marginVertical: 30,
          textAlign: 'left',
          backgroundColor: color._dusty_white,
          paddingVertical: 20,
          borderRadius: 12,
          paddingHorizontal: 20,

        }}
        onPress={() => {
          setShowModal(!showModal)
          // navigation.navigate("WriteReview", { type: "video" })
        }}
      >
        Write a Review
      </Text>

      <Modal
        animationType={'slide'}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          // console.log('Modal has been closed.');
        }}>
        {/*All views of Modal*/}
        {/*Animation can be slide, slide, none*/}
        <View style={styles.safeView}>
          <View style={styles.mainView2}>

            <View style={[base.horizontal, styles.header, base.center]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  base.horizontal,
                  styles.header,
                  { position: 'absolute', left: 0 },
                ]}
                onPress={() => {
                  setShowModal(!showModal);
                }
                }>
                <Icon name={'arrowleft'} size={24} color={color._primary_orange} />
              </TouchableOpacity>
              <Text style={styles.title3}>{"Review"}</Text>
            </View>

            <ScrollView
              bounces={false}
              alwaysBounceVertical={false}
              overScrollMode="never"
              showsVerticalScrollIndicator={false} style={styles.scrollView2}>
              <Text style={styles.headings}>Rating</Text>
              {/* <Text> 4 </Text> */}
              <View style={{ flexDirection: "row" }}>
                <Atoms.Rating
                  currentRating={Math.round(ratingVal)}
                  titleStyle={{ paddingVertical: 8 }}
                  onChange={(e) => setRatingVal(e)}
                />
              </View>
              <Text style={styles.headings}>Title</Text>
              <TextInput
                style={styles.input}
                value={review && review?.title}
                onChangeText={(value) => handleChange('title', value)}
                placeholderTextColor={"#505050"}
                placeholder="Sed ut perspiciatis unde omnis iste natus"
              />
              <Text style={styles.headings}>Summary</Text>
              <TextInput
                style={[styles.input, { height: 100 }]}
                value={review && review?.summary}
                onChangeText={(value) => handleChange('summary', value)}
                placeholderTextColor={"#505050"}
                placeholder="The experience was amazing. My husband and I loved the outcome of the meal."
                multiline
              />
              <Text style={styles.headings}>Photos</Text>
              <View style={styles.uploadImage}>
                <Image
                  source={require("../../../assets/images/PhotosUpload.png")}
                  style={{ width: 37, height: 29 }}
                />
                <Text style={styles.uploadText}>Upload Image</Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.noteText, { marginBottom: 25 }]}>( Maximum of four images )</Text>
                {/* {selectedImages()} */}
                <Atoms.Button
                  title="SUBMIT REVIEW"
                  onPress={() => onPlaceOrder()}
                />
              </View>
            </ScrollView>
          </View>
        </View>

      </Modal>

      <Model.CommonPopUp
        isVisible={modalVisibleAvailablity}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Review Submitted!"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt={"BACK TO VIDEO"}
        onPress={() => { setModalVisibleAvailablity(false) }}
      />




    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTab);
