import React from 'react';
import {View, Text} from 'react-native';
import styles from './TitleStyle';

const Title = ({style, textStyle, title, ...props}) => (
  <View style={[styles.Container, style]} {...props}>
    <Text style={[styles.titleTxt, textStyle]}>{title}</Text>
  </View>
);

export default Title;
