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
    // marginHorizontal: 20,
    marginTop: 20,
  },
  card: {
    marginTop: 20,
  },
  textTitle: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16, 
    color: "#2F2729",
    marginBottom: 10,
  },
  textContent: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: color._black,
    lineHeight: 24,
  },
  ruleHeading: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: "#2F2729",
    marginVertical: 10,
  },
  ruleContent: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._black,
    lineHeight: 21,
  },
  
});
export default styles;
