import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../../Constants/Color';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  inputBoxContainer: {
    marginBottom: wp(2),
  },
  inputLableTaxt: {
    fontSize: wp(4),
    fontWeight: '700',
    marginBottom: wp(2),
    // color: theme.LABLE_COLOR,
  },
  InputRow: {
    // borderWidth: 1,
    // borderColor: theme.PRIMARY_BORDER_COLOR,
    // height:wp(11),
    borderRadius: 3,
    flexDirection: 'row',
    // backgroundColor: theme.action_Buttons_Text_Color,
  },
  inputContainer: {
    minHeight: wp(11),
    paddingHorizontal: 10,
    textAlignVertical: 'center',
    color: '#000',
  },
  iconRowpass: {
    position: 'absolute',
    right: 3,
    top: 3,
    height: 40,
    width: 35,
    padding: 5,
    flexDirection: 'row',
  },
  leftIcon: {
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  rightIcon: {
    fontSize: 20,
  },
  leftContent: {
    // flex: 1,
  },
  rightContent: {},
});
export default styles;
