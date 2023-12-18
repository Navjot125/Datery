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
    // marginBottom: 24,
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#000000",
    marginTop: 9,
  },
  header: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: "#000000",
    // marginBottom: 13,
    marginTop: 24,
    // width: 296,
    // padding: 8,
    // textAlign: "center",
    // alignSelf: "center",
  },

  orangeTextSmall: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._border_orange,
  },
  labelStyle: { color: color._black, fontFamily: fonts.REGULAR },
});
export default styles;
