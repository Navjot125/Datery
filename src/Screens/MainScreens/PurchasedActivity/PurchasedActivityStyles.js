import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
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
    // marginHorizontal: 20,
  },
  boldText: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    color: "#333333",
    // lineHeight: 36,
  },
  boldName: {
    fontFamily: fonts.BOLD,
    fontSize: 24,
    color: "#1F2937",
  },
  orangeTitle: {
    marginTop: 14,
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: color._border_orange,
    lineHeight: 21,
    // marginBottom: 18,
  },
  orangeRegular: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._border_orange,
    lineHeight: 18,
  },
  lightText: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#C4C4C4",
    lineHeight: 18,
    marginVertical: 5
    // marginBottom: 18,
  },
  lastText: {
    color: "#505050",
    fontFamily: fonts.REGULAR,
    fontSize: 11,
    // textAlign: "justify",
    // lineHeight: 18,
  },
  item: {
    backgroundColor: color._dusty_white,
    paddingHorizontal: 17,
    justifyContent: "center",
    marginVertical: 5,
    // marginTop: 18,

    height: 48,
    borderRadius: 10,
    // marginBottom: 26,
  },
  title: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#333333",
  },
  map: {
    width: widthPercentageToDP(100 - 5),
    height: 200
  },
  dateText: {
    color: color._black,
    fontFamily: fonts.MEDIUM,
    fontSize: 11,
  },
  dropdown: {
    width: 90,
    marginLeft: -75,
  },
  review: {
    // marginTop: 8,
    fontFamily: fonts.REGULAR,
    fontSize: 10,
    color: "#505050",
    // marginBottom: 6.8,
    lineHeight: 18,
    // marginLeft: 70,
    // justifyContent:'flex-start',
  },
  placeholderStyle: {
    fontSize: 11,
    color: color._black,
    fontFamily: fonts.BOLD,
    lineHeight: 15

  },
  selectedTextStyle: {
    fontSize: 12,
    color: color._black,
    fontFamily: fonts.MEDIUM,
  },
  safeView: {
    flex: 1,
    // height: hp('100%'),
    // width: wp('100%'),
    backgroundColor: color._white,
    marginTop:35
  },
  scrollView2: {
    marginHorizontal: 6,
    flex: 1,
  },
  mainView2: {
    // flex: 1,
    height: hp('100%'),
    marginTop: 19,
    marginHorizontal: 15,
  },
  viewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textHeading: {
    height: 24,
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: '#2F2729',
  },
  headings: {
    fontFamily: fonts.SEMI_BOLD,
    marginTop: 19,
    // marginBottom: 13,
    fontSize: 12,
    lineHeight: 15,
    color: color._font_grey,
  },

  viewFlatList: {
    marginTop: 20,
    marginHorizontal: 6,
  },
  type: {
    fontFamily: fonts.BOLD,
    fontSize: 16,
    color: color._font_grey,
    marginTop: 5,
  },
  name: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._font_grey,
    marginTop: 6,
  },
  date: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: '#726A6A',
    marginTop: 6,
  },
  review2: {
    marginTop: 6.3,
    fontFamily: fonts.REGULAR,
    fontSize: 13,
    color: '#505050',
    // marginBottom: 6.8,
  },
  uploadImage: {
    marginVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    height: 133,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#AFAEB4',
  },
  uploadText: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: '#AFAEB4',
    marginTop: 11,
  },
  removeText: {
    marginTop: 36,
    fontFamily: fonts.BOLD,
    textDecorationLine: 'underline',
    fontSize: 14,
    color: color._primary_orange,
    alignSelf: 'center',
    // marginBottom: 45,
  },
  noteText: {
    fontFamily: fonts.REGULAR,
    fontSize: 11,
    color: '#505050',
    marginTop: 11,
  },
  selectedImage: {
    width: 120,
    height: 120,
    borderWidth: 0.5,
    marginTop: 10,
    flexDirection: 'row',
  },
  input: {
    borderColor: color._white,
    // borderWidth: 1,
    // height: 60,
    borderRadius: 10,
    // padding: 10,
    color: 'black',
    backgroundColor: color._white
  },
  title3: {
    color: color._font_Dark,
    fontSize: 16,
    fontFamily: fonts.SEMI_BOLD,
  },
  textField: {
    height: 40,
    borderColor: "#DCDCDD",
    color: "#35454F",
    fontFamily: fonts.REGULAR,
    fontSize: 16,
    borderRadius: 10,
    // marginHorizontal:10
  },
  headings2: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._black,
    fontWeight: "600"
    // marginBottom: 13,
  },
  textLoc: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._font_grey,
    // top: 2,
    alignSelf: "flex-start",
    fontWeight: '600',
    lineHeight: 21
    // textAlign: 'left'
    // paddingRight:-20
  },
});
export default styles;
