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
    marginHorizontal: 20,
  },

  lastText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontFamily: fonts.MEDIUM,
    fontSize: 10,
    color: "#2B2B2B",
    opacity: 0.5,
  },
  cardValue: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: "#222222",
  },
  cardNumber: {
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    color: "#939393",
    marginVertical: 20,
    lineHeight: 20.27,
    letterSpacing: 1.66,
  },
  headings: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 14,
    color: "#261E27",
    marginBottom: 13,
  },
  headingAddress: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: "#2F2729",
    marginBottom: 16,
    marginTop: 31,
  },
  textField: {
    height: 48,
    borderColor: "#DCDCDD",
    color: "#35454F",
    fontFamily: fonts.REGULAR,
    fontSize: 16,
  },
  lastHeading: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: "#726A6A",
    marginVertical: 21,
    alignSelf: "center",
  },
  checkBoxStyle: {
    fontFamily: fonts.MEDIUM,
    color: color._black,
    opacity: 0.5,
    fontSize: 12,
  },
});
export default styles;
