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
    marginHorizontal: 20,
  },

  textHeading: {
    fontFamily: fonts.SEMI_BOLD,
    marginTop: 13,
    fontSize: 16,
    lineHeight: 24,
    color: "#35454F",
    textAlign: "center",
    width: 322,
  },
  mainHeading: {
    fontFamily: fonts.BOLD,
    marginTop: 14,
    fontSize: 20,
    lineHeight: 30,
    color: color._font_Dark,
    textAlign: "center",
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

  item: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 17,
    justifyContent: "center",
    marginVertical: 8,
    height: 48,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: "#35454F",
  },
});
export default styles;
