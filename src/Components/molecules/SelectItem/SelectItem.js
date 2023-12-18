import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import styles from './SelectItemStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from '../../../Constants/Color';
import * as Atom from '../../../Components/atoms';

const SelectItem = ({
  DATA = [],
  EXISTING_DATA = [],
  onChange = () => { },
  multiSelect = false,
  numColumns,
  double,
}) => {
  const [data, setData] = useState();

  useEffect(() => {
    var ArrData = DATA.map(ele => {
      if (EXISTING_DATA.includes(ele._id)) {
        ele.selected = true;
      } else {
        ele.selected = false;
      }
      return ele;
    });
    setData(ArrData);
  }, []);

  const Item = ({ item }) => (
    <View style={double == true ? { width: '46%', marginLeft: '2%', marginTop: 5 } : { width: '100%', marginTop: 5 }} >
      <Atom.Button
        title={item.name}
        onPress={() =>
          multiSelect ? handlePressMulti(item) : handlePressSingle(item)
        }
        style={
          item.selected
            ? { height: 45 }
            : {
              borderWidth: 1,
              backgroundColor: '#FFF',
              borderColor: color._primary_orange,
              height: 45,
            }
        }
        textStyle={item.selected ? {} : { color: '#2F2729' }}
      />
    </View>
  );
  const renderItem = ({ item }) => {

    return <Item item={item} />;
  };
  const handlePressSingle = item => {
    let renderData = [...data];
    for (let e of renderData) {
      if (e._id === item._id) {
        e.selected = true;
      } else {
        e.selected = false;
      }
    }
    // onChange(renderData[0]);
    onChange(item);
    setData(renderData);
  };

  const handlePressMulti = item => {
    let renderData = [...data];

    if (item.name == 'All') {
      if (item.selected) {
        for (let data of renderData) {
          data.selected = false;
        }
      } else {
        for (let data of renderData) {
          data.selected = true;
        }
      }
    } else {
      for (let data of renderData) {
        if (data._id == '1' && data.selected) {
          data.selected = false;
        }
        if (data._id == item._id) {
          data.selected = data.selected == null ? true : !data.selected;
          break;
        }
      }
    }
    const selectedData = renderData.filter(e => e.selected).map(e => e.name);
    onChange(selectedData);
    setData(renderData);
  };
  return (
    <View style={{}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
      />
    </View>
  );
};

export default SelectItem;
