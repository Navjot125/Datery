import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../../../Constants/Color';

const styles = StyleSheet.create({
  headerContainer: {
    minHeight: hp(6),
    top: 10,
    justifyContent: 'space-between',
    paddingBottom: wp(2.25),
  },
  backBox: {
    padding: 5,
    borderWidth: 0.5,
    borderRadius: wp(2.25),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color._mediumGray,
  },
  textLogin: {
    color: color._blue,
    fontWeight: '700',
  },
});

export default styles;
