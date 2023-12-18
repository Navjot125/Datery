import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState } from "react";
import styles from "./FavoritesCoachesStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
// import BackButton from '../../../components/BackButton';
import { BackHeader } from "../../../Components/molecules";
import DropShadow from "react-native-drop-shadow";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Atom from "../../../Components/atoms";

const FavoritesCoaches = (props) => {

  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      id: 1,
      media: require("../../../assets/images/dummyImage.png"),
      text2: "M.S., LMFT Dallas, TX | Virtual",
      name: "Mindy Smith",
      text3: "Approachable, Direct & Warm",
    },
    {
      id: 2,
      media: require("../../../assets/images/dummyImage.png"),
      name: "Mindy Smith",
      text2: "B.S. in Therapy Dallas, TX | Virtual",
      text3: "Unique Tag line",
    },
    {
      id: 3,
      media: require("../../../assets/images/dummyImage.png"),
      text2: "B.S. in Therapy Dallas, TX | Virtual",
      name: "Mindy Smith",
      text3: "Unique Tag line",
    },
  ])

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.cardView, { backgroundColor: 'white' }]}>
      <DropShadow style={styles.shadowProp}>
        <TouchableOpacity
            activeOpacity={0.9}
        
        onPress={() => navigation.navigate("CoachDetail")}>
          <View style={[styles.card]}>
            <Image
              source={item.media}
              style={{ height: 66, width: 85, borderRadius: 6 }}
            />
            <View
              style={{
                padding: 15,
              }}
            >
              <Text style={styles.textTitle}>{item.name}</Text>
              <Text style={styles.textBetween}> {item.text2}</Text>
              <Text style={styles.orangeText}>{item.text3}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </DropShadow>
    </View>
  );

  const renderHiddenItem = (dataItem) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
            activeOpacity={0.9}

        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => handleDelete(dataItem.item.id)}
      >
        <Image style={{ height: 20, width: 20 }} source={require('../../../assets/images/deleteCard.png')} />
      </TouchableOpacity>
    </View>
  );

  const showData = ({ item }) => {
    return (
      <View style={styles.cardView}>
        <DropShadow style={styles.shadowProp}>
          <View style={[styles.card]}>
            <Image
              source={item.media}
              style={{ height: 66, width: 85, borderRadius: 6 }}
            />
            <View
              style={{
                padding: 15,
              }}
            >
              <Text style={styles.textTitle}>{item.name}</Text>
              <Text style={styles.textBetween}> {item.text2}</Text>
              <Text style={styles.orangeText}>{item.text3}</Text>
            </View>
          </View>
        </DropShadow>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        {/* <View style={styles.header}>
          <TouchableOpacity>
            <BackButton />
          </TouchableOpacity>
          <Text style={styles.textStyle}>Favorites</Text>
          <Text> </Text>
        </View> */}
        <BackHeader title={"Favorites"} />
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 15 }}
        >
          {/* <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={showData}
            showsVerticalScrollIndicator={false}
          /> */}
          <SwipeListView
            data={data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-55} // adjust this value based on your item width
          />
        </ScrollView>
       
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesCoaches);
