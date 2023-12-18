import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import color from '../../Constants/Color';
import fonts from '../../Constants/Fonts';

const styles = StyleSheet.create({
  topSpace: {
    marginTop: wp(15),
  },
  topIcon: {
    flex: 1,
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    top: wp(-10),
  },
  heading: {
    fontSize: 30,
    fontFamily: fonts.BOLD,
    color: color._font_Dark,
    maxWidth: '50%',
  },
  descTxt: {
    fontSize: 16,
    fontFamily: fonts.REGULAR,
    color: color._font_Dark,
    maxWidth: '90%',
    marginTop: 5,
  },
  policyTxt: {
    color: color._grey_1,
    fontSize: 14,
    fontFamily: fonts.BOLD,
    marginLeft: 7,
  },

  orTxt: {
    fontSize: 16,
    color: color._grey_1,
    marginBottom: wp(4),
  },
  bottomBtnTxt: {
    fontSize: 16,
    fontFamily: fonts.BOLD,
  },
  txtInput: {
    backgroundColor: color._smoke_white,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    color: color._font_Dark,
    fontSize: 14,
    borderRadius: wp(1.25),
  },
  timerTxt: {
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    color: color._dark_grey,
  },
  hilitedFont: {
    fontSize: 13,
    fontFamily: fonts.SEMI_BOLD,
    color: color._primary_blue,
  },
  pickerStyle: {
    width: '100%',
    right: 0,
  },
});

export default styles;
