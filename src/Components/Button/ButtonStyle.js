import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../../Constants/Color';
import fonts from '../../Constants/Fonts';

const styles = StyleSheet.create({
  button: {
    backgroundColor: color._primary_blue,
    width: '100%',
    height: hp(6),
    marginVertical: wp(1.25),
    elevation: 3,
    shadowColor: color._black,
    borderRadius: wp(2),
  },
  btnTxt: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.BOLD,
    color: color._white,
  },
  buttonInstructor: {
    backgroundColor: color._white,
    width: '100%',
    height: hp(6),
    marginVertical: wp(1.5),
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
});

export default styles;
