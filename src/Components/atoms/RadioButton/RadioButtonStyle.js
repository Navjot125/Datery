import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../../Constants/Color';
// import { theme, F200, F300, F400, F500, F600 } from "../../../Constants/Theme";

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: wp(5),
  },
  textStyle: {
    marginTop: wp(0.5),
    marginLeft: wp(0.75),
    fontSize: wp(3.5),
    // color: theme.PLACEHOLDER_1,
    // fontFamily: F500,
  },
  textStyle2: {
    marginTop: wp(0.5),
    marginLeft: wp(0.75),
    fontSize: wp(3.5),
    // color: color._Dark_Blue,
    // fontFamily: F500,
  },
  uncheckedIcon: {
    // color: theme.PLACEHOLDER_1,
    fontSize: wp(6.25),
  },
  checkedIcon: {
    // color: color._Dark_Blue,
    fontSize: wp(6.25),
  },
  radioUncheckedIcon: {
    // color: theme.PLACEHOLDER_1,
    fontSize: wp(6.25),
  },
  radioCheckedIcon: {
    // color: color._Dark_Blue,
    fontSize: wp(6.25),
  },
});
export default styles;
