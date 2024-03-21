import {
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Dimensions } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import { ScrollView } from "react-native-virtualized-view";
import React, { useState } from "react";
import styles from "./GameStyles";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { BackHeader } from "../../../Components/molecules";
import * as Atoms from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const data = [
  {
    title: "What’s your favorite show to binge-watch?",
    body: "Getting to know ‘em",
    imgUrl: require("../../../assets/images/orange_hearts.png"),
  },
  {
    title: "What’s your favorite show to binge-watch?",
    body: "Getting to know ‘em",
    imgUrl: require("../../../assets/images/orange_hearts.png"),
  },
  {
    title: "What’s your favorite show to binge-watch?",
    body: "Getting to know ‘em",
    imgUrl: require("../../../assets/images/orange_hearts.png"),
  },
  {
    title: "What’s your favorite show to binge-watch?",
    body: "Getting to know ‘em",
    imgUrl: require("../../../assets/images/orange_hearts.png"),
  },
  {
    title: "What’s your favorite show to binge-watch?",
    body: "Getting to know ‘em",
    imgUrl: require("../../../assets/images/orange_hearts.png"),
  },
];

const Game = (props) => {
  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        {/* <Image source={item.imgUrl} style={styles.image} /> */}
      </View>
    );
  };
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(1);
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <View style={{ marginLeft: 20 }}>
          <BackHeader title={"First Dates"} />
        </View>
        <View
          style={{
            flex: 1,
            // marginBottom: 45,
            marginBottom: 25,
            justifyContent: "center",
            // paddingTop: 68,
            alignItems: "center",
            // backgroundColor: color._white
            // width: wp('100%')
          }}
        >
          <Carousel
            layout="#FFFF"
            layoutCardOffset={1}
            ref={isCarousel}
            data={data}
            renderItem={CarouselCardItem}
            sliderWidth={wp("100%")}
            itemWidth={wp("80%")}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
            firstItem={1}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 100,
              marginBottom: 100,
              // marginHorizontal: 20,
              backgroundColor: color._primary_orange,
              // top: 400
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
