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
    marginHorizontal: 10,
  },

  cardView: {
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // elevation: 2,
    // borderRadius: 10,
    // shadowColor: color._grey_1,
    marginHorizontal: 5,
    backgroundColor: "white",
    flex: 1,
    elevation: 2,
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    marginBottom: 15,
    // backgroundColor:"red",
    // marginHorizontal: 20,
    // flex:1
    // marginTop: 31,
    // paddingHorizontal: 20,
  },
  summaryView: {
    marginVertical: 10,
    // marginTop: 13,
    // marginBottom: 19,
    marginHorizontal: 6,
  },

  card: {
    flex: 1,

    // backgroundColor: "red",
    // borderRadius: 10,
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 5,
    // padding: 13,
  },
  cards: {
    backgroundColor: color._white,
    elevation: 2,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    // width: "100%",
    // opacity:0.1,
    // padding: 13,
  },
  cardText: {
    color: "#000000",
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    lineHeight: 15,
    alignSelf: "center",
    paddingLeft: 10,
  },

  shadowProp: {
    // backgroundColor:'red'
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    // shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    // shadowRadius: 3,
  },
  mediaType2: {
    color: color._black,
    // fontFamily: fonts.BOLD,
    fontSize: 13,
    alignSelf: "flex-start",
    fontWeight: "400",
  },
  mediaType: {
    borderRadius: 5,
    backgroundColor: color._primary_orange,
    // color: color._white,
    // fontFamily: fonts.BOLD,
    // fontSize: 10,
    alignSelf: "flex-start",
    paddingVertical: 7,
    paddingHorizontal: 5,
    marginTop: 5,
    // width: 122,
    // textAlign: "center",
    // flex: 0.5
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
    fontSize: 14,
    color: color._font_grey,
    lineHeight: 18,
    // marginHorizontal: 10
    // width: 203,
  },
  orangeText: {
    fontFamily: fonts.BOLD,
    fontSize: 17,
    color: color._font_grey,
    // top: 2,
    alignSelf: "flex-start",
    fontWeight: "700",
    lineHeight: 21,
  },
  lastText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  leftTitle: {
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    color: color._black,
    paddingVertical: 10,
  },
  summaryTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 15,
    color: color._border_orange,
    marginVertical: 5,
  },
  textModal: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 11,
    color: "#261E27",
    width: "40%",
    textAlign: "center",
  },
  cardError: {
    color: "#261E27",
    opacity: 0.6,
    fontFamily: fonts.MEDIUM,
    fontSize: 13,
    textAlign: "center",
  },
  seperator: {
    borderBottomWidth: 1,
    borderColor: "#9A9999",
    borderStyle: "dashed",
    marginVertical: 16,
  },
  buttons: {
    width: 20,
    height: 20,
    backgroundColor: color._primary_orange,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 17,
    borderRadius: 40,
    paddingVertical: 2,
    fontFamily: fonts.MEDIUM,
    color: "#3B2645",
    marginHorizontal: 4,
  },
  terms: {
    marginTop: 35,
    color: color._black,
    fontFamily: fonts.MEDIUM,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: color._black,
    lineHeight: 17.57,
    textAlign: "center",
  },
  textLoc: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 15,
    color: color._font_grey,
    // top: 2,
    alignSelf: "flex-start",
    fontWeight: "700",
    lineHeight: 21,
    // textAlign: 'left'
    // paddingRight:-20
  },
  textField: {
    height: 40,
    borderColor: "#DCDCDD",
    color: "#35454F",
    fontFamily: fonts.REGULAR,
    fontSize: 16,
    borderRadius: 10,
    // marginHorizontal:10
  },
  headings: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._black,
    fontWeight: "600",
    marginBottom: 5,
    // marginBottom: 13,
  },
});
export default styles;
