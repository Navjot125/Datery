import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import * as Molecules from "../../../Components/molecules";
import * as Atom from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import CommonList from "../Home/CommonList";
import { playDetailsRequest, playRequest } from "../../../modules/play/actions";
import { setLoader } from "../../../modules/Loader/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import Images from "../../../assets/Images";
import { API_URL } from "../../../Constants/Config";
const width = Dimensions.get("window").width;
const All = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const { play } = useSelector((state) => state.playReducer);
  useEffect(() => {
    setList(play?.data);
  }, [play]);

  const showList = ({ item }) => {
    const callDetailAppi = (id) => {
      const param = {
        gameId: id,
        endpoint: API_URL.fetchSingleGame,
        userToken: props?.state?.loginReducer?.userToken
          ? props?.state?.loginReducer?.userToken
          : props.state?.signupReducer?.signupSucessData?.Usertoken,
        cb: (data) => {
          navigation.navigate("HowToPlay", (item = data));
          // navigation.navigate("HowToPlay")
        },
      };
      dispatch(playDetailsRequest(param));
    };
    return (
      <View
        key={item?._id}
        style={{
          flex: 1,
          backgroundColor: "white",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => callDetailAppi(item?._id)}
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ height: 90, width: 90 }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                // marginLeft: 9,
                resizeMode: "cover",
                borderRadius: 10,
              }}
              source={{ uri: `http://54.92.82.16:3001/data/${item?.file[0]}` }}
            />
          </View>
          <View style={{ marginHorizontal: 10, flex: 1 }}>
            <Text
              style={{
                // marginTop: 3,
                color: color._font_grey,
                fontSize: 12,
                textAlign: "justify",
                textTransform: "uppercase",
              }}
              numberOfLines={2}
            >
              {item.category}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  // marginTop: 5,
                  // marginBottom: 5,
                  fontFamily: fonts.BOLD,
                  color: color._font_black,
                  fontSize: 14,
                }}
              >
                {item.gameTitle}
              </Text>
              {Array.from({ length: item.chilliCount }, (_, index) => (
                <Image
                  key={index}
                  source={Images.pepperImage}
                  style={{
                    height: 15,
                    width: 15,
                    left: 5,
                    tintColor: color._primary_orange,
                  }}
                />
              ))}
            </View>
            <Text
              style={{
                marginTop: 3,
                color: color._font_grey,
                fontSize: 12,
                textAlign: "justify",
              }}
              numberOfLines={2}
            >
              {item.shortDescription}
            </Text>
            <View style={styles.newMain}>
              {item.labels &&
                Array.isArray(item.labels) &&
                item.labels.map((items, index) => (
                  <View key={index} style={styles.newMain}>
                    <View style={styles.newWrp}>
                      <Text style={styles.newWrpTxt}>{items}</Text>
                    </View>
                  </View>
                ))}
            </View>
            {/* <View style={styles.newMain}>

              {/* <View style={styles.newWrp}>
                <Text style={styles.newWrpTxt}>Love</Text>
              </View>
              <View style={styles.newWrp}>
                <Text style={styles.newWrpTxt}>Conflict</Text>
              </View> */}
            {/* </View>  */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const Item = ({ item }) => (
    <View
      style={{
        marginHorizontal: 10,
        marginBottom: 32,
      }}
    >
      <Atom.Button
        title={item.name}
        //   onPress={() =>
        //     multiSelect ? handlePressMulti(item) : handlePressSingle(item)
        //   }
        style={
          item.selected
            ? { height: 45 }
            : {
                borderWidth: 1,
                backgroundColor: "#FFF",
                borderColor: "#9796A1",
                height: 37,
                paddingHorizontal: 26,
              }
        }
        textStyle={
          item.selected
            ? {}
            : { color: color._black, fontFamily: fonts.MEDIUM, fontSize: 11 }
        }
      />
    </View>
  );
  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };
  const handlePressSingle = (item) => {
    let renderData = [...data];
    for (let e of renderData) {
      if (e._id === item._id) {
        e.selected = true;
      } else {
        e.selected = false;
      }
    }
    onChange(renderData[0]);
    setData(renderData);
  };
  const handlePressMulti = (item) => {
    let renderData = [...data];

    if (item.name == "All") {
      if (item.selected) {
        for (let data of renderData) {
          data.selected = false;
        }
      } else {
        for (let data of renderData) {
          data.selected = true;
        }
      }
    } else {
      for (let data of renderData) {
        if (data._id == "1" && data.selected) {
          data.selected = false;
        }
        if (data._id == item._id) {
          data.selected = data.selected == null ? true : !data.selected;
          break;
        }
      }
    }
    const selectedData = renderData.filter((e) => e.selected).map((e) => e._id);
    onChange(selectedData);
    setData(renderData);
  };
  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      {list && list[0] == null ? null : (
        <FlatList
          data={list}
          keyExtractor={(item) => item._id}
          renderItem={showList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 10, flexGrow: 1 }}
          key={"?"}
        />
      )}
    </View>
  );
};
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({
  setLoader: (data) => dispatch(setLoader(data)),
  playRequest: (data, navigation) => dispatch(playRequest(data, navigation)),
  playDetailsRequest: (data, navigation) =>
    dispatch(playDetailsRequest(data, navigation)),
});
export default connect(mapStateToProps, mapDispatchToProps)(All);
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
    zIndex: 2,
  },
  uppercover: { flex: 1, backgroundColor: color._dusty_white },
  stepscovinner: {
    width: "100%",
    paddingLeft: 60,
  },
  pad15: {
    padding: 15,
  },
  widthfull: {
    width: "100%",
  },
  progressBox: {
    marginVertical: 8,
    marginBottom: 25,
  },
  coverboxmain: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  bgshape: { position: "absolute", zIndex: 1 },
  boxmain: {
    backgroundColor: "#F2FBEE",
    height: 54,
    width: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#F2FBEE",
    position: "relative",
  },
  tagItemStyle: {
    backgroundColor: "#F2FBEE",
    borderWidth: 1,
    borderColor: "#F2FBEE",
    borderRadius: 16,
    height: 55,
    paddingHorizontal: 17,
    width: "100%",
    minWidth: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  tagItemLabel: {
    color: color._dark_grey,
    // fontFamily: FONTS.PoppinsMedium,
    fontSize: 12,
    textAlign: "center",
  },
  tagSelectItem: {
    backgroundColor: "#CCF2DB",
    borderColor: color._dark_grey,
    width: "100%",
    minWidth: "100%",
  },
  labelSelected: {
    color: color._dark_grey,
  },
  iconpos: {
    position: "absolute",
    right: 15,
  },
  stepscov: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    position: "absolute",
  },
  boxttxt: {
    fontSize: 12,
    color: "#2F2729",
    // fontFamily: FONTS.PoppinsMedium,
  },
  smaltit: {
    fontSize: 10,
    color: "#5B5B5B",
    // fontFamily: FONTS.PoppinsRegular,
    textAlign: "center",
    marginBottom: 6,
  },
  mainbtnheader: {
    paddingHorizontal: 20,
  },
  questext: {
    fontSize: 14,
    marginHorizontal: 5,
    // fontFamily: FONTS.PoppinsSemiBold,
    color: color._dark_grey,
  },
  title: {
    fontSize: 20,
    // fontFamily: FONTS.PoppinsSemiBold,
    color: color._dark_grey,

    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    // fontFamily: FONTS.PoppinsRegular,

    textAlign: "center",
    paddingHorizontal: 50,
    paddingBottom: 40,
  },

  btn: {
    height: 61,
    backgroundColor: color._dark_grey,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: color._dark_grey,
    justifyContent: "center",
    marginTop: "auto",
    width: width - 120,
    borderRadius: 100,
  },
  btntext: {
    // fontFamily: FONTS.PoppinsSemiBold,
    color: color._dark_grey,
    textAlign: "center",
    letterSpacing: -0.333333,
  },

  inputContainer: {
    borderRadius: 15,
    height: 157,
    backgroundColor: "#00BC4C",
  },
  p15: {
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  newWrp: {
    backgroundColor: color._primary_orange,
    // justifyContent: 'center',
    height: 25,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
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
    gap: 10,
    marginTop: "2%",
  },
});
