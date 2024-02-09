import { StyleSheet, TouchableNativeFeedbackComponent } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../../../Constants/Fonts';
import color from '../../../Constants/Color';
const styles = StyleSheet.create({
  scrollView: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    // height: hp('100%'),
    // marginTop: 19,
    marginHorizontal: 15,
  },
  viewTop: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  textHeading: {
    height: 24,
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: '#2F2729',
  },
  mainHeading: {
    fontFamily: fonts.BOLD,
    marginTop: 14,
    fontSize: 20,
    lineHeight: 30,
    color: color._font_Dark,
    textAlign: 'center',
  },

  viewFlatList: {
    marginTop: 20,
    marginHorizontal: 6,
  },
  type: {
    fontFamily: fonts.BOLD,
    fontSize: 16,
    color: color._font_grey,
    marginTop: 5,
  },
  name: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._font_grey,
    marginTop: 6,
  },
  date: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: '#726A6A',
    marginTop: 6,
  },
  review: {
    // marginTop: 15,
    fontFamily: fonts.REGULAR,
    fontSize: 13,
    color: '#505050',
    // marginBottom: 6.8,
  },
  lineSeperator: {
    marginTop: 29,
    height: 1,
    width: '100%',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#9A9999',
    borderStyle: 'dashed',
    zIndex: 0,
  },
  innerSeperator: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    zIndex: 1,
  },
  itemSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  editButton: { height: 16, width: 16, marginRight: 6 },
});
export default styles;
