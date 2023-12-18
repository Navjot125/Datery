import { StyleSheet, TouchableNativeFeedbackComponent } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
const styles = StyleSheet.create({
  scrollView: {
    height: hp("100%"),
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 15,
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
    marginLeft: 6,
    marginRight: 11,
  },

  content: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    lineHeight: 24,
    color: color._black,
    opacity: 0.6,
  },
});
export default styles;
