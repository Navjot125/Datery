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
  logo: { width: 60, height: 60 },
  logoImage: {
    width: wp(35),
    height: hp(16),
    marginTop: "2%",
    alignSelf: "center",
  },
  scrollView: {
    height: hp("100%"),
    width: wp("100%"),
  },
  mainView: {
    flex: 1,
    marginHorizontal: 20,
  },

  textStyle: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 14,
    lineHeight: 21,
  },
  mainHeading: {
    fontFamily: fonts.BOLD,
    marginTop: 14,
    fontSize: 20,
    lineHeight: 30,
    color: color._font_Dark,
    textAlign: "center",
  },
  textHeading: {
    fontFamily: fonts.MEDIUM,
    marginTop: 14,
    marginBottom: 32,
    fontSize: 14,
    lineHeight: 18,
    color: color._font_light,
    textAlign: "center",
  },
  buttonPlace: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  signInButtonStyle: {
    backgroundColor: color._primary_orange,
    borderRadius: 122,
    width: 335,
    height: 61,
    alignItems: "center",
    marginTop: 43,
    alignSelf: "center",
    marginBottom: 21,
  },
  signInText: {
    marginTop: 23,
    fontFamily: "Mulish-Bold",
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 20,
    textAlign: "center",
    width: 268,
    height: 42,
  },
  input: {
    width: 331,
    height: 61,
    borderWidth: 0.4,
    marginTop: 17,
    borderRadius: 122,
    padding: 20,
  },
  textinputStyle: {
    marginTop: 18,
    marginBottom: 24,
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: "#1C1C1C",
    letterSpacing: -0.3,
    lineHeight: 15,
    alignSelf: "flex-end",
  },
  inputErrorText: { fontSize: 12, color: color._primary_orange, bottom: 16 },
});
export default styles;
