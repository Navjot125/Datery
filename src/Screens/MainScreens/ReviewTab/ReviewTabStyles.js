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
  text: {
    color: color._black,
    fontFamily: fonts.REGULAR,
    fontSize: 12,
  },
  textNew: {
    color: "#261E27",
    fontFamily: fonts.BOLD,
    fontSize: 14,
  },
  textsmall: {
    color: "#261E27",
    fontFamily: fonts.BOLD,
    fontSize: 11,
    paddingTop: 5,
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
    marginBottom: 13,
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
    marginBottom: 6.8,
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
    marginBottom: 45,
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
    borderColor: color._grey_1,
    borderWidth: 1,
    height: 60,
    borderRadius: 10,
    padding: 10,
    color: 'black'
  },
  title3: {
    color: color._font_Dark,
    fontSize: 16,
    fontFamily: fonts.SEMI_BOLD,
  },
});
export default styles;
