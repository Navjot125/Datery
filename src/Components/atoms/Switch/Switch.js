import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
// import OFFSVG from "../../../resources/svg/ic_switch_off.svg";
// import ONSVG from "../../../resources/svg/ic_switch_on.svg";

const Switch = ({ value, onPress, style, textStyle, size = 50, ...props }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={[styles.checkBox, style]}
    onPress={onPress}
    {...props}
  >
    {/* {value ? (
      <ONSVG width={wp(12.5)} height={wp(7.5)} />
    ) : (
      <OFFSVG width={wp(12.5)} height={wp(7.5)} />
    )} */}
    {/* <Image style={{ width: 50, height: 30 }} source={value ? resources.ON : resources.OFF} resizeMode={'contain'} /> */}
  </TouchableOpacity>
);

export default Switch;
