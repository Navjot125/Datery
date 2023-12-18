import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from 'react-native-size-matters';

const VectorIcons = {
  AntDesign,
  MaterialIcons,
  EvilIcons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
  Feather,
  Octicons,
  SimpleLineIcons,
};

const CustomIcon = ({type, name, size, style, color, onPress}) => {
  const Icon = VectorIcons[type];
  const isDarkMode = useColorScheme() === 'dark';

  const colordef = isDarkMode ? 'white' : 'black';
  return (
    <Icon
      onPress={onPress}
      name={name}
      size={size || scale(20)}
      style={[styles.iconStyles, style]}
      color={color != null ? color : colordef}
    />
  );
};

export default CustomIcon;

const styles = StyleSheet.create({
  iconStyles: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
