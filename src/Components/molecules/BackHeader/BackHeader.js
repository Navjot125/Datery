import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import base from '../../../Constants/CommonStyle';
import styles from './BackHeaderStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import color from '../../../Constants/Color';
import { useNavigation } from '@react-navigation/native';

const BackHeader = props => {
  const navigation = useNavigation();
  const { onBackPress, title, titleTxt, isRight, rightStyl, rightContent, colors, removeLastIndex,headerStyleNeeded } =
    props  ;
  return (
    <View style={[base.horizontal, styles.header, base.center]}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          base.horizontal,
          styles.header,
          { position: 'absolute', left: 0 },
        ]}
        onPress={onBackPress ? onBackPress : () => {
          removeLastIndex ?
            (removeLastIndex(), navigation.goBack()) : null,
            navigation.goBack()
        }}>
        <Text style={[base.hilitedFont, { fontSize: 14, marginLeft: 8 }]}>
          <Icon name={'arrowleft'} size={24} color={colors ? colors : color._black} />
        </Text>
      </TouchableOpacity>
      {title ? <Text style={[styles.title, titleTxt]}>{title}</Text> : null}
      {isRight ? (
        <View style={[styles.right, rightStyl]}>{rightContent}</View>
      ) : null}
     
    </View>
  );
};

export default BackHeader;
