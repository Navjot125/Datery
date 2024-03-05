import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import styles from "./TextInputSimpleStyle";
import DropShadow from "react-native-drop-shadow";

const TextInputSimple = ({
  value,
  hideEye,
  title,
  name,
  textFieldStyle,
  multiline,
  onSubmitEditing,
  placeholder,
  placeholderTextColor,
  onChangeText,
  keyboardType,
  editable,
  onFocus,
  onRef,
  error,
  errors,
  onBlur,
  disable,
  length,
  TextIcon,
  iconColor,
  touched,
  typePassword,
  secureTextEntry,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      {title && <Text style={styles.label}>{title}</Text>}
      <View style={[styles.inputContainer]}>
        <TextInput
          name={name}
          underlineColor="transparent"
          selectionColor={color._blue}
          maxLength={length}
          keyboardType={keyboardType ? keyboardType : "default"}
          secureTextEntry={ hideEye ? true : typePassword ? !showPassword : false}
          style={[styles.input, textFieldStyle, error ? { color: "red" } : {}]}
          underlineColorAndroid={"transparent"}
          onChangeText={(text) => {
            // onChangeText(text);
            // if (onChangeText !== undefined) {
              onChangeText(text);
            // }
          }}
          value={value}
          editable={editable}
          placeholder={placeholder}
          onSubmitEditing={() => onSubmitEditing}
          placeholderTextColor={placeholderTextColor}
          ref={onRef != undefined ? onRef : null}
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
          multiline={multiline}
          // autoComplete={"off"}
          left={
            TextIcon ? (
              <TextInput.Icon
                icon={
                  typeof TextIcon == "string" ? TextIcon : () => <TextIcon />
                }
                iconColor={iconColor ? iconColor : color._primary_orange}
                size={22}
              />
            ) : null
          }
          right={
            typePassword ? (
              <TextInput.Icon
                icon={showPassword ? "eye" : "eye-off"}
                onPress={handleShowPassword}
                iconColor={color._grey_1}
              />
            ) : null
          }
          theme={{
            colors: {
              primary: "transparent",
              text: "#000",
            },
            fonts: {
              regular: {
                fontFamily: fonts.BLACK_ITALIC,
              },
            },
          }}
          {...props}
        />
      </View>

      {touched && errors && <Text style={styles.inputErrorText}>{errors}</Text>}
    </View>
  );
};

export default TextInputSimple;
