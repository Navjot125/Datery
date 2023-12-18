import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../../Constants/Color';

const styles = StyleSheet.create({
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordTxt: {
    fontSize: 20,
    textAlign: 'center',
  },
  msgDesc: {
    fontSize: 16,
    textAlign: 'center',
    // color: color._lable_Light_Color_2,
    paddingHorizontal: 30,
    marginVertical: 5,
  },
  msg: {
    fontWeight: '600',
    // color:color._BLACK,
    fontSize: 22,
    textAlign: 'center',
  },
});
export default styles;
