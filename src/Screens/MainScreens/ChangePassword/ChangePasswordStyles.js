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
    // marginBottom: 24,
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: color._primary_orange,
    letterSpacing: -0.3,
    lineHeight: 15,
    alignSelf: "flex-end",
  },
  header: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: "#261E27",
    marginBottom: 5,
    marginTop: 20,
  },
  inputErrorText: { fontSize: 12, color: "#FF0D10", bottom: 16 },
});
export default styles;
