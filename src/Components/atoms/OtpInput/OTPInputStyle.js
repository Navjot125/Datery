import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {color} from '../../../Constants/Color';
// import { theme } from "../../../Constants/Theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    paddingVertical: 11,
    width: 45,
    height: 55,
    margin: 5,
    marginHorizontal: 8,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
  },
});
export default styles;
