import React from "react";
import { TouchableOpacity, Text, View, Image, FlatList } from "react-native";
import styles from "./DropdownStyle";
import Icon from "react-native-vector-icons/Feather";
import color from "../../../Constants/Color";

export const Dropdown = (props) => {
  const [showList, setShow] = React.useState(false);

  const {
    mainContainer,
    data,
    selectedValue,
    isShowList,
    listItemStyle,
    onChangeText,
    inputContainerStyle,
    iconStyle,
    listStyle,
    setShowList,
    placeholder,
    placeholderStyle,
    disabled,
    rightContent,
  } = props;
  //   console.log('Hello', data);
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.drodownContainer, inputContainerStyle]}
        onPress={() => {
          setShow(!showList), setShowList();
        }}
        disabled={disabled}
        {...props}
      >
        {JSON.stringify(selectedValue) !== "{}" ? (
          <Text style={styles.selectedTxt}>{selectedValue.label}</Text>
        ) : (
          <Text style={[styles.landPlaceHolder, placeholderStyle]}>
            {placeholder}
          </Text>
        )}
        {rightContent ? (
          <View style={[styles.downArrowIcon, iconStyle]}>{rightContent}</View>
        ) : showList === false ? (
          <Icon name="chevron-down" style={[styles.downArrowIcon, iconStyle]} />
        ) : (
          <Icon name="chevron-up" style={[styles.downArrowIcon, iconStyle]} />
        )}
      </TouchableOpacity>
      {(showList === true || isShowList === true) && (
        <View style={[styles.dropdownList, listStyle]}>
          <FlatList
            data={data}
            style={[styles.w100]}
            extraData={data}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  style={[
                    styles.dropdownItems,
                    {
                      borderBottomWidth: index == data.length - 1 ? 0 : 1,
                    },
                    listItemStyle,
                  ]}
                  onPress={() => {
                    setShow(!showList);
                    setShowList();
                    onChangeText(item);
                  }}
                >
                  {selectedValue != null ? (
                    <>
                      <Text
                        style={[
                          item.value === selectedValue.value
                            ? { color: color._gray }
                            : {
                                color: color._font_Dark,
                              },
                          styles.labelTxt,
                        ]}
                      >
                        {item.label}
                      </Text>

                      {item.value === selectedValue.value && (
                        <Icon name="check" style={styles.checkIcon} />
                      )}
                    </>
                  ) : (
                    <Text
                      style={[{ color: color._font_Dark }, styles.labelTxt]}
                    >
                      {item.label}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
export default Dropdown;
