import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "../../../Constants/Color";
import {
  theme,
  Regular,
  Medium,
  Semi,
  Bold,
  Heavy,
  fixStyles,
} from "../../../Constants/Theme";
const styles = StyleSheet.create({
  flex: {
    // flex: 1,
    backgroundColor: color._WHITE,
    marginVertical: wp(40),
    borderRadius: wp(4),
    maxHeight: wp(70),
  },
  bodyContainer: {},
  titleContainer: {
    backgroundColor: theme.THEME_COLOR,
    height: wp(15),
    position: "relative",
    borderTopEndRadius: wp(4),
    borderTopStartRadius: wp(4),
    justifyContent: "center",
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
    color: color._ccc,
    position: "absolute",
    right: wp(4),
    top: wp(4),
  },
  titileTxt: {
    fontSize: wp(4.75),
    textAlign: "center",
    fontWeight: "700",
  },
  descriptionTxt: {
    fontSize: wp(4),
    textAlign: "center",
    paddingTop: wp(2.5),
  },
  container: {
    padding: wp(5),
  },
  button: {
    backgroundColor: theme.THEME_COLOR,
    marginHorizontal: wp(5),
    borderRadius: wp(2),
    margin: wp(1),
    color: color._white,
  },
  button1: {
    backgroundColor: color._white,
    marginHorizontal: wp(5),
    borderRadius: wp(2),
    margin: wp(1),
    borderWidth: 0.5,
    borderColor: theme.THEME_COLOR,
  },
  butTxt: {
    color: theme.THEME_COLOR,
  },
  btnBox: {
    width: "50%",
    flexDirection: "row",
    paddingBottom: wp(5),
  },
});
export default styles;
