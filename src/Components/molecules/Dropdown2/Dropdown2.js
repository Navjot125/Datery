import React from 'react';
import {TouchableOpacity, Text, View, Image, FlatList} from 'react-native';
import styles from './Dropdown2Style';
import Icon from 'react-native-vector-icons/Feather';
import color from '../../../Constants/Color';
import base from '../../../Constants/CommonStyle';
// import Add from '../../../resources/svg/ic_add.svg';

export const Dropdown = props => {
  // const [showList, setShow] = React.useState(false);

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
    showList,
    setShow,
  } = props;

  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <TouchableOpacity
            activeOpacity={0.9}

        style={[styles.drodownContainer, inputContainerStyle]}
        onPress={() => {
          // setShow(!showList),
          setShowList();
        }}
        {...props}>
        {/* {selectedValue.length !== 0 ? (
          selectedValue.map((item, index) => {
            return (
              <Text
                key={index}
                style={[styles.selectedTxt, {overflow: 'hidden'}]}
                numberOfLines={3}
                ellipsizeMode={'tail'}>
                {item.title.toString()}
              </Text>
            );
          })
        ) : (
          <Text style={[styles.landPlaceHolder, placeholderStyle]}>
            {placeholder}
          </Text>
        )} */}
        <View style={[styles.downArrowIcon, iconStyle]}>{/* <Add /> */}</View>
        {/* {showList === false ? (
          <Icon name="chevron-down" style={[styles.downArrowIcon, iconStyle]} />
        ) : (
          <Icon name="chevron-up" style={[styles.downArrowIcon, iconStyle]} />
        )} */}
      </TouchableOpacity>
      {(showList === true || isShowList === true) && (
        <View style={[styles.dropdownList, listStyle]}>
          <FlatList
            data={data}
            style={[styles.w100]}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            extraData={data}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({item}) => {
              let id = item.title;
              let categoryId = item.id;
              let selectd = '';
              return (
                <TouchableOpacity
            activeOpacity={0.9}
                  style={[styles.dropdownItems, listItemStyle]}
                  onPress={() => {
                    // setShow(!showList);
                    setShowList();
                    onChangeText(item);
                  }}>
                  {selectedValue.length !== 0 ? (
                    <>
                      {/* <Text style={[styles.labelTxt, selectedValue.map((item) => { return (id === item ? { color: color._dark_blue } : { color: color._dark_gray_50 }) })]}>{id}</Text> */}
                      {selectedValue.map(item => {
                        if (item.id === categoryId) {
                          selectd = categoryId;
                        }
                        // item === id && <Icon name="check" style={styles.checkIcon} />
                      })}
                      <View
                        style={[
                          base.horizontal,
                          {justifyContent: 'space-between'},
                        ]}>
                        <Text
                          style={[
                            styles.labelTxt,
                            {
                              color: selectd ? color._gray : color._font_Dark,
                            },
                          ]}>
                          {item.title}
                        </Text>
                        <Text>
                          {selectd && (
                            <Icon name="check" style={styles.checkIcon} />
                          )}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <Text style={[styles.labelTxt, {color: color._font_Dark}]}>
                      {item.title}
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
