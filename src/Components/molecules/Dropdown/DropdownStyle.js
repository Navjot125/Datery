import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import color from '../../../Constants/Color';
import fonts from '../../../Constants/Fonts';

export default styles = StyleSheet.create({
  drodownContainer: {
    width: '100%',
    minHeight: wp(13.29),
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlignVertical: 'center',
    color: '#000',
    justifyContent: 'center',
  },
  touchableView: {
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: 'lightgray',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: wp(2.5),
  },
  selectedTxt: {
    fontSize: wp(3.5),
    // fontWeight: '700',
    color: color._black,
    fontFamily: fonts.REGULAR,
    // paddingVertical: 1
  },
  landPlaceHolder: {
    fontSize: wp(3.5),
    // fontWeight: '700',
    color: color._dark_grey,
    fontFamily: fonts.REGULAR,
  },
  downArrowIcon: {
    fontSize: wp(5.5),
    color: color._black,
    position: 'absolute',
    right: wp(4.5),
  },
  dropdownList: {
    width: '100%',
    backgroundColor: color._smoke_white,
    maxHeight: wp(30),
    borderColor: color._border,
    borderWidth: 1,
    minHeight: wp(20),
    // position: Platform.OS === 'ios' ? 'relative' : 'absolute',
    // top: Platform.OS === 'ios' ? wp(0) : wp(12.5),
    // marginTop: 45,
    borderRadius: wp(2.5),
    // borderBottomLeftRadius: wp(2.5),
    // borderBottomRightRadius: wp(2.5),
    zIndex: 1024,
    overflow: 'hidden',
    elevation: 0,
    // position: "absolute",
    // flex: 1,
  },
  dropdownItems: {
    width: '100%',
    height: wp(10),
    // backgroundColor: color._smoke_white,
    justifyContent: 'center',
    borderBottomColor: color._border,
    paddingHorizontal: wp(2.5),
    zIndex: 1,
    marginBottom: wp(0.25),
  },
  w100: {
    width: '100%',
    // position: "absolute",
    // width: '100%',
    // backgroundColor: color._common_BG_color,
    // maxHeight: wp(30),
    // borderColor: color._border_color,
    // borderWidth: 1,
    // minHeight: wp(20),
    // // position: Platform.OS === 'ios' ? 'relative' : 'absolute',
    // // top: Platform.OS === 'ios' ? wp(0) : wp(12.5),
    // marginTop: 45,
    // borderRadius: wp(2.5),
    // // borderBottomLeftRadius: wp(2.5),
    // // borderBottomRightRadius: wp(2.5),
    // zIndex: 1024,
    // overflow: 'hidden',
    // elevation: 5,
    // position: "absolute",
    // zIndex: 15
  },
  checkIcon: {
    fontSize: wp(5),
    color: '#000',
    position: 'absolute',
    right: wp(2.5),
    // color: color._00a68f,
  },

  // Is Land Dropdown CSS
  mainContainer: {
    position: 'relative',
    // flex: 1,
  },
  labelTxt: {
    fontSize: wp(3.5),
    color: color._gray,
    fontFamily: fonts.REGULAR,
  },
});
