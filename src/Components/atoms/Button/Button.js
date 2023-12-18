import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './ButtonStyle';

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  containerStyle,
  bottom,
  ...props
}) => (
  <View style={[styles.submitBtnContainer, containerStyle]}>
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      {...props}
      style={[bottom ? styles.bottomBtn : styles.container, style]}>
      <Text style={[styles.btnText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  </View>
);

export default Button;
