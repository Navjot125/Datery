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

  mainView: {
    flex: 1,
    // height: hp("100%"),
    // width: wp("100%"),
    flex: 1,
    paddingHorizontal: 20,
  },
  progressBox: {
    marginVertical: 8,
    marginBottom: 7,
    width: wp("90%"),

    height: 4,
    marginTop: 27,
  },
  textStyle: {
    marginBottom: "5%",
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 14,
    lineHeight: 21,
    color: color._black,
  },
  textHeading: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 20,
    lineHeight: 30,
    color: color._font_Dark,
    textAlign: "center",
  },
  buttonPlace: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
});
export default styles;
