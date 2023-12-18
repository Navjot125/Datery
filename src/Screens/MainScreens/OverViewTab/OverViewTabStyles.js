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
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
  },
  text: {
    color: color._black,
    fontFamily: fonts.REGULAR,
    fontSize: 14,
  },
  textNew: {
    color: "#261E27",
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
  },
});
export default styles;
