import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color._white,
  },
  logoImage: {
    width: wp(35),
    height: hp(16),
    marginTop: 91,
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color._white,
  },
  mainHeading: {
    marginTop: 23,
    fontFamily: fonts.BOLD,
    fontSize: 24,
    color: "#2F2729",
    lineHeight: 36,
  },
  headings: {
    marginTop: 23,
    fontFamily: "Mulish-SemiBold",
    fontSize: 16,
    color: "#35454F",
    lineHeight: 20,
  },
  heading2: {
    marginTop: 23,
    fontFamily: "Mulish-Medium",
    fontSize: 13,
    color: "#35454F",
    lineHeight: 22,
    textAlign: "center",
    width: 268,
  },
  textStyle: {
    marginTop: 23,
    fontFamily: "Mulish-Medium",
    fontSize: 13,
    color: "#35454F",
    lineHeight: 22,
    textAlign: "center",
    width: 325,
  },
  text2: {
    marginTop: 23,
    fontFamily: fonts.REGULAR,
    fontSize: 13,
    color: "#000000",
    opacity: 0.7,
    lineHeight: 22,
    textAlign: "center",
    width: 274,
  },
  buttonStyle: {
    marginTop: 17,
    backgroundColor: color._primary_orange,
    borderRadius: 122,
    width: 335,
    height: 61,
    alignItems: "center",
  },
  buttonText: {
    marginTop: 23,
    fontFamily: "Mulish-Bold",
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 20,
    textAlign: "center",
    width: 268,
    height: 42,
  },
  orangeText: {
    marginTop: 23,
    fontFamily: "Mulish-Regular",
    fontSize: 14,
    color: color._black,
    lineHeight: 31,
    textAlign: "center",
    marginBottom: 39,
  },
});

export default styles;
