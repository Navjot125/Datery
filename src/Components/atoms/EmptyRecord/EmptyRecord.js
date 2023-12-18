import React from 'react';
import {View, Text} from 'react-native';
import styles from './EmptyRecordStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyRecord = ({
  value,
  defaultMsg = true,
  msgTitle,
  msgStyle,
  msgDescription,
  msgDescriptionStyle,
  style,
  textStyle,
  ...props
}) => {
  return (
    <View style={[styles.noRecordContainer, style]}>
      {defaultMsg && (
        <Text style={[styles.noRecordTxt, textStyle]}>No record found</Text>
      )}
      {msgTitle && <Text style={[styles.msg, msgStyle]}>{msgTitle}</Text>}
      {msgDescription && (
        <Text style={[styles.msgDesc, msgDescriptionStyle]}>
          {msgDescription}
        </Text>
      )}
    </View>
  );
};

export default EmptyRecord;
