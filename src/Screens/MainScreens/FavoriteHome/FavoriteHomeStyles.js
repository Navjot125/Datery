import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    // marginHorizontal: 20,
  },
  boldText: {
    fontFamily: fonts.BOLD,
    fontSize: 18,
    color: "#333333",
    lineHeight: 36,
  },
  boldName: {
    fontFamily: fonts.BOLD,
    fontSize: 24,
    color: "#1F2937",
  },
  orangeTitle: {
    marginTop: 14,
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: color._border_orange,
    lineHeight: 18,
    marginBottom: 18,
  },
  orangeRegular: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._border_orange,
    lineHeight: 18,
  },
  lightText: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#C4C4C4",
    lineHeight: 18,
    marginBottom: 18,
  },
  lastText: {
    color: "#505050",
    fontFamily: fonts.REGULAR,
    fontSize: 11,
    textAlign: "justify",
    lineHeight: 18,
  },
  button: {
    backgroundColor: color._primary_orange,
    paddingHorizontal: 17,
    justifyContent: "center",
    // marginTop: 18,
    paddingVertical: 15,
    marginVertical: 10,

    // height: 48,
    borderRadius: 12,
  },
  item: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 17,
    justifyContent: "center",
    // marginTop: 18,
    height: 48,
    borderRadius: 10,
    marginBottom: 26,
  },
  title: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#333333",
  },
  shadowProp: {
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  cardView: {
    // marginTop: 18,
    // marginHorizontal: 5,
    // backgroundColor:'red',
    // backgroundColor: color._font_white,
    borderRadius: 8,
    // paddingVertical: 15,
    // paddingHorizontal: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "black",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rowBack: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: 'red',
    // paddingVertical:100
    // paddingHorizontal: 6,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 67,
    paddingHorizontal: 20,
    // marginTop: -60,
    backgroundColor: color._primary_orange,
    borderRadius: 15,

    // width: 65,
    // height: '80%',
  },
  buttonText: {
    color: "#ffffff",
  },
});
export default styles;
