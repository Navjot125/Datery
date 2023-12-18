import {StyleSheet, Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../../Constants/Color';
// import { theme, F200, F300, F400, F500, F600 } from '../../../Constants/Theme';

export default styles = StyleSheet.create({
  tabBar: {
    width: '100%',
    height: wp(12.5),
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: wp(0.5),
    paddingHorizontal: wp(0.25),
  },
  tabTitle: {
    // color: '#000',
    fontSize: wp(4),
    fontWeight: '700',
  },
  topSep: {
    width: '100%',
    height: wp(0.25),
    position: 'absolute',
    top: 0,
  },
  sep: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: wp(0.75),
  },
  activeGradient: {
    // borderBottomColor: color._0075bf,
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    paddingHorizontal: wp(0.25),
  },
  inactiveGradient: {
    // borderBottomColor: color._0075bf,
    // marginTop:4,
  },
  activeTab: {
    // borderBottomColor: color._0075bf,
    borderBottomWidth: wp(0.5),
  },
  inactiveTab: {
    // borderBottomColor: color._0075bf,
    // fontFamily: F400,
  },
  activeTabTx: {
    // color: color._WHITE,
    // fontFamily: F500,
  },

  /// TAB 2 CSS
  PH15: {
    paddingHorizontal: wp(3.75),
  },
  tabBar2: {
    width: '100%',
    height: wp(12.5),
    flexDirection: 'row',
    // borderTopColor: color._WHITE,
    borderTopWidth: wp(0.5),
  },
  tab2: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topSep2: {
    width: '100%',
    height: wp(0.5),
    position: 'absolute',
    top: 0,
  },
  sep2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: wp(0.75),
    // backgroundColor: color._WHITE
  },
  tabRow: {
    flex: 1,
    flexDirection: 'row',
  },
  activeGradient2: {
    // borderTopColor: color._0075bf,
    borderBottomLeftRadius: wp(2.5),
    borderBottomRightRadius: wp(2.5),
  },
  activeTab2: {
    // backgroundColor: color._WHITE,
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
  tabTitle2: {
    // color: color._WHITE,
    fontSize: wp(3.5),
  },
  inactiveTabTx2: {
    // color: color._WHITE,
    // fontFamily: F400,
  },
  activeTabTx2: {
    // color: color._BLACK,
    // fontFamily: F500,
  },
});
