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
    marginHorizontal: 20,
  },
  main: {
    flex: 1,
  },
  mediaType2: {
    // borderRadius: 50,
    // backgroundColor: color._primary_orange,
    color: color._font_grey,
    fontFamily: fonts.BOLD,
    fontSize: 10,
    // paddingVertical: 5,
    // paddingHorizontal: 20,
    // width: 122,
    textAlign: 'left',
    fontWeight: '600',


  },
  header: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 31,
  },
  cardView: {
    // marginTop: 31,
    // marginHorizontal: 5,
    // backgroundColor:'red'
  },
  textStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._black,
    marginHorizontal: 10
  },
  card: {
    // backgroundColor: color._dusty_white,
    borderRadius: 10,
    marginTop: 10
    // padding:5
  },

  shadowProp: {
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    // shadowRadius: 3,
    // backgroundColor:'red'
  },
  mediaType: {
    // borderRadius: 50,
    backgroundColor: color._white,
    // color: color._white,
    // fontFamily: fonts.BOLD,
    // fontSize: 10,
    paddingVertical: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    // width: 132,
    // textAlign: "center",
    // flex: 1,
    // left: 5
  },
  textBetween: {
    fontFamily: fonts.MEDIUM,
    fontSize: 10,
    color: color._font_grey,
    // top: 2
    marginVertical: 2
    // left: 5
  },
  textLoc: {
    fontFamily: fonts.MEDIUM,
    fontSize: 10,
    color: color._font_grey,
    // top: 2,
    alignSelf: "flex-start"
    // textAlign: 'left'
    // paddingRight:-20
  },


  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 12,
    fontWeight: '700',
    // color: color._border_orange,
    // width: 203,
    color: color._font_grey,
    // top: 10,
    // left: 5
  },
  orangeText: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    color: color._primary_orange,
  },
  lastText: {
    // flexDirection: "row",
    // justifyContent: 'space-between',
    // alignItems: "center",
    // flex: 1,
    backgroundColor: 'red'

  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  linearGradient: {
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
    justifyContent: 'center'
  },
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
  bodyContainer: {
    padding: "5%",
  },
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
