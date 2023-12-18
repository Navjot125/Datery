import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './AuthHeaderStyle';
// import Left from '../../../assets/ic_left_arrow.svg';
import base from '../../../Constants/CommonStyle';
import color from '../../../Constants/Color';

const AuthHeader = props => {
  const { _onBack, btnTitle, _onRightBtnPress, disabled = false } = props;
  return (
    <View style={[styles.headerContainer, base.horizontal]}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.backBox}
        onPress={() => {
          _onBack();
        }}>
        {/* <Left width={15} height={15} /> */}
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.9}
        onPress={() => {
          _onRightBtnPress();
        }}>
        <Text
          style={[
            base.fontMedium,
            styles.textLogin,
            { color: disabled ? color._gray : color._blue },
          ]}>
          {btnTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthHeader;

{
  /* <Molecules.AuthHeader 
    _onBack={() => {}}
    btnTitle={}
    _onRightBtnPress={() => {}}
/> */
}
