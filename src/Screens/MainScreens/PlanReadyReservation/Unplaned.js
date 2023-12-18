import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";
  import { ScrollView } from "react-native-virtualized-view";
  import DropShadow from "react-native-drop-shadow";
  import React, { useState } from "react";
  import fonts from "../../../Constants/Fonts";
  import color from "../../../Constants/Color";
  import * as Molecules from "../../../Components/molecules";
  import * as Atom from "../../../Components/atoms";
  import { useNavigation } from "@react-navigation/native";
  import LocationIcon from "react-native-vector-icons/Entypo";
  import Icon from "react-native-vector-icons/FontAwesome5";
  // import styles from "./PlanReadyReservationStyles";


  
  const width = Dimensions.get("window").width;
  import Carousel, { Pagination } from "react-native-snap-carousel";
  
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
  const Unplaned = () => {
    const navigation = useNavigation();

    const data = [
        {
          id: 1,
          media: require("../../../assets/images/dummyImage.png"),
          title: "Live Virtual Cooking Experience with Chef Jon",
          name: "Chef Jon",
          schedule: "Availability",
        },
        // {
        //   id: 2,
        //   media: require("../../../assets/images/dummyImage.png"),
        //   title: "Live Virtual Cooking Experience with Chef Jon",
        //   name: "Chef Jon",
        //   schedule: "Thursday, 07/05, 8:30 PM",
        // },
      ];
  
      const showData = ({ item }) => {
        return (
          <View style={styles.cardView}>
            <DropShadow style={styles.shadowProp}>
              <View style={[styles.card]}>
                <Image
                  source={item.media}
                  style={{ height: 85, width: 85, borderRadius: 6 }}
                />
                <View
                  style={{
                    padding: 15,
                    width: "80%",
                  }}
                >
                  <Text style={styles.textTitle}>{item.title}</Text>
                  <View style={styles.lastText}>
                    <View>
                      <Text style={styles.textBetween}> {item.name}</Text>
                    </View>
                    <Text style={styles.mediaType}>
                      <Icon name={"calendar-alt"} size={11} color={color._white} />{" "}
                      {item.schedule}
                    </Text>
                  </View>
                  <Text style={styles.orangeText}>{item.review}</Text>
                </View>
              </View>
            </DropShadow>
          </View>
        );
      };

    return (
        <SafeAreaView style={[styles.scrollView,]}>
        {/* <View style={styles.mainView}> */}
          {/* <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: "100%" }}
            renderTabBar={renderTabBar}
          /> */}
          <ScrollView 
           bounces={false}
           alwaysBounceVertical={false}
           overScrollMode="never"
          contentContainerStyle={{flexGrow:1,}} >
            <Text
              style={{
                fontFamily: fonts.SEMI_BOLD,
                color: "#2F2729",
                fontSize: 16,
                marginTop: 22,
              }}
            >
              Ready for Reservations
            </Text>
            {/* <View
            style={{flex:1, }}
            > */}
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={showData}
              />
              {/* </View> */}
          </ScrollView>
        {/* </View> */}
      </SafeAreaView>
    );
  };
  
  export default Unplaned;
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: "rgba(255, 142, 0, 0.1)",
      borderRadius: 10,
      height: 154,
    },
    image: {
      width: wp("48.1%"),
      resizeMode: "contain",
      height: "100%",
    },
    header: {
      color: "#000000",
      fontFamily: fonts.BOLD,
      fontSize: 24,
      textAlign: "left",
      lineHeight: 30,
    },
    body: {
      color: "#FFFFFF",
      fontFamily: fonts.BOLD,
      fontSize: 12,
      lineHeight: 24,
      backgroundColor: color._border_orange,
      width: 95,
      borderRadius: 122,
      textAlign: "center",
    },
    scrollView: {
      flex: 1,
      backgroundColor: color._white,
    },
    mainView: {
      flex: 1,
      marginHorizontal: 20,
    },
  
    header: {
      marginTop: 24,
      marginHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      // marginBottom: 31,
    },
    cardView: {
      marginTop: 31,
      marginHorizontal: 5,
    },
    textStyle: {
      color: "#2F2729",
      fontFamily: fonts.SEMI_BOLD,
      fontSize: 24,
    },
    card: {
      backgroundColor: "white",
      borderRadius: 10,
      // width: "100%",
      flexDirection: "row",
      // justifyContent: 'center',
      alignItems: "center",
      padding: 13,
    },
  
    shadowProp: {
      shadowColor: "rgba(0, 0, 0, 0.05)",
      shadowOffset: { width: -3, height: -3 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
    },
    mediaType: {
      borderRadius: 50,
      backgroundColor: color._primary_orange,
      color: color._white,
      fontFamily: fonts.BOLD,
      fontSize: 10,
      paddingVertical: 5,
      width: 132,
      textAlign: "center",
    },
    textBetween: {
      fontFamily: fonts.MEDIUM,
      fontSize: 12,
      color: "#9796A1",
      paddingVertical: 6,
    },
    textTitle: {
      fontFamily: fonts.BOLD,
      fontSize: 13,
      color: "#1F2937",
      // width: 203,
    },
    orangeText: {
      fontFamily: fonts.SEMI_BOLD,
      fontSize: 12,
      color: color._primary_orange,
    },
    lastText: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  