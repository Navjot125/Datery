import React, { useEffect, useRef, useComponentWillReceiveProps } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./OTPInputStyle";

const OTPInput = ({ containerStyle,
  cellStyle,
  tintColor,
  backColor,
  offTintColor,
  otpLength,
  editable,
  // ...otherProps
}) => {
  // const propTypes = {
  //   value: PropTypes.string,
  //   onChange: PropTypes.func,
  //   otpLength: PropTypes.number,
  //   tintColor: PropTypes.string,
  //   offTintColor: PropTypes.string,
  //   containerStyle: PropTypes.object,
  //   cellStyle: PropTypes.object,
  //   defaultValue: PropTypes.string,
  //   editable: PropTypes.bool,
  // };

  // const defaultProps = {
  //   onChange: () => null,
  //   otpLength: 6,
  //   tintColor: "#FB6C6A",
  //   backColor: "#FB6C6A",
  //   offTintColor: "#BBBCBE",
  //   containerStyle: {},
  //   cellStyle: {},
  // };

  const textInput = null;

  const state = {
    internalVal: props.value || props.defaultValue,
  };

  // componentWillReceiveProps(nextProps) {
  // }
  // const useComponentWillReceiveProps(nextProps, callback) {
  //   const props = useRef(nextProps) 

  //   useEffect(() => {
  //     callback(nextProps, props.current)
  //     // props.current = nextProps
  //     if (
  //       nextProps.hasOwnProperty("value") &&
  //       nextProps.value !== this.state.internalVal
  //     ) {
  //       this.setState({ internalVal: nextProps.value });
  //     }
  //   })
  // }
  React.useEffect((nextProps) => {
  })
  // componentDidMount() {
  // }
  React.useEffect(() => {
    this.focus();
  })

  function handleChangeText(val) {
    const { onChange } = this.props;

    onChange(val);
    this.setState({ internalVal: val });
  };

  // public methods
  function inputRef() {
    return textInput;
  }

  function focus() {
    if (editable !== false) {
      inputRef().focus();
    }
  }

  function blur() {
    inputRef().blur();
  }

  function isFocused() {
    return inputRef().isFocused();
  }

  function clear() {
    this.setState({ internalVal: "" });
  }

  const { internalVal } = state;

  return (
    <View
      onPress={() => {
        //alert("Pressed!!!");
      }}
    >
      <TextInput
        ref={(input) => (textInput = input)}
        onChangeText={handleChangeText}
        style={{ width: "100%", height: 20, top: 40 }}
        value={internalVal}
        minLength={otpLength}
        maxLength={otpLength}
        returnKeyType="done"
        keyboardType="numeric"
        {...otherProps}
        onPress={() => {
          //alert("Pressed!!!");
        }}
      />
      <View
        style={[styles.container, containerStyle]}
        onPress={() => {
          //alert("Pressed!!!");
        }}
      >
        {Array(otpLength)
          .fill()
          .map((_, index) => (
            <Text
              key={index}
              style={[
                styles.cell,
                cellStyle,
                {
                  borderColor:
                    index === ((internalVal && internalVal.length) || 0)
                      ? tintColor
                      : offTintColor,
                  backgroundColor: backColor,
                },
              ]}
              onPress={() => textInput.focus()}
            >
              {internalVal && internalVal.length > index
                ? internalVal[index]
                : " "}
            </Text>
          ))}
      </View>
    </View>
  );
}

export default OTPInput;
