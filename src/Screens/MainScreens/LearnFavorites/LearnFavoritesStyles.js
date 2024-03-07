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
    backgroundColor: color._white,
  },
  header: {
    marginTop: 24,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 31,
  },
  cardView: {
    // marginTop: 17,
    // marginHorizontal: 6,
    // backgroundColor: "yellow",
    borderRadius: 10,
    // paddingHorizontal:20
  },
  title: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#333333",
  },
  button: {
    backgroundColor: color._primary_orange,
    justifyContent: "center",
    paddingVertical: 15,
    marginHorizontal: 20,
    // height: 48,
    borderRadius: 12,
  },
  textStyle: {
    color: "#2F2729",
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 24,
  },
  card: {
    // backgroundColor: "white",
    // // backgroundColor: "red",
    // borderRadius: 10,
    // width: "100%",
    // flexDirection: "row",
    // alignItems: "center",
    // padding: 5,
    
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },

  shadowProp: {
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  mediaType2: {
    borderRadius: 50,
    backgroundColor: color._primary_orange,
    color: color._white,
    fontFamily: fonts.BOLD,
    fontSize: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginLeft: 15,
    marginBottom: 10,
  },
  mediaType: {
    // borderRadius: 50,
    backgroundColor: color._primary_orange,
    color: color._white,
    fontFamily: fonts.BOLD,
    fontSize: 12,
    paddingHorizontal: 10,
    // paddingVertical: 4,
  },
  textBetween: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: "#9796A1",
  },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 15,
    color: "#1F2937",
  },
  orangeText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 13,
    color: color._black,
    // left:-5
  },
  lastText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    // paddingHorizontal: 6,
    // marginTop: 21,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: "100%",
  },
  deleteButton: {
    backgroundColor: color._primary_orange,
    borderRadius: 15,
  },
  buttonText: {
    color: "#ffffff",
  },
});
export default styles;
