import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './StickButtonStyle';
import Icon from 'react-native-vector-icons/Feather';

const StickButton = ({
  value,
  onPress,
  style,
  iconStyle,
  size = 22,
  ...props
}) => (
  <TouchableOpacity
  activeOpacity={0.9}
    style={[styles.plusButton, style]}
    onPress={onPress}
    {...props}>
    <View style={styles.plusButtonView}>
      <Icon name="plus" style={[styles.iconStyle, iconStyle]} />
    </View>
  </TouchableOpacity>
);

export default StickButton;
