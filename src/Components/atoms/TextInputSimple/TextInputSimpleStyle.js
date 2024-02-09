import { StyleSheet, Dimensions, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";

const width = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(width - 70);

const styles = StyleSheet.create({
  inputErrorText: { fontSize: 12, color: color._font_err, bottom: 16 },
  inputContainer: {
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    marginBottom: 18,
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DCDCDD",
  },
  input: {
    height: 61,
    backgroundColor: color._white,
    fontSize: 16,
    fontFamily: fonts.BLACK_ITALIC,
    color: "#35454F",
    width: "100%",
    paddingHorizontal: 20,
  },
  leftpad: {
    paddingLeft: 15,
  },
  rightpad: {
    marginRight: 15,
  },
  label: {
    fontSize: 12,
    color: color._font_grey,
  },
});
export default styles;
