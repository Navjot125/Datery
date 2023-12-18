import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import styles from "./LearnFavoritesStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { SwipeListView } from 'react-native-swipe-list-view';
import axios from "axios";
import axiosClient from "../../../Utils/ApiClient";
import { removeFavouriteRequest, removeGuestFavouriteRequest } from "../../../modules/Merchants/actions";
import { API_URL } from "../../../Constants/Config";
import { LearnfavouriteListRequest, LearnremoveFavouriteRequest, LearnremoveGuestFavouriteRequest } from "../../../modules/learn/actions";
import Images from "../../../assets/Images";
import { showAlertSuccess } from "../../../Common/Functions/CommonFunctions";
const LearnFavorites = (props) => {
  const role = props.state.roleReducer.role.id
  const navigation = useNavigation();
  const { favourites } = useSelector(state => state.learnReducer)
  const [dataa, setDataa] = useState(props.state.learnReducer?.favourites)
  const dispatch = useDispatch()

  const [data, setData] = useState([{
    id: 1,
    media: require("../../../assets/images/Alice.png"),
    title: "Being an supportive boyfriend",
    title2: "Dating 101",
    name: "Chelsea Smith",
    date: "March 6, 2023",
    mediaType: ["Video"],
    duration: "5 min",
  },
  {
    id: 2,
    media: require("../../../assets/images/Alice.png"),
    title: "Top 10 Tips to Prepare for a First Date",
    name: "Jane Smith",
    date: "Dec 10, 2022",
    mediaType: ["Article"],
    duration: "5 min read",
  },
  {
    id: 3,
    media: require("../../../assets/images/Alice.png"),
    title: "Top 10 Tips to Prepare for a First Date",
    name: "Jane Smith",
    date: "Dec 10, 2022",
    mediaType: ["Article"],
    duration: "5 min read",
  },
  {
    id: 4,
    media: require("../../../assets/images/Alice.png"),
    title: "Being an supportive boyfriend",
    title2: "Dating 101",
    name: "Chelsea Smith",
    date: "March 6, 2023",
    mediaType: ["Video"],
    duration: "5 min",
  },
  {
    id: 5,
    title: "Mindy Smith",
    title2: "M.S., LMFT Dallas, TX | Virtual",
    name: "Approachable, Direct & Warm",
    media: require("../../../assets/images/dummyImage.png"),
    mediaType: ["Coach"],
  }
  ])

  // console.log(JSON.stringify(favourites,null,2))

  const handleFavListing = () => {
    dispatch(LearnfavouriteListRequest({
      endpoint: API_URL.fetchFavoriteLearn, userId: props.state.loginReducer.loginData._id
    }))
  }
  useEffect(() => {
    handleFavListing()

    // setDataa(role == 1 ? props.state.learnReducer.favouritesGuest : props.state.learnReducer?.favourites);
  }, [])
  // const handleDelete = (id) => {
  //   setData((prevData) => prevData.filter((item) => item.id !== id));
  // };

  const handleDelete = (id) => {
    // console.log(id, "IIDDDDd");
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    let param = {
      endpoint: API_URL.deleteFavorite,
      data: {
        serviceId: id,
        userId: props.state.loginReducer.loginData._id
      }
    }

    let serviceId = {
      serviceId: id
    }
    role == 2 ?
      props.LearnremoveFavouriteRequest(param) :
      props.LearnremoveGuestFavouriteRequest(serviceId)

    showAlertSuccess(`Item removed from your favourite list`)
    setTimeout(() => {
      handleFavListing()
    }, 250)
    // console.log('sfsf',id);
  };

  const renderItem = ({ item }) => {
    const formatDate = (isoDateString) => {
      const createdAtDate = new Date(isoDateString);
      return `${createdAtDate.toDateString()}`;
    };
    const splittedStr = item?.file ? String(item?.file[0]).split('.') : ""
    const isVideo = splittedStr.length > 0 ? splittedStr[splittedStr.length - 1] === 'mp4' : false
    return (
      <View style={styles.cardView}>
        <DropShadow style={styles.shadowProp}>
          <TouchableOpacity
            activeOpacity={0.9}

            onPress={() => {


              navigation.navigate(item.learnType == '64b9239001e60e6d882e737d' ? 'CoachDetail' : !isVideo ? 'AdviceDetail' : 'CourseOverview', {
                item
              })
            }}
            style={styles.cardView}>
            <DropShadow style={styles.shadowProp}>
              <View style={[styles.card]}>
                {item?.learnType !== "64b9239001e60e6d882e737d" ? (
                  <View style={[styles.card]}>
                    <Image
                      source={!isVideo ? { uri: `http://54.92.82.16:3001/data/${item?.file[0]}` } : { uri: `http://54.92.82.16:3001/data/${item?.thumbnailFile}` }}
                      style={{ height: 85, width: 85, borderRadius: 6 }}
                    />
                    <View style={{
                      padding: 15, width: "74%",
                    }}>
                      <Text style={styles.textTitle}>{item.learnTitle}</Text>

                      <Text style={[styles.textBetween, { marginTop: 10 }]}> {item.coachName}</Text>
                      <View style={{ flex: 1, marginTop: 10 }}>
                        <View style={styles.lastText}>
                          <Text style={styles.orangeText}>{formatDate(item.createdAt)}</Text>
                          <View style={{ height: 5, width: 5, backgroundColor: "grey", borderRadius: 10 }}></View>
                          <Text style={[styles.orangeText,]}>{item.learnTime}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ right: 20 }}>
                      <Image
                        source={!isVideo ? Images.DocsImage : Images.vedioImage}
                        style={{ height: 40, width: 30, resizeMode: 'contain' }}
                      />
                    </View>
                  </View>
                ) : item.learnType === "64b9239001e60e6d882e737d" ? (
                  <View style={[styles.card]}>
                    <Image
                      source={{ uri: `http://54.92.82.16:3001/data/${item?.coachPic}` }}
                      style={{ height: 85, width: 85, borderRadius: 6 }}
                    />
                    <View style={{
                      padding: 15, width: "74%",
                      // marginTop:15
                      // flexWrap:'wrap', 
                    }}>
                      <Text style={styles.textTitle}>{item.coachName}</Text>
                      <Text style={[styles.textBetween, { color: 'black', marginTop: 5 }]}> {item.coachAddress}</Text>
                      <Text style={[styles.textBetween, { color: 'black', marginTop: 8 }]}> {item.coachApproach}</Text>

                      {/* <View style={{ flex: 1, marginTop: 15,justifyContent:'space-between' }}> */}
                      <View style={[styles.lastText, {}]}>
                        <Text style={styles.orangeText}>{formatDate(item.createdAt)}</Text>
                        <View style={{ height: 5, width: 5, backgroundColor: "grey", borderRadius: 10 }}></View>
                        <Text style={[styles.orangeText, { textTransform: 'capitalize' }]}>{item.coachAvailability}</Text>
                      </View>
                      {/* </View> */}

                    </View>
                    <View style={styles.iconWrap}>
                      <Image
                        source={Images.WhistleImage}
                        style={{ height: 15, width: 16, resizeMode: 'cover', right: 20 }}
                      />
                    </View>
                  </View>
                ) : (
                  // Else Block, render a default image or any other content
                  <Image
                    source={Images.BallerinaImage}
                    style={{ height: 85, width: 85, borderRadius: 6 }}
                  />
                )}




              </View>
            </DropShadow>
          </TouchableOpacity>
        </DropShadow>
      </View>

    )
  }

  const emptyData = () => {
    // Alert.alert('')
    return (
      < View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
        <Text style={{ fontSize: 18, color: color._black, fontFamily: fonts.MEDIUM }}>{"No Favorities"}</Text>
      </View >
    );
  };



  const renderHiddenItem = (dataItem) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => handleDelete(dataItem.item._id)}
      >
        <Image style={{ height: 20, width: 20 }} source={require('../../../assets/images/deleteCard.png')} />
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        {/* <View style={styles.header}> */}
        <BackHeader title={"Favorites"} />
        {/* </View> */}
        {/* <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 15 }}
        > */}
        {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={showData}
          /> */}

        <SwipeListView
          data={favourites}
          renderItem={renderItem}
          ListEmptyComponent={emptyData}
          contentContainerStyle={{ flexGrow: 1 }}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-55} // adjust this value based on your item width
        />
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  LearnremoveFavouriteRequest: (navigation) => dispatch(LearnremoveFavouriteRequest(navigation)),
  LearnremoveGuestFavouriteRequest: (data) => dispatch(LearnremoveGuestFavouriteRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnFavorites);
