import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../../Constants/Color';

const width = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(width - 70);
const styles = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    // zIndex:9,
    width: 45,
    height: 45,
    // backgroundColor: color._0075bf,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonView: {
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  iconStyle: {
    fontSize: wp(10),
    // color:'#fff',
  },
});
export default styles;
