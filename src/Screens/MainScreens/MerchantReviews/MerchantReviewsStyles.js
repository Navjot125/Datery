import { StyleSheet, TouchableNativeFeedbackComponent } from "react-native";
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
    marginHorizontal: 15,
    marginTop: 30
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
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 14,
    color: "#261E27",
    marginBottom: 6,
  },
  date: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: color._font_light_grey,
    marginTop: 6,
  },
  review: {
    marginTop: 6.3,
    fontFamily: fonts.REGULAR,
    fontSize: 13,
    color: color._black,
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
    color: color._font_grey,
    fontFamily: fonts.REGULAR,
    fontSize: 13,
  },
});
export default styles;
