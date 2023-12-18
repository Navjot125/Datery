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
  },
  backgroundVideo: {
    height: "100%",
    width: "100%",
    // position: "absolute",
    // flex: 1
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  video: {
    width: '100%',
    height: 200,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    position: 'absolute',
    height: "100%",
    width: "100%",
    // marginHorizontal:20
    // alignSelf: 'center',
    // flex: 1,
    // top: 0,
    // right: 0
  },
  scrollView2: {
    flex: 1,
    backgroundColor: color._white,
  },
  mainView2: {
    flex: 1,
  },
  text2: {
    color: color._black,
    fontFamily: fonts.REGULAR,
    fontSize: 14,
  },
  textNew: {
    color: color._black,
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
  },

});
export default styles;
