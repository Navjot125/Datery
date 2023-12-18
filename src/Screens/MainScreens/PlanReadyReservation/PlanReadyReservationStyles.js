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
  },
  mediaType2: {
    // borderRadius: 50,
    // backgroundColor: color._primary_orange,
    color: color._font_grey,
    fontFamily: fonts.BOLD,
    fontSize: 10,
    // paddingVertical: 5,
    // paddingHorizontal: 20,
    // width: 122,
    // textAlign: 'left',
    fontWeight: '600',
    // left:2


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
    // backgroundColor:'red'
    // marginTop: 31,
    // marginHorizontal: 5,
  },
  textStyle: {
    color: "#2F2729",
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 24,
  },
  card: {
    backgroundColor: color._dusty_white,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
    // marginHorizontal: 15
  },

  shadowProp: {
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  mediaType: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: color._white,
    alignItems: 'center',
    paddingLeft:5,
    // color: color._white,
    // fontFamily: fonts.BOLD,
    // fontSize: 10,
    paddingVertical: 5,
    marginTop: 10,
    // paddingHorizontal: 5,
    // width: 132,
    // textAlign: "center",
    // flex: 1,
    // left: 5
  },
  textBetween: {
    fontFamily: fonts.MEDIUM,
    fontSize: 10,
    color: color._black,
    // top: 2
    marginVertical: 2,
    fontWeight: '600'
    // left: 5
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
  textTitle: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._font_grey,
    fontWeight: '700',
    // lineHeight: 18
    // width: 203,
  },
  orangeText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._primary_orange,
  },
  lastText: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: "center",
  },
});
export default styles;
