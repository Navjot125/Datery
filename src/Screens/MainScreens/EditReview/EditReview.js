import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as Atom from "../../../Components/atoms";
import styles from "./EditReviewStyles";
import Icon from "react-native-vector-icons/Entypo";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import * as Model from "../../../Components/models";
import { connect, useDispatch, useSelector } from "react-redux";
import { Models } from "../../../Components";
import {
  ReviewAllRequest,
  ReviewguestFavouriteRequest,
  ReviewremoveFavouriteRequest,
  ReviewremoveGuestFavouriteRequest,
} from "../../../modules/userReview/actions";
import { API_URL } from "../../../Constants/Config";
import { showAlertSuccess } from "../../../Common/Functions/CommonFunctions";
import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";
// import * as Models from "../../../Components/models";
const EditReview = (props) => {
  const role = props.state.roleReducer.role.id;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisibleAlert, setModalVisibleAlert] = React.useState(false);
  const [modalVisibleSuccess, setModalVisibleSuccess] = React.useState(false);
  const [modalVisibleAvailablity, setModalVisibleAvailablity] =
    React.useState(false);
  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );
  const [userReview, setUserReview] = useState();
  const [ratingVal, setRatingVal] = useState(0);

  const dispatch = useDispatch();

  const [review, setReview] = useState({
    title: props.route.params.uId?.title,
    summary: props.route.params.uId?.summary,
    rating: props.route.params.uId?.rating,
    img: props.route.params.uId?.file,
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

  const handleEditResponse = () => {
    try {
      // Create a card token using react-native-stripe-sdk
      const token = userToken ? userToken : Usertoken;
      const data = {
        reviewId: props.route.params.uId?._id,
        title: review.title,
        rating: ratingVal,
        summary: review.summary,
        file: review.img,
      };
      if (!data.default) delete data.default;
      // setLoader(false);
      const callback = (res) => {
        navigation.goBack();
        // let arr = [res.data, ...listData]
        // arr.push(res.data)
        // console.log(res, 'res.data')
        // setListData(arr)
        // setShowModal(false)
        // setLoader(false)
      };
      dispatch(
        ReviewAllRequest({
          data,
          callback,
          token,
          endpoint: API_URL.editReview,
        })
      );
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

  const handleDelete = (id) => {
    const token = userToken ? userToken : Usertoken;
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    let param = {
      endpoint: API_URL.deleteReview,
      token,
      data: {
        reviewId: props.route.params.uId?._id,
      },
    };

    let reviewId = {
      reviewId: props.route.params.uId?._id,
    };
    role == 2
      ? props.ReviewremoveFavouriteRequest(param)
      : props.ReviewremoveGuestFavouriteRequest(reviewId);

    showAlertSuccess(`Review removed`);

    setTimeout(() => {
      navigation.goBack();
    }, 250)
    // console.log('sfsf',id);
  };

  const onPlaceOrder = () => {
    setModalVisibleAvailablity("true");
    handleEditResponse();
  };
  const selectedImages = () => {
    return (
      <View style={styles.selectedImage}>
        <Image
          source={require("../../../assets/images/Splash.png")}
          style={{ width: 100, height: 120, resizeMode: "contain" }}
        />
        <Icon name={"cross"} size={24} color={color._primary_orange} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {/* <View style={styles.mainView}> */}
      <BackHeader title={"Edit Review"} />
      <ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.headings}>Rating</Text>
          {/* <Text> 4 </Text> */}
          <View style={{ flexDirection: "row" }}>
            <Atom.Rating
              currentRating={Math.round(ratingVal)}
              titleStyle={{ paddingVertical: 8 }}
              onChange={(e) => setRatingVal(e)}
            />
          </View>
          <Text style={styles.headings}>Title</Text>
          <TextInput
            style={styles.input}
            value={review?.title}
            onChangeText={(value) => handleChange("title", value)}
            placeholder="Sed ut perspiciatis unde omnis iste natus"
          />
          <Text style={styles.headings}>Summary</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={review?.summary}
            onChangeText={(value) => handleChange("summary", value)}
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
            <Text style={styles.noteText}>( Maximum of four images )</Text>
            {/* {selectedImages()} */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setModalVisible(true);
                // setModalVisibleAlert(true);
                // handleDelete(props.route.params.uId?._id)
              }}
            >
              {/* <Models.ConfirmationPopUp
                isVisible={true}
                title={"Are you sure you want to delete this review?"}
                onPressYes={() => {}}
                onPressNo={() => {}}
              /> */}
              <Text style={styles.removeText}>
                Remove Review
              </Text>
            </TouchableOpacity>
            <Atom.Button title="Update" onPress={() => onPlaceOrder()} />
          </View>
        </View>
      </ScrollView>
      {/* </View> */}
      <Model.CommonPopUp
        isVisible={modalVisibleAvailablity}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Review Updated!"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt="BACK TO REVIEWS"
        onPress={() => {
          setModalVisibleAvailablity(false), navigation.navigate("UserReviews");
        }}
      />
      <Model.CommonPopUp
        isVisible={modalVisibleSuccess}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Review Deleted!"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt="BACK TO REVIEWS"
        onPress={() => {
          setModalVisibleSuccess(false), navigation.navigate("UserReviews");
        }}
      />
      <Model.ConfirmationPopUp
        isVisible={modalVisible}
        discription={"Are you sure you want to delete this review?"}
        descriptionTxt={{
          padding: 20,
          fontFamily: fonts.MEDIUM,
          fontSize: 16,
          color: color._black,
          textAlign: "center",
        }}
        onPressNo={() => {
          setModalVisible(!modalVisible);
        }}
        onPressYes={() => {
          // console.log('nooo');
          // setModalVisibleSuccess(!modalVisibleSuccess),
          handleDelete(props.route.params.uId?._id)
            setModalVisible(!modalVisible);
        }}
      />
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  ReviewremoveFavouriteRequest: (navigation) =>
    dispatch(ReviewremoveFavouriteRequest(navigation)),
  ReviewremoveGuestFavouriteRequest: (data) =>
    dispatch(ReviewremoveGuestFavouriteRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);
