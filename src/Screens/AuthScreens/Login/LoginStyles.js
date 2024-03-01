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
    alignSelf: "center",
  },
  mainView: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: color._white,
  },
  logo: {
    width: 60,
    height: 60,
  },
  textStyle: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 14,
    lineHeight: 21,
  },
  textHeading: {
    fontFamily: fonts.MEDIUM,
    marginTop: 14,
    fontSize: 14,
    lineHeight: 18,
    color: color._black,
    textAlign: "center",
    marginBottom: "8%",
    fontWeight: '400'
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
    marginTop: 48,
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
  },
  textinputStyle: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: color._primary_orange,
    letterSpacing: -0.3,
    lineHeight: 15,
    alignSelf: "flex-end",
  },
  inputErrorText:
  {
    fontSize: 12,
    // color: color._primary_orange,
    color: 'red',
    bottom: 16
  },
});
export default styles;
