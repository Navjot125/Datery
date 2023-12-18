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

import styles from "./MerchantReviewsStyles";
import * as Atom from "../../../Components/atoms";
import { BackHeader } from "../../../Components/molecules";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../Utils/ApiClient";
import { API_URL } from "../../../Constants/Config";


const MerchantReviews = (props) => {

  // console.log(props.route.params)

  const dispatch = useDispatch()
  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
  const [userReview, setUserReview] = useState()


  const handleRes = async () => {
    console.log("hello", props.route.params.mId)
    try {
      let query = `?merchantId=${props.route.params.mId}`
      const res = await axiosClient.get(API_URL.fetchMerchantReview + query, {
        merchantId: props.route.params.mId,
      }, {
        headers: {
          Authorization: userToken ? userToken :
            Usertoken
        }
      })
      console.log(res.data)
      if (res.data.status)
        setUserReview(res.data.data)
    } catch (error) {
      // console.log("ERR", error)
    }

  }
  // console.log(userReview[0]?.reviews)

  useEffect(() => {
    handleRes()
  }, [])

  const DATA = [
    {
      id: "1",
      name: "Paige",
      date: "3 Days Ago",
      review:
        "The experience was amazing. My husband and I loved the outcome of the meal.",
      rating: 4,
    },
    {
      id: "2",
      name: "Joan Perkins",
      date: "10 Days Ago",
      review: "Chef Jon did a great job cooking a mea1 for my date.",
      rating: 4,
    },
    {
      id: "3",
      name: "Antawn Jamison",
      date: "March 19, 2022",
      review:
        "The experience was amazing. My husband and I loved the outcome of the meal.",
      rating: 4,
    },
    {
      id: "4",
      name: "Frank Garrett",
      date: "Feburary 4, 2022",
      review: "Chef Jon did a great job cooking a mea1 for my date.",
      rating: 4,
    },
  ];

  FlatListItemSeparator = () => {
    return (
      <View style={styles.lineSeperator}>
        <View style={styles.innerSeperator} />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const formatDate = (isoDateString) => {
      const createdAtDate = new Date(isoDateString);
      return `${createdAtDate.toDateString()}`;
    };
    return (
      <View style={styles.viewFlatList}>
        <View style={styles.itemSpace}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Atom.Rating
            disabled={true}
            currentRating={Math.round(item.rating)}
            titleStyle={{ paddingLeft: 3 }}
          />
        </View>
        <Text style={styles.review}>{item.summary}</Text>
      </View>
    );
  };


  const [selected, setSelected] = useState(undefined);
  const data = [
    { label: "Most Recent", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
  ];
  const [value, setValue] = useState(null);


  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <BackHeader title={"Reviews"} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 33,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.review}> {userReview && userReview[0] && userReview[0]?.averageRating} </Text>
            {userReview && userReview[0] && (
              <Atom.Rating
                disabled={true}
                currentRating={Math.round(userReview[0]?.averageRating) || 0}
                titleStyle={{ paddingLeft: 3 }}
              />
            )}
            <Text style={styles.rating}> ({userReview && userReview[0]?.ratingCount}) </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.review}>Sort By </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.placeholderStyle}
              //   inputSearchStyle={styles.inputSearchStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select item"}
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
        </View>
        <Text style={styles.bold}>Best in the market</Text>
        <FlatList
          data={userReview && userReview[0]?.reviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        //   ItemSeparatorComponent={FlatListItemSeparator}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantReviews);
