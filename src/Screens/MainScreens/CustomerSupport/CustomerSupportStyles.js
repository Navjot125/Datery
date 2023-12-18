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
    // height: hp('100%'),
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    marginTop: 19,
    marginHorizontal: 20,
  },
  viewTop: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
  textHeading: {
    height: 24,
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: "#2F2729",
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
    marginTop: 24,
    // marginLeft: 6,
    // marginRight: 11,
  },
  title: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    lineHeight: 21,
    color: color._black,
    // marginTop: 21,
  },

  content: {
    marginTop: 9,
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    lineHeight: 24,
    color: color._black,
    opacity: 0.6,
  },
});
export default styles;
