import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 20,
  },
  mediaType2: {
    borderRadius: 8,
    backgroundColor: color._font_white,
    // color: color._white,
    // fontFamily: fonts.BOLD,
    // fontSize: 10,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    // paddingHorizontal: 15,
    marginTop: 5
    // width: 122,
    // textAlign: "center",
    // flex: 0.5
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
    marginTop: 21,
    marginHorizontal: 5,
  },
  textStyle: {
    color: "#2F2729",
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 24,
  },
  card: {
    backgroundColor: color._white,
    borderRadius: 10,
    flexDirection: "row",
    // alignItems: "center",
    flex: 1,
    paddingVertical: 10,
    // paddingHorizontal: 5
    // padding: 13,
  },

  shadowProp: {
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  mediaType: {
    // borderRadius: 50,
    // backgroundColor: color._primary_orange,
    color: color._black,
    fontFamily: fonts.BOLD,
    fontSize: 10,
    alignSelf: 'flex-start',
    // paddingVertical: 5,
    // width: 122,
    // textAlign: "center",
  },
  textBetween: {
    fontFamily: fonts.MEDIUM,
    fontSize: 10,
    color: color._font_grey,
    // flex: 0.5
    // paddingVertical: 6,
  },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    color: color._font_grey,
    lineHeight: 18
    // marginHorizontal: 10
    // width: 203,
  },
  orangeText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._black,
  },
  lastText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop:10,
    marginHorizontal: 10,
    flex: 1
  },
  textLoc: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: color._font_grey,
    // top: 2,
    alignSelf: "flex-start",
    fontWeight: '600',
    lineHeight: 21
    // textAlign: 'left'
    // paddingRight:-20
  },
});
export default styles;
