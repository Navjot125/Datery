import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./ButtonStyle";
import CustomLoader from "../CustomLoader/CustomLoader";

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  containerStyle,
  bottom,
  loader,
  ...props
}) => (
  <View style={[styles.submitBtnContainer, containerStyle]}>
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      {...props}
      style={[bottom ? styles.bottomBtn : styles.container, style]}
    >
      {loader ? (
        <CustomLoader />
      ) : (
        <Text style={[styles.btnText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  </View>
);

export default Button;
