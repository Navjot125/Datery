import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,

    backgroundColor: color._white,
  },

  container: {
    backgroundColor: color._white,
    // backgroundColor: "red",
    // marginTop: 68,
    marginTop: "30%",
    borderRadius: 28,
    marginHorizontal: 5,
    // height: 465,
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.35)",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  image: {
    width: 33,
    height: 25,
    marginTop: 44,
  },
  header: {
    color: "#000000",
    fontFamily: fonts.BOLD,
    fontSize: 24,
    textAlign: "justify",
    lineHeight: 30,
    marginHorizontal: 20,
  },
  body: {
    color: "#2F2729",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 39,
  },
});
export default styles;
