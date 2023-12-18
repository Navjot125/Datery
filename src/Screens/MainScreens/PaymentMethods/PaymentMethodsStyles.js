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

  header: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 31,
  },
  cardView: {
    marginTop: 31,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  textStyle: {
    color: "#2F2729",
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 13,
    height: 155,
  },

  shadowProp: {
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  mediaType: {
    borderRadius: 50,
    backgroundColor: color._primary_orange,
    color: color._white,
    fontFamily: fonts.BOLD,
    fontSize: 10,

    paddingVertical: 5,
    width: 122,
    textAlign: "center",
  },
  textBetween: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: "#9796A1",
    paddingVertical: 6,
  },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 13,
    color: "#1F2937",
    // width: 203,
  },
  orangeText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._primary_orange,
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
  orangeButton: {
    marginVertical: 31,
    borderRadius: 122,
    // width: 161,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: color._border_orange,
    borderWidth: 1,
    backgroundColor: color._border_orange,
    flexDirection: "row",
  },
  orangeText: {
    fontFamily: "Mulish-Bold",
    fontSize: 16,

    lineHeight: 20,
    color: color._white,
    marginLeft: 5,
    textAlign: "center",
  },
});
export default styles;
