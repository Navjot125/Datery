import * as Atom from "../../../Components/atoms";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { connect, useDispatch } from "react-redux";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  LearnAllDetailsRequest,
  LearnAllRequest,
} from "../../../modules/learn/actions";
import Images from "../../../assets/Images";
import CustomIcon from "../../../assets/CustomIcon";
import { API_URL, IMAGE_URL } from "../../../Constants/Config";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AllLearn = (props) => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setList(props.state.learnReducer?.learns);
  }, [props.state.learnReducer?.learns]);

  // console.log("++DDD_____", props.state.learnReducer?.learns)

  const showList = ({ item, index }) => {
    const formatDate = (isoDateString) => {
      const createdAtDate = new Date(isoDateString);
      return `${createdAtDate.toDateString()}`;
    };
    const splittedStr = item?.file?.length
      ? String(item?.file[0]).split(".")
      : "";
    const isVideo =
      splittedStr.length > 0
        ? splittedStr[splittedStr.length - 1] === "mp4"
        : false;

    const callDetailAppi = (id, category, type) => {
      const param = {
        learnId: id,
        learnType: category,
        endpoint: API_URL.fetchSingleLearn,
        userToken: props?.state?.loginReducer?.userToken
          ? props?.state?.loginReducer?.userToken
          : props.state?.signupReducer?.signupSucessData?.Usertoken,
        cb: (data) => {
          navigation.navigate(
            type == "Coach"
          ? "CoachDetail"
          : type ==  "Article"
          ? "AdviceDetail"
          : type ==  "Video" ? "CourseOverview" : null,
            // : "CourseOverview",
            (item = data)
          );
        },
      };
      dispatch(LearnAllDetailsRequest(param));
    };
    return (
      // CourseOverview
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          // console.log(item?.category,'item?.category');
          callDetailAppi(
            item?._id,
            item?.category == "Coach" ? "coach" : "learn",
            item?.category
          )
            // console.log("PRAMMMMMM_----", item);
            // navigation.navigate(
            //   item.category == "Coach"
            //     ? "CoachDetail"
            //     : !isVideo
            //     ? "AdviceDetail"
            //     : "CourseOverview",
            //   {
            //     item,
            //   }
            // );
            // console.log("item----------------learn", item);
        }}
        style={styles.cardView}
      >
        <DropShadow style={styles.shadowProp}>
          <View style={[styles.card]}>
            {item?.category !== "Coach" ? (
              <View style={[styles.card]}>
                <View style={{ height: 120, width: 120 }}>
                  <Image
                    source={
                      !isVideo
                        ? { uri: `${IMAGE_URL}${item?.file}` }
                        : {
                            uri: `${IMAGE_URL}${item?.thumbnailFile}`,
                          }
                    }
                    style={{ height: "100%", width: "100%", borderRadius: 6 }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                  }}
                >
                  <View style={styles.iconWrap}>
                    <Text style={styles.tagTxt}>
                      {!isVideo ? item.category : item.category}
                    </Text>
                  </View>
                  <Text style={styles.textTitle}>{item.learnTitle}</Text>

                  <Text style={[styles.textBetween, { marginTop: 2 }]}>
                    {" "}
                    {item.coachName}
                  </Text>
                  <View style={{ flex: 1, marginTop: 2 }}>
                    <View style={styles.lastText}>
                      <Text style={styles.orangeText}>
                        {formatDate(item.createdAt)}
                      </Text>
                      {/* <View style={{ height: 5, width: 5, backgroundColor: "grey", borderRadius: 10 }}></View> */}
                      {/* <Text style={[styles.orangeText,]}>{item.learnTime}</Text> */}
                    </View>
                    {!isVideo ? (
                      <View style={styles.newMain}>
                        {item.labels &&
                          Array.isArray(item.labels) &&
                          item.labels.map((items) => (
                            <View style={styles.newMain}>
                              <View style={styles.newWrp}>
                                <Text style={styles.newWrpTxt}>{items}</Text>
                              </View>
                            </View>
                          ))}
                      </View>
                    ) : (
                      <View style={styles.newMain}>
                        {item.labels &&
                          Array.isArray(item.labels) &&
                          item.labels.map((items) => (
                            <View style={styles.newMain}>
                              <View style={styles.newWrp}>
                                <Text style={styles.newWrpTxt}>{items}</Text>
                              </View>
                            </View>
                          ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ) : item.category === "Coach" ? (
              <View style={[styles.card]}>
                <View style={{ height: 120, width: 120 }}>
                  <Image
                    source={{
                      uri: `http://54.92.82.16:3001/data/${item?.coachPic}`,
                    }}
                    style={{ height: "100%", width: "100%", borderRadius: 6 }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    // marginTop:15
                    // flexWrap:'wrap',
                  }}
                >
                  <View style={styles.iconWrap}>
                    <Text style={styles.tagTxt}>{item.category}</Text>
                  </View>
                  <Text style={styles.textTitle}>{item.coachName}</Text>
                  <Text style={[styles.textBetween, {}]}>
                    {" "}
                    {item.coachAddress}
                  </Text>
                  <Text style={[styles.textBetween, {}]}>
                    {" "}
                    {item.coachApproach}
                  </Text>

                  <View style={{ flex: 1, marginTop: 5 }}>
                    <View style={styles.lastText}>
                      <Text style={styles.orangeText}>
                        {formatDate(item.createdAt)}
                      </Text>
                      {/* <View style={{ height: 5, width: 5, backgroundColor: "grey", borderRadius: 10 }}></View> */}
                      {/* <Text style={[styles.orangeText, { textTransform: 'capitalize' }]}>{item.coachAvailability}</Text> */}
                    </View>
                    <View style={styles.newMain}>
                      {item.labels &&
                        Array.isArray(item.labels) &&
                        item.labels.map((items) => (
                          <View style={styles.newMain}>
                            <View style={styles.newWrp}>
                              <Text style={styles.newWrpTxt}>{items}</Text>
                            </View>
                          </View>
                        ))}
                    </View>
                  </View>
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
    );
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        {/* {console.log("LIST______", list)} */}

        {list && (
          <FlatList
            data={list}
            // ref={flatlistRef}
            // data={dataList}
            keyExtractor={(item) => item._id}
            renderItem={showList}
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            // showsHorizontalScrollIndicator={false}
            // horizontal
            key="_"
            // onEndReached={() => { props.endReached() }}
            onEndReachedThreshold={0.8}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => ({
  setLoader: (data) => dispatch(setLoader(data)),
  LearnAllRequest: (data, navigation) =>
    dispatch(LearnAllRequest(data, navigation)),
  LearnAllDetailsRequest: (data, navigation) =>
    dispatch(LearnAllDetailsRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllLearn);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: color._white,
  },

  mainView: {
    flex: 1,
    // marginHorizontal: 20,
    backgroundColor: color._white,
  },
  header: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 31,
  },
  cardView: {
    // marginTop: 31,
    marginHorizontal: 6,
  },
  textStyle: {
    color: "#2F2729",
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 24,
  },
  card: {
    backgroundColor: "white",
    // borderRadius: 10,
    // width: "100%",
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    // padding: 13,
    padding: 5,
  },
  shadowProp: {
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  mediaType2: {
    borderRadius: 50,
    backgroundColor: color._primary_orange,
    color: color._white,
    fontFamily: fonts.BOLD,
    fontSize: 12,
    marginLeft: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 10,
  },
  mediaType: {
    // backgroundColor: color._primary_orange,
    color: color._primary_orange,
    fontFamily: fonts.BOLD,
    fontSize: 12,
    paddingHorizontal: 10,
  },
  textBetween: {
    fontFamily: fonts.MEDIUM,
    fontSize: 10,
    color: color._font_grey,
  },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: "#1F2937",
  },
  orangeText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._font_grey,
  },
  lastText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // left: -20
    // backgroundColor: 'red',
    // flex: 1
  },
  iconWrap: {
    justifyContent: "center",
    // position: 'absolute',
    // right: 8,
    // padding: 10
  },
  newWrp: {
    backgroundColor: color._primary_orange,
    justifyContent: "center",
    height: 25,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: "center",
  },

  newWrpTxt: {
    fontSize: 10,
    fontWeight: "700",
    color: color._font_white,
    fontFamily: fonts.SEMI_BOLD,
    textAlign: "justify",
  },

  newMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: "1%",
  },
  tagTxt: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 21,
    color: "#212427",
    textTransform: "uppercase",
  },
});
