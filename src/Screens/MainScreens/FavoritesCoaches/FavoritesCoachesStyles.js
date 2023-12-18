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
    // height: hp('100%'),
    backgroundColor: color._white,
  },
  mainView: {
    flex: 1,
    backgroundColor: color._white,
    marginHorizontal: 20,
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
    // marginTop: 31,
    marginHorizontal: 6,
  },
  textStyle: {
    color: "#2F2729",
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    // justifyContent: 'center',
    alignItems: "center",
    // padding: 13,
    padding: 5,
  },

  shadowProp: {
    // shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: -3, height: -3 },
    // shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  mediaType: {
    borderRadius: 50,
    backgroundColor: color._primary_orange,
    color: color._white,
    fontFamily: fonts.BOLD,
    fontSize: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  textBetween: {
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
    color: "#9796A1",
    marginVertical: 5,
  },
  textTitle: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: "#1F2937",
  },
  orangeText: {
    fontFamily: fonts.SEMI_BOLD,
    fontSize: 12,
    color: color._primary_orange,
  },
  lastText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'black',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 6,
    marginTop: 31,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: '#FD6643',
    borderRadius: 15,
  },
  buttonText: {
    color: '#ffffff',
  },
});
export default styles;
