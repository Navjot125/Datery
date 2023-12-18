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
  mediaType2: {
    // borderRadius: 50,
    // backgroundColor: color._primary_orange,
    color: color._black,
    fontFamily: fonts.BOLD,
    fontSize: 10,
    // paddingVertical: 5,
    // width: 122,
    // textAlign: "center",
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
    // marginTop: 21,
    marginHorizontal: 5,
    backgroundColor: 'white',
    flex: 1,
    elevation: 2,
    borderRadius: 8,
    marginVertical: 5,
    padding: 5
  },
  summaryView: {
    // marginTop: 13,
    // marginBottom: 19,
    // marginHorizontal: 6,
    elevation: 2,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: 'white'
    // backgroundColor:'red'
  },
  textStyle: {
    color: "#000000",
    fontFamily: fonts.MEDIUM,
    fontSize: 11,
    marginTop: 4,
  },
  card: {
    // backgroundColor: "yellow",
    // borderRadius: 10,
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
    // padding: 13,
  },

  shadowProp: {
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    // shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    // shadowRadius: 3,
    elevation: 5
  },
  mediaType: {
    borderRadius: 10,
    backgroundColor: color._dusty_white,
    // color: color._white,
    // fontFamily: fonts.BOLD,
    // fontSize: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 5
    // width: 122,
    // textAlign: "center",
  },
  textBetween: {
    fontFamily: fonts.MEDIUM,
    fontSize: 10,
    color: color._black,
    // paddingVertical: 6,
  },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    color: color._font_grey,
    fontWeight: '700',
    lineHeight: 18
    // width: 203,
  },
  orangeText: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: color._black,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 1
  },
  lastText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftTitle: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  summaryTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 15,
    color: color._black,
    fontWeight: '700',
    lineHeight: 18
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
    fontWeight: "600"
    // marginBottom: 13,
  },
});
export default styles;
