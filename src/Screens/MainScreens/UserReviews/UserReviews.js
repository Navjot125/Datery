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
import React, { useEffect, useState } from "react";
import fonts from "../../../Constants/Fonts";
import styles from "./UserReviewsStyles";
import { BackHeader } from "../../../Components/molecules";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Atom from "../../../Components/atoms";
import {
  ReviewAllDetailsRequest,
  ReviewAllRequest,
  ReviewfavouriteListRequest,
} from "../../../modules/userReview/actions";
import { datingProfileRequest } from "../../../modules/Profile/actions";
import { roleRequest } from "../../../modules/Role/actions";
import { removeAnswer, setAnswer } from "../../../modules/SetAnswer/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { API_URL } from "../../../Constants/Config";
import axiosClient from "../../../Utils/ApiClient";
import color from "../../../Constants/Color";

const UserReviews = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userCity =
    props?.state?.profileReducer?.datingData?.userProfile?.locationAddress;
  const userCords = null;
  const tempCords =
    role == 1
      ? props.state?.profileReducer?.tempCoordinates
      : props.state?.profileReducer?.userTempCoordinates;
  const tempName =
    role == 1
      ? props.state?.profileReducer?.tempLocatioName
      : props.state?.profileReducer?.userTempLocatioName;
  const role = props.state.roleReducer.role.id;
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(false);
  const [geoCityName, setGeoCityName] = useState("");
  const [geoCityShortName, setGeoCityShortName] = useState("");
  // const { userReview } = useSelector(state => state.userReviewReducer)
  // let [text, setText] = useState('');
  // const [result, setResult] = useState(data[0]);

  const { userToken, loginData } = useSelector((state) => state.loginReducer);
  const { Usertoken, signupSucessData } = useSelector(
    (state) => state.signupReducer
  );
  const [userReview, setUserReview] = useState();
  const isFocused = useIsFocused();

  const handleRes = async () => {
    // console.log("hello")
    try {
      const res = await axiosClient.get(API_URL.fetchUserReview, {
        headers: {
          Authorization: userToken ? userToken : Usertoken,
        },
      });
      // console.log(res.data)
      if (res.data.status) setUserReview(res.data.data);
    } catch (error) {
      // console.log("ERR", error)
    }
  };

  useEffect(() => {
    handleRes();
  }, [isFocused]);

  FlatListItemSeparator = () => {
    return (
      <View style={styles.lineSeperator}>
        <View style={styles.innerSeperator} />
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    const formatDate = (isoDateString) => {
      const createdAtDate = new Date(isoDateString);
      const day = createdAtDate.getDate();
      const month = createdAtDate.toLocaleString("default", { month: "long" });
      const year = createdAtDate.getFullYear();
      return `${month} ${day}, ${year}`;
    };
    return (
      <View key={index} style={styles.viewFlatList}>
        <View style={styles.itemSpace}>
          <Text style={styles.type}>{"Featured"}</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.editButton}
            onPress={() => navigation.navigate("EditReview", { uId: item })}
          >
            <Image
              source={require("../../../assets/images/edit.png")}
              style={{
                height: 14,
                width: 14,
                tintColor: color._primary_orange,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.name}>{item.username}</Text> */}
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        {/* <Text>{item.rating} </Text> */}
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Atom.Rating
            disabled={true}
            currentRating={Math.round(item.rating)}
            titleStyle={{ paddingVertical: 8 }}
          />
          <Text
            style={{
              marginTop: 9,
              fontFamily: fonts.REGULAR,
              color: "#9796A1",
              fontSize: 13,
            }}
          >
            {/* {" "}
            {item.rating.length}{" "} */}
          </Text>
        </View>
        <Text style={styles.review}>{item.summary}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <BackHeader title={"Your Reviews"} />
      <View style={styles.mainView}>
        <FlatList
          data={userReview}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={FlatListItemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  removeAnswer: (data, navigation) => dispatch(removeAnswer(data, navigation)),
  setLoader: (data) => dispatch(setLoader(data)),
  ReviewAllRequest: (data, navigation) =>
    dispatch(ReviewAllRequest(data, navigation)),
  ReviewAllDetailsRequest: (data, navigation) =>
    dispatch(ReviewAllDetailsRequest(data, navigation)),
  ReviewfavouriteListRequest: (data) =>
    dispatch(ReviewfavouriteListRequest(data)),
  datingProfileRequest: (data) => dispatch(datingProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserReviews);
