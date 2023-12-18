import { StyleSheet } from "react-native";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color._white,
  },
  view: {
    flex: 1,
    backgroundColor: color._white,
    marginHorizontal: 20,
  },
  text: {
    color: "#27272A",
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    // borderBottomWidth: 1,
    // borderBottomColor: "#EBEBF0",
    paddingVertical: 9,
  },
});
export default styles;
