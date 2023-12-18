import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "../../../Constants/Color";

const styles = StyleSheet.create({
  flex: {
    // flex: 1,
    backgroundColor: color._white,
    marginVertical: wp(40),
    borderRadius: wp(4),
    maxHeight: wp(70),
  },
  bodyContainer: {},
  titleContainer: {
    backgroundColor: color._white,
    height: wp(15),
    position: "relative",
    borderTopEndRadius: wp(4),
    borderTopStartRadius: wp(4),
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: color._primary_blue,
  },
  LogoBox: {
    width: 320,
    height: wp(7),
    alignSelf: "center",
    alignItems: "center",
  },
  LogoBox2: {
    width: wp(50),
    height: wp(6),
    alignSelf: "center",
    alignItems: "center",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  crossIcon: {
    fontSize: wp(5),
    color: color._grey_1,
    position: "absolute",
    right: wp(4),
    top: wp(4),
  },
  titileTxt: {
    fontSize: wp(4.75),
    textAlign: "center",
    fontWeight: "700",
    color: color._font_Dark,
  },
  descriptionTxt: {
    fontSize: wp(4),
    textAlign: "center",
    paddingTop: wp(2.5),
    color: color._gray,
  },
  container: {
    padding: wp(5),
  },
  button: {
    backgroundColor: color._primary_blue,
    marginHorizontal: wp(5),
    borderRadius: wp(2),
    margin: wp(1),
  },
  button1: {
    backgroundColor: color._white,
    marginHorizontal: wp(5),
    borderRadius: wp(2),
    margin: wp(1),
    borderWidth: 0.5,
    borderColor: color._primary_blue,
  },
  butTxt: {
    color: color._font_Dark,
  },
  butTxt1: {
    color: color._white,
  },
  btnBox: {
    width: "50%",
    flexDirection: "row",
    paddingBottom: wp(5),
  },
});
export default styles;
