import React, { useState } from "react";
import { View, Text } from "react-native";
import styles from "./CheckBoxStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Checkbox } from "react-native-paper";
import color from "../../../Constants/Color";

const CheckBox = ({
  value,
  onPress,
  style,
  textStyle,
  checkBoxColor,
  unCheckedIconStyle,
  checkedIconStyle,
  containerStyle,
  labelStyle,
  size = 22,
  type,
  label,
  checkValue,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checkValue ? checkValue : false);
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <Checkbox.Android
        uncheckedColor={color._primary_orange}
        color={checkBoxColor ? checkBoxColor : color._primary_orange}
        status={isChecked ? "checked" : "unchecked"}
        onPress={(e) => {
          handleCheck();
          if (onPress !== undefined) {
            onPress(!isChecked);
          }
        }}
      // style={{margin: 0, padding: 0, backgroundColor: 'red'}}
      />
      <Text style={[styles.label, labelStyle]}>{label ? label : ""}</Text>
    </View>
  );
};

export default CheckBox;
