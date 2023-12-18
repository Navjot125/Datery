import React from "react";
import { TouchableOpacity, ActivityIndicator, Text, View } from "react-native";
import base from "../../Constants/CommonStyle";
import styles from "./ButtonStyle";

export const Button = (props) => {
    const { title, onPress, btn, btnTxt, disabled = false } = props;
    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.9}
            onPress={() => {
                onPress();
            }}
            style={[styles.button, base.center, btn]}
        >
            <Text style={[base.buttonTxt, styles.btnTxt, btnTxt]}>{title}</Text>
        </TouchableOpacity>
    );
};

export const ButtonBorder = (props) => {
    const { title, onPress, btn, btnTxt } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                onPress();
            }}
            style={[styles.buttonInstructor, btn]}
        >
            <Text style={[base.buttonTxt, styles.btnInsTxt, btnTxt]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

// Example
{
    /* <Button
  title={'Test'}
  btn={styles.btn}
  btnTxt={styles.btnTxt}
  onPress={() => {
   alert('test');
  }}
/> */
}
