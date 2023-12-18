import { Dimensions, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";

const DOT_SIZE = 8;
const { width } = Dimensions.get("window");


const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
  },
  card: {
    marginTop: 20,
  },
  textTitle: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: "#2F2729",
    marginBottom: 10,
  },
  textContent: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    color: color._black,
    lineHeight: 24,
  },
  ruleHeading: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 16,
    color: "#2F2729",
    marginVertical: 10,
  },
  ruleContent: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._black,
    lineHeight: 21,
  },
  container: {
    flexDirection: "row",
    backgroundColor: color._dusty_white,
    borderRadius: 10,
    height: 154,
  },
  image: {
    width: wp("48.1%"),
    resizeMode: "contain",
    height: "100%",
  },
  header: {
    color: "#000000",
    fontFamily: fonts.BOLD,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
  },
  body: {
    color: "#FFFFFF",
    fontFamily: fonts.BOLD,
    fontSize: 12,
    lineHeight: 24,
    backgroundColor: color._primary_orange,
    width: 95,
    borderRadius: 122,
    textAlign: "center",
    padding: 5
  },
  wrapPagination: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // backgroundColor:'red'
  },
  dot: {
    height: DOT_SIZE,
    width: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginHorizontal: 3,
    // padding: 5
    // marginVertical: 10,
  },
  wrapItem: {
    width,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  bottomScndCntnr: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: 10,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: '#DCDCDD'
  },
  bttmTxt: {
    fontSize: 13,
    fontWeight: '500'
  },
  rdioBttnCntnr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 13,
    marginHorizontal: 23,
    // marginTop: 20
  },
  rdioTxt: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: fonts.REGULAR,
    color: color._black,
    lineHeight: 21
  },
  bottmInsideMain: {
    borderBottomWidth: 1,
    // justifyContent: 'center',
    // padding: 5,
    borderBottomColor: '#DCDCDD',
    paddingVertical: 10,
    // alignItems:'center'
  }
});
export default styles;
