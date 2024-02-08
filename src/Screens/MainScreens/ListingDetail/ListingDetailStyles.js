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
    // marginHorizontal: 20,
    // backgroundColor:"red"
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
  boldText: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    color: color._black,
    lineHeight: 36,
    // marginTop: 5
  },
  menuText: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: color._black,
    fontWeight: "700",
    // lineHeight: 36,
    // marginTop: 5
  },
  boldName: {
    fontFamily: fonts.BOLD,
    fontSize: 22,
    color: color._font_grey,
    // lineHeight: 21,
    fontWeight: "700",
    // marginHorizontal:20
    // textAlign: 'left'
    // alignSelf:'flex-start'
  },
  orangeTitle: {
    marginTop: 14,
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: color._border_orange,
    lineHeight: 18,
    marginBottom: 18,
  },
  orangeRegular: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._border_orange,
    lineHeight: 18,
  },
  lightText: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#C4C4C4",
    lineHeight: 18,
    marginBottom: 18,
  },
  lastText: {
    color: color._font_grey,
    fontFamily: fonts.REGULAR,
    fontSize: 11,
    textAlign: "justify",
    lineHeight: 18,
  },
  item: {
    backgroundColor: color._primary_orange,
    paddingHorizontal: 17,
    justifyContent: "center",
    // marginTop: 18,
    paddingVertical: 20,
    marginVertical: 10,

    // height: 48,
    borderRadius: 12,
    // marginBottom: 26,
  },
  title: {
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    color: color._font_white,
    // textAlign: 'center',
    fontWeight: "800",
    // left: 10
  },

  textHeading: {
    height: 24,
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: color._black,
  },
  mainHeading: {
    fontFamily: fonts.BOLD,
    marginTop: 14,
    fontSize: 20,
    lineHeight: 30,
    color: color._font_Dark,
    textAlign: "center",
  },

  viewFlatList: {
    marginTop: 20,
    marginHorizontal: 6,
  },
  type: {
    fontFamily: fonts.BOLD,
    fontSize: 16,
    color: color._font_grey,
    marginTop: 5,
  },
  name: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: color._font_grey,
    marginBottom: 6,
    fontWeight: "700",
    lineHeight: 18,
  },
  date: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: color._font_grey,
    marginTop: 6,
  },
  review: {
    marginTop: 6.3,
    fontFamily: fonts.REGULAR,
    fontSize: 13,
    color: color._font_grey,
    marginBottom: 6.8,
    lineHeight: 18,
  },

  itemSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  dropdown: {
    width: 100,
  },
  placeholderStyle: {
    fontSize: 12,
    color: color._black,
    fontFamily: fonts.MEDIUM,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: color._black,
    fontFamily: fonts.MEDIUM,
  },
  inputSearchStyle: {
    fontSize: 12,
    color: color._black,
    fontFamily: fonts.MEDIUM,
  },

  bold: {
    marginTop: 22,
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: "#261E27",
    marginBottom: 6.8,
    lineHeight: 18,
  },
  rating: {
    color: "#9796A1",
    fontFamily: fonts.REGULAR,
    fontSize: 13,
  },
});
export default styles;
