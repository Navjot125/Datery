import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import styles from "./PurchaseHistoryStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect, useSelector } from "react-redux";
import * as PopUp from "../../../Components/models";
import { API_URL } from "../../../Constants/Config";
import axiosClient from "../../../Utils/ApiClient";

const PurchaseHistory = (props) => {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
  const [recent, setRecent] = useState()
  const isFocused = useIsFocused()


  const handleRecentPurchase = async () => {
    try {
      const res = await axiosClient.get(API_URL.recentPurchase, {
        headers: {
          Authorization: userToken ? userToken :
            Usertoken
        }
      })
      // console.log(res.data, "userToken")
      if (res.data.status)
        setRecent(res.data.cartItem)
    } catch (error) {
      console.log("ERR", error)
    }
  }

  useEffect(() => {
    handleRecentPurchase()
  }, [isFocused])

  const data = [
    {
      id: 1,
      media: require("../../../assets/images/dummyImage.png"),
      title: "Live Virtual Cooking Experience with Chef Jon",
      name: "Chef Jon",
      schedule: "Plan later",
    },
    {
      id: 2,
      media: require("../../../assets/images/dummyImage.png"),
      title: "Live Virtual Cooking Experience with Chef Jon",
      name: "Chef Jon",
      review: "Write a Review",
      schedule: "Thu, 07/05, 8:30 PM",
    },
  ];

  const showData = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          elevation: 5, // Add elevation for shadow (Android only)
          borderRadius: 15,
          // flex: 1,
          marginVertical: 15,
          marginHorizontal: 10
          // backgroundColor:'red'
        }}
        onPress={() => { navigation.navigate("PurchasedActivity", { bId: item._id }) }} >
        <View style={[styles.card]}>
          <Image
            source={{ uri: `http://54.92.82.16:3001/data/${item?.providerImage}` }}
            style={{ height: 95, width: 110, borderRadius: 6, marginHorizontal: 5 }}
          />
          <View
            style={{
              flex: 1,
              marginHorizontal: 5
              // backgroundColor:'red'
              // padding: 15,
              // width: "80%",
            }}
          >
            <Text style={styles.textTitle}>{item.serviceName}</Text>
            <Text style={styles.textBetween}> {item.providerName}</Text>
            <Text style={styles.textLoc}>
              {"$160"}</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.mediaType2}>
              <Text style={styles.mediaType}>
                <Icon name={"calendar-alt"} size={11} color={color._primary_orange} />
                {"  "}
                {item?.time ? item?.time : "Buy Now, Book Later"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      // <TouchableOpacity
      //   activeOpacity={0.9}
      //   style={{ marginVertical: 10, marginHorizontal: 20 }}
      //   onPress={() => { navigation.navigate("PurchasedActivity", { bId: item._id }) }}>
      //   <View style={[styles.card]}>
      //     <Image
      //       source={{ uri: `http://54.92.82.16:3001/data/${item?.providerImage}` }}
      //       style={{ height: 85, width: 85, borderRadius: 6 }}
      //     />
      //     <View style={{ flex: 1 }}>
      //       <Text style={styles.textTitle}>{item.serviceName}</Text>
      //       <View style={styles.lastText}>
      //         <View style={{ flex: 0.5 }}>
      //           <Text style={styles.textBetween}>{item.providerName}</Text>
      //         </View>
      //         <TouchableOpacity
      //           activeOpacity={0.9}
      //           onPress={() => item.schedule == "Plan later" ? null : setModalVisible(true)}
      //           style={styles.mediaType}>
      //           <Text style={styles.mediaType2}>
      //             <Icon name={"calendar-alt"} size={11} color={color._white} />{"   "}
      //             {item.time}
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //       {/* <TouchableOpacity
      //             activeOpacity={0.9}
      //           >
      //             <Text style={styles.orangeText}>{item.review}</Text>
      //           </TouchableOpacity> */}
      //     </View>
      //   </View>
      // </TouchableOpacity>
      // <View style={styles.cardView}>
      //   <DropShadow style={styles.shadowProp}>

      //   </DropShadow>
      // </View>
    );
  };

  const rightImage = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
      >
        <Image
          style={{ height: 22, width: 22, tintColor: color._black }}
          source={require("../../../assets/images/Filter.png")}
        />
      </TouchableOpacity>
    );
  };
  

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={{ marginHorizontal: 10 }}>
        <BackHeader
          title={"Purchase History"}
          isRight
          // rightContent={rightImage()}
          rightStyl={{ height: 22, width: 22 }}
        />
      </View>
      <FlatList
        data={recent}
        keyExtractor={(item) => item.id}
        renderItem={showData}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <PopUp.SlideUpPopUp
        isVisible={modalVisible}
        onPress={() => {
          // navigation.navigate("PurchasedActivity"), 
          setModalVisible(!modalVisible)
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
    </SafeAreaView>

  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseHistory);
