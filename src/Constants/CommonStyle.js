import { Dimensions, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "./Color";
import fonts from "./Fonts";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const base = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: color._white,
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "center",
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    smallSpaceInside: {
        padding: wp(1.25),
    },
    mediumSpaceInside: {
        padding: wp(2.75),
    },
    largeSpaceInside: {
        padding: wp(4.25),
    },
    smallSpaceOutSide: {
        margin: wp(1.25),
    },
    mediumSpaceOutSide: {
        margin: wp(1.25),
    },
    largeSpaceOutSide: {
        margin: wp(1.25),
    },
    horizonalSpace: {
        paddingHorizontal: wp(5),
    },
    fontSmall: {
        fontSize: wp(3.25),
        fontWeight: "bold",
    },
    fontMedium: {
        color: color._black,
        fontSize: wp(4.25),
    },
    fontBold: {
        color: color._black,
        fontSize: wp(4.25),
        fontWeight: "bold",
    },
    fontLarge: {
        fontSize: wp(6.5),
        color: color._black,
        fontWeight: "bold",
    },
    hilitedFont: {
        fontSize: wp(3.25),
        color: color._primary_blue,
        fontWeight: "700",
    },
    descriptionTxt: {
        color: color._black,
        fontSize: wp(3.5),
    },
    buttonTxt: {
        color: color._white,
        fontSize: wp(4.25),
        fontWeight: "900",
        fontFamily: fonts.BOLD,
    },
    border: {
        borderRadius: wp(2.75),
        borderColor: color._lightGray,
    },
    errMsg: {
        color: color._primary_red,
        fontSize: 12,
        marginBottom: 10,
    },
});

export default base;
