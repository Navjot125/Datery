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
    // height: hp('100%'),
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    backgroundColor: color._white,
    marginHorizontal: 20,
  },
  header: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainHeading: {
    paddingTop: 17,
    paddingBottom: 5,
    fontFamily: fonts.BOLD,
    fontSize: 24,
    color: color._black,
    lineHeight: 30,
  },
  textStyle: {
    color: color._black,
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },

  shadowProp: {
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    shadowRadius: 3,
  },
});
export default styles;
