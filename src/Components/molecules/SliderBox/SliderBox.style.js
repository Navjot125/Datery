import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import color from '../../../Constants/Color';
import fonts from '../../../Constants/Fonts';

export default {
  paginationBoxStyle: {
    // position: 'relative',
    // bottom: 0,
    // padding: 0,
    // alignItems: 'center',s
    // alignSelf: 'center',
    // justifyContent: 'center',
    // paddingVertical: 3,
  },
  dotStyle: {
    borderColor: color._primary_blue,
    backgroundColor: color._primary_blue,
    marginHorizontal: 0,
    height: 7,
    width: 7,
  },
  inactiveDotStyle: {
    width: 5,
    height: 5,
    borderRadius: 7.5,
    // borderWidth: 1,
    marginHorizontal: 0,
    backgroundColor: '#fff',
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.BOLD,
    color: color._white,
    maxWidth: '83%',
    lineHeight: 30,
  },
  bannerContent: {
    position: 'absolute',
    bottom: '8%',
    left: 18,
  },
  btn: {
    borderRadius: wp(4),
    marginTop: wp(3.25),
  },
};
