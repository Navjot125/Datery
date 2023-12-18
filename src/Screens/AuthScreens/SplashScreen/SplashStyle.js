import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    height: hp('100%'),
    width: wp('100%'),
  },
});
export default styles;
