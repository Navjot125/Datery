import { StyleSheet, TouchableNativeFeedbackComponent } from "react-native";
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
  textinputStyle: {
    // backgroundColor: "#F6F6F6",
    // padding: 15,
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: "#35454F",
    // marginBottom: 10,
    // borderRadius: 10,
  },

  viewStyle: {
    backgroundColor: "#F6F6F6",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    height: 48,
    alignItems: "center",
    paddingHorizontal: 17,
  },
});
export default styles;
