import { StyleSheet, TouchableNativeFeedbackComponent } from "react-native";
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
    marginHorizontal: 20,
  },
  textinputStyle: {
    textAlign: "left",
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: "#000000",
    marginTop: 9,
    width: 150,
  },
  header: {
    fontFamily: fonts.BOLD,
    fontSize: 14,
    color: "#000000",
    // marginBottom: 13,
    marginTop: 24,
    // width: 296,
    // padding: 8,
    // textAlign: "center",
    // alignSelf: "center",
  },

  orangeTextSmall: {
    fontFamily: fonts.REGULAR,
    fontSize: 14,
    color: color._border_orange,
  },
  labelStyle: { color: color._black, fontFamily: fonts.REGULAR },
  dropdown: {
    height: 36,
    width: 164,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DCDCDD",
    borderRadius: 50,
  },
  placeholderStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: color._black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
    color: color._black,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
export default styles;
