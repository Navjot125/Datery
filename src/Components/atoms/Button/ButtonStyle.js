import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import color from '../../../Constants/Color';
import fonts from '../../../Constants/Fonts';
// import { theme } from "../../../Constants/Theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: color._primary_orange,
    borderRadius: 100,
    paddingVertical: 10,
    height: 61,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnContainer: {
    width: '100%',
    marginVertical: 5,
  },
  bottomBtn: {
    // backgroundColor:color._Action_Buttons,
    // backgroundColor: color._primary_orange,
    borderRadius: 100,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignContent: 'space-between',
    position: 'absolute',
    bottom: wp(2),
    width: '100%',
    height: 61,
    // left:15,
    // width:'92.3%',
    // marginLeft:15,
    // marginRight:15,
  },
  btnText: {
    color: color._white,
    fontSize: wp(4),
    textAlign: 'center',
    textAlignVertical: 'center',
    // fontFamily: fonts.BOLD,
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
  },
});
export default styles;
