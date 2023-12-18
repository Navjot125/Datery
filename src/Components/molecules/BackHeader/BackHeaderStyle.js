import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";

const styles = StyleSheet.create({
  header: {
    // marginVertical: wp(4.5),
    marginTop: wp(4.25),
  },
  title: {
    color: color._font_Dark,
    fontSize: 16,
    fontFamily: fonts.SEMI_BOLD,
  },
  right: {
    position: "absolute",
    right: 0,
  },
});

export default styles;
