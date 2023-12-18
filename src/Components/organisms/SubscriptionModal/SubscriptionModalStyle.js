import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../../../Constants/Color';
import fonts from '../../../Constants/Fonts';

const styles = StyleSheet.create({
  //   Moddle Content CSS
  middleContent: {
    minHeight: hp(20),
    justifyContent: 'flex-end',
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
    maxWidth: '60%',
    lineHeight: 24,
  },
  description: {
    width: wp(85),
    lineHeight: wp(5.25),
  },

  // Bottom Contrnt CSS
  bottom: {
    position: 'absolute',
    bottom: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  bottomTxt: {
    width: wp(80),
    fontSize: wp(3.25),
    textAlign: 'center',
    color: color._gray,
    lineHeight: wp(4.75),
  },

  // Mobile Number Container CSS
  containerStyle: {
    width: '100%',
    marginTop: wp(3.75),
    borderRadius: wp(2.25),
    borderWidth: 1,
    borderColor: color._mediumGray,
  },
  countryPicker: {
    flex: 1,
    paddingHorizontal: wp(2.75),
  },
  inputTextField: {
    color: color._black,
  },
  textInput: {
    width: '68%',
    left: -wp(14),
    color: color._black,
  },
  pickerStyle: {
    width: '100%',
    right: 0,
  },
  btn: {
    borderRadius: wp(4),
    marginTop: wp(3.25),
  },

  button: {
    backgroundColor: color._white,
    width: '100%',
    height: hp(6),
    marginVertical: wp(2.25),
    elevation: 0,
    shadowColor: color._black,
    borderRadius: wp(2),
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color._primary_blue,
    flexDirection: 'row',
  },
  btnTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: fonts.BOLD,
    color: color._font_Dark,
  },
  buttonEmail: {
    backgroundColor: color._smoke_white,
    width: '100%',
    height: hp(6),
    marginVertical: wp(3.25),
    elevation: 0,
    shadowColor: color._black,
    borderRadius: wp(2),
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp(18),
  },
  btnEmailTxt: {
    fontSize: 14,
    // fontWeight: 'bold',
    fontFamily: fonts.BOLD,
    color: color._font_Dark,
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
    padding: 15,
    marginVertical: 5,
    color: color._font_Dark,
    fontSize: 14,
    borderRadius: wp(1.25),
  },
  hilitedFont: {
    fontSize: 12,
    color: color._primary_blue,
    fontFamily: fonts.SEMI_BOLD,
    marginTop: wp(1.5),
  },

  buttonInstructor: {
    backgroundColor: color._white,
    width: '100%',
    height: hp(6),
    marginVertical: wp(6),
    elevation: 0,
    shadowColor: color._black,
    borderRadius: wp(2),
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color._primary_blue,
  },
  btnInsTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: fonts.BOLD,
    color: color._primary_blue,
  },

  titleTxt: {
    fontSize: 18,
    fontFamily: fonts.MEDIUM,
    marginBottom: '1%',
    color: color._black,
  },
});

export default styles;
