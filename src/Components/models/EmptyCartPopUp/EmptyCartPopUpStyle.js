import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";

const styles = StyleSheet.create({
  flex: {
    // backgroundColor: color._white,
    // borderRadius: wp(5),
    // overflow: 'hidden',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
    // elevation: 10,

    backgroundColor: color._white,
    marginVertical: wp(40),
    borderRadius: wp(4),
    maxHeight: "80%",
  },
  bodyContainer: { padding: "5%" },
  titleContainer: {
    // justifyContent: 'center',
    // paddingHorizontal: wp(3.75),
    // paddingVertical: wp(3),
    // backgroundColor: color._white,
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
    // width: wp(20),
    // height: wp(15),
    // // backgroundColor: 'red'
    // alignSelf: 'center',
    width: wp(100),
    height: wp(8),
    alignSelf: "center",
    alignItems: "center",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  titileTxt: {
    fontSize: wp(4.75),
    color: color._font_orange,
    textAlign: "center",
    fontFamily: fonts.BOLD,
    // textTransform: 'capitalize'
  },
  descriptionTxt: {
    fontSize: wp(3.75),
    textAlign: "center",
    paddingTop: wp(2.5),
    fontFamily: fonts.REGULAR,
    color: color._black,
  },
  container: {
    padding: wp(5),
  },
  btnBox2: {
    width: "50%",
    paddingBottom: wp(5),
    ...Platform.select({
      ios: {
        flexDirection: "row",
      },
      android: {
        flexDirection: "row",
      },
      web: {},
    }),
  },
  btnBox: {
    flexDirection: "row",
    paddingBottom: wp(3.75),
  },
  btnCol: {
    flex: 1,
    paddingHorizontal: wp(3.75),
  },
  button: {
    backgroundColor: color._primary_blue,
    borderRadius: wp(2),
  },
  button2: {
    backgroundColor: color._white,
    borderWidth: 1,
    borderColor: color._primary_blue,
  },
  butTxt: {
    fontSize: wp(3.25),
    color: color._white,
    fontWeight: "normal",
    fontFamily: fonts.MEDIUM,
  },
});
export default styles;
