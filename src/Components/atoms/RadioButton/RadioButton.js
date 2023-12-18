import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './RadioButtonStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const RadioButton = props => {
  const {
    value,
    onPress,
    containerStyle,
    title,
    textStyle,
    style,
    unCheckedIconStyle,
    checkedIconStyle,
    size = 22,
    type,
  } = props;
  if (type === 1) {
    return (
      <View style={[styles.mainContainer, containerStyle]}>
        <TouchableOpacity 
            activeOpacity={0.9}
        
        style={[styles.checkBox, style]} onPress={onPress}>
          {value === true && (
            <Icon
              name="radiobox-marked"
              style={[styles.radioCheckedIcon, checkedIconStyle]}
            />
          )}
          {value === false && (
            <Icon
              name="radiobox-blank"
              style={[styles.radioUncheckedIcon, unCheckedIconStyle]}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity 
            activeOpacity={0.9}
        
        onPress={onPress}>
          {title && (
            <Text
              style={[
                value === true ? styles.textStyle2 : styles.textStyle,
                textStyle,
              ]}>
              {title}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity 
            activeOpacity={0.9}
        
        style={[styles.checkBox, style]} onPress={onPress}>
          {value === true && (
            <Icon
              name="checkbox-marked-outline"
              style={[styles.checkedIcon, checkedIconStyle]}
            />
          )}
          {value === false && (
            <Icon
              name="checkbox-blank-outline"
              style={[styles.uncheckedIcon, unCheckedIconStyle]}
            />
          )}
        </TouchableOpacity>
        {title && (
          <Text
            style={[
              value === true ? styles.textStyle2 : styles.textStyle,
              textStyle,
            ]}>
            {title}
          </Text>
        )}
      </View>
    );
  }
};

export default RadioButton;
