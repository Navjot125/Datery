import React from 'react';
import {View, Text} from 'react-native';
import styles from './InputFieldStyles';
import * as Atoms from '../../atoms';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import color from '../../../Constants/Color';
// import Done from '../../../assets/ic_done.svg';

export const InputField = props => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [icon, setIcon] = React.useState('eye');
  const [iconColor, setIconColor] = React.useState(color._mediumGray);

  const {
    title,
    mainContainerStyle,
    multiline,
    inputContainerStyle,
    titleStyle,
    value,
    iconRight,
    iconStyle,
    textFieldStyle,
    placeholder,
    onChangeText,
    keyboardType,
    readOnly,
    onFocus,
    onRef,
    secureTextEntry,
    error,
    onBlur,
    disable,
    length,
    iconContainerStyle,
    rightIconStyle,
    priceSign,
    rightPriceSign,
    leftContent,
    leftContentStyle,
    placeholderTextColor,
    deviderLine,
    rightContent,
    rightContentStyle,
  } = props;
  React.useEffect(() => {
    if (secureTextEntry) {
      setIsVisible(true);
    }
  }, [secureTextEntry]);
  const _changeIcon = () => {
    setIcon(icon === 'eye' ? 'eye' : 'eye');
    setIconColor(
      iconColor === color._mediumGray ? color._blue : color._mediumGray,
    );
    // setIcon(icon === 'eye' ? 'eye-with-line' : 'eye');
    setIsVisible(!isVisible);
  };
  return (
    <View style={[styles.inputBoxContainer, mainContainerStyle]}>
      {title && (
        <Text style={[styles.inputLableTaxt, titleStyle]}>{title}</Text>
      )}
      <View style={[styles.InputRow, inputContainerStyle]}>
        {props.leftContent && (
          <View style={[styles.leftContent, leftContentStyle]}>
            {leftContent}
          </View>
        )}
        {props.leftIcon && (
          <View style={[styles.leftIcon, iconContainerStyle]}>
            <Icon
              name={props.leftIcon}
              onPress={() => _changeIcon()}
              style={[styles.icon, iconStyle]}
            />
          </View>
        )}
        {props.leftIcon2 && (
          <View style={[styles.leftIcon, iconContainerStyle]}>
            <Icon2 name={props.leftIcon2} style={[styles.icon, iconStyle]} />
          </View>
        )}
        {deviderLine && (
          <View
            style={{
              width: 1,
              height: '75%',
              backgroundColor: color._mediumGray,
              marginTop: wp(1.25),
            }}
          />
        )}
        <View
          style={{
            width: props.secureTextEntry ? '90%' : '100%',
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Atoms.TextInput
            textFieldStyle={[styles.inputContainer, textFieldStyle]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={text => onChangeText(text)}
            onFocus={() => {
              if (onFocus !== undefined) {
                onFocus();
              }
            }}
            onBlur={() => {
              if (onBlur !== undefined) {
                onBlur();
              }
            }}
            length={length}
            error={error}
            secureTextEntry={isVisible ? true : false}
            onRef={onRef}
            editable={readOnly ? false : true}
            keyboardType={keyboardType}
            disable={disable}
            multiline={multiline}
          />
        </View>
        {props.isRight && priceSign && (
          <View style={[styles.iconRowpass, iconStyle]}>
            <Text
              style={[
                rightPriceSign,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: wp(0),
                  margin: 0,
                  fontSize: wp(5),
                  fontWeight: '700',
                },
              ]}>
              {priceSign}
            </Text>
          </View>
        )}
        {props.rightContent && (
          <View style={[styles.rightContent, rightContentStyle]}>
            {rightContent}
          </View>
        )}
        {props.errorEmail && props.isRight && (
          <View style={[styles.iconRowpass, iconStyle]}>
            {props.done == false && (
              <Icon
                name={iconRight}
                onPress={() => _changeIcon()}
                style={[styles.rightIcon, rightIconStyle, {color: 'red'}]}
              />
            )}
            {props.done == true && (
              <>{/* <Done style={[styles.rightIcon, rightIconStyle]} /> */}</>
            )}
          </View>
        )}
        {props.secureTextEntry && props.isRight && (
          <View style={[styles.iconRowpass, iconStyle]}>
            <Icon
              name={icon}
              onPress={() => _changeIcon()}
              style={[styles.rightIcon, rightIconStyle, {color: iconColor}]}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default InputField;
