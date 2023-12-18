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
    alignItems: "center",
    justifyContent: "center",
  },
  View: {
    marginTop: 31,
    alignItems: "center",
    justifyContent: "space-between",
    height: 185,
  },
  text: {
    // marginTop: 23,
    fontFamily: fonts.BOLD,
    fontSize: 24,
    color: "#2F2729",
    width: 288,
    textAlign: "center",
    lineHeight: 38,
  },
});

export default styles;
