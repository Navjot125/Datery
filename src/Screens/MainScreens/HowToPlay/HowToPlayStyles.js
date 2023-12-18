import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import { Colors } from "react-native/Libraries/NewAppScreen";
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 20,
  },
  card: {
    marginTop: 20,
    flex: 1
  },
  textTitle: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: color._black,
    // marginTop:20

    // marginBottom: 10,
  },
  textContent: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: color._black,
    lineHeight: 24,
    marginVertical: 10
  },
  ruleHeading: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: color._black,
    // marginVertical: 10,
  },
  ruleContent: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._black,
    lineHeight: 21,
  },
  newWrp: {
    backgroundColor: color._primary_orange,
    justifyContent: 'center',
    height: 25,
    borderRadius: 14,
    paddingHorizontal: 15,
    alignItems: 'center'
  },

  newWrpTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: color._font_white,
    fontFamily: fonts.SEMI_BOLD,
    textAlign: 'justify'
  },

  newMain: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 20,
    marginTop: '1%'
  }
});
export default styles;
