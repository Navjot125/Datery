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
  textinputStyle: {
    // marginTop: 18,
    marginBottom: 24,
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: color._border_orange,
    letterSpacing: -0.3,
    lineHeight: 15,
    alignSelf: "flex-end",
  },
  header: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#35454F",
    marginBottom: 13,
    marginTop: 19,
    width: 296,
    padding: 8,
    textAlign: "center",
    alignSelf: "center",
  },
  orangeText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: color._border_orange,
    marginBottom: 13,
    marginTop: 20,
  },
  orangeTextSmall: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    textDecorationLine: "underline",
    color: color._border_orange,
    marginBottom: 13,
    marginTop: 20,
  },
});
export default styles;
