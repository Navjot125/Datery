import {StyleSheet, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import color from '../../../Constants/Color';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: 2,
  },
  uppercover: {flex: 1, backgroundColor: color._dusty_white},
  stepscovinner: {
    width: '100%',
    paddingLeft: 60,
  },
  pad15: {
    padding: 15,
  },
  widthfull: {
    width: '100%',
  },
  progressBox: {
    marginVertical: 8,
    marginBottom: 25,
  },
  coverboxmain: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bgshape: {position: 'absolute', zIndex: 1},
  boxmain: {
    backgroundColor: '#F2FBEE',
    height: 54,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F2FBEE',
    position: 'relative',
  },
  tagItemStyle: {
    backgroundColor: '#F2FBEE',
    borderWidth: 1,
    borderColor: '#F2FBEE',
    borderRadius: 16,
    height: 55,
    paddingHorizontal: 17,
    width: '100%',
    minWidth: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tagItemLabel: {
    color: color._dark_grey,
    // fontFamily: FONTS.PoppinsMedium,
    fontSize: 12,
    textAlign: 'center',
  },
  tagSelectItem: {
    backgroundColor: '#CCF2DB',
    borderColor: color._dark_grey,
    width: '100%',
    minWidth: '100%',
  },
  labelSelected: {
    color: color._dark_grey,
  },
  iconpos: {
    position: 'absolute',
    right: 15,
  },
  stepscov: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
  },
  boxttxt: {
    fontSize: 12,
    color: '#2F2729',
    // fontFamily: FONTS.PoppinsMedium,
  },
  smaltit: {
    fontSize: 10,
    color: '#5B5B5B',
    // fontFamily: FONTS.PoppinsRegular,
    textAlign: 'center',
    marginBottom: 6,
  },
  mainbtnheader: {
    paddingHorizontal: 20,
  },
  questext: {
    fontSize: 14,
    marginHorizontal: 5,
    // fontFamily: FONTS.PoppinsSemiBold,
    color: color._dark_grey,
  },
  title: {
    fontSize: 20,
    // fontFamily: FONTS.PoppinsSemiBold,
    color: color._dark_grey,

    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    // fontFamily: FONTS.PoppinsRegular,

    textAlign: 'center',
    paddingHorizontal: 50,
    paddingBottom: 40,
  },

  btn: {
    height: 61,
    backgroundColor: color._dark_grey,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: color._dark_grey,
    justifyContent: 'center',
    marginTop: 'auto',
    width: width - 120,
    borderRadius: 100,
  },
  btntext: {
    // fontFamily: FONTS.PoppinsSemiBold,
    color: color._dark_grey,
    textAlign: 'center',
    letterSpacing: -0.333333,
  },

  inputContainer: {
    borderRadius: 15,
    height: 157,
    backgroundColor: '#00BC4C',
  },
  p15: {
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});

export default styles;
