import { StyleSheet } from "react-native";
import { color } from "../../../Constants/Color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  pastStatusView: {
    // flex: 2,
    // alignItems:'flex-end',
    // justifyContent:'center',
    // padding: 10,
    // position: 'relative',
  },
  ratingTxt: {
    color: "#FC9512",
    fontSize: 12,
    // position: 'absolute',
    // top: 5,
    // right: 10,
  },
  ratingButton: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
  },
  ratingButtonTxt: {
    textAlign: "center",
    // color:color._PRIMARYTXT,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default styles;
