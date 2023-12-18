import React, { useMemo, useState, useRef, useEffect, memo } from 'react';
import Images from '../../../assets/Images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions, FlatList, View } from 'react-native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import styles from "./HomeStyles";
import color from '../../../Constants/Color';

const { width } = Dimensions.get("window");

let CurrentSlide = 0;
let IntervalTime = 4000;
const data = [
    {
        title: "Best Dance School in Texas",
        // body: "Getting to know ‘em",
        imgUrl: Images.BallerinaImage,
    },
    {
        title: "Best Dance School in Texas",

        imgUrl: Images.BallerinaImage,
    },
    {
        title: "Best Dance School in Texas",

        imgUrl: Images.BallerinaImage,
    },

    {
        title: "Best Dance School in Texas",

        imgUrl: Images.BallerinaImage,
    },

    {
        title: "Best Dance School in Texas",

        imgUrl: Images.BallerinaImage,
    },
];
const CarouselCardItem = memo(({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <View
                style={{
                    width: wp("50%"),
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <Text style={styles.header}>{item.title}</Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                >
                    <Text style={styles.body}>Book Now</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: wp("50%"),
                }}
            >
                <Image source={item.imgUrl} style={styles.image} />
            </View>
        </View>
    );
}, (prev, next) => {
    return Object.keys(prev.item).every(key => prev.item[key] === next.item[key])
});
const CommonCrousal = () => {
    const flatListTimerId = useRef(null);
    const flatListRef = useRef(null);
    // const isCarousel = useRef(null);
    const [indexx, setIndexx] = useState(0);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndexx((prevIndex) => (prevIndex + 1) % data?.length);
        }, IntervalTime);
        startAutoPlay();
        return () => clearInterval(intervalId);
    }, [data]);


    const onChangeDot = (event) => {
        // console.log("Math.ceil(event.nativeEvent.contentOffset.x / width", Math.ceil(event.nativeEvent.contentOffset.x / width))
        setIndexx(Math.ceil(event.nativeEvent.contentOffset.x / width));
    };


    const renderItem = useMemo(() => {
        return ({ item, index }) => <CarouselCardItem item={item} index={index} />;
    }, []);

    const goToNextPage = () => {
        if (CurrentSlide === undefined) CurrentSlide = 0;
        if (CurrentSlide === data?.length - 1) CurrentSlide = 0;
        // console.log('current', flatListRef?.current)
        if (flatListRef?.current) {
            // Add a check for the ref before using scrollToIndex
            flatListRef?.current.scrollToIndex({
                index: ++CurrentSlide,
                animated: true,
            });
        }
    };

    const startAutoPlay = () => {
        flatListTimerId.current = setInterval(goToNextPage, IntervalTime);
    };

    ///////STOPAUTOPLAY///////
    const stopAutoPlay = () => {
        if (flatListTimerId.current) {
            clearInterval(flatListTimerId.current);
            flatListTimerId.current = null;
        }
    };

    const keyExtractor = (item, index) => {
        return index.toString();
    };

    const renderPagination = React.useMemo(() => {
        return (
            // console.log("indexx", indexx),
            <View style={styles.wrapPagination}>
                {data.map((_, index) => {
                    return (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor:
                                        indexx === index ? color._primary_orange : color._button_disable,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        );
    }, [indexx]);


    return (
        <>
            <FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                disableIntervalMomentum
                showsHorizontalScrollIndicator={false}
                data={data}
                onScrollToIndexFailed={({
                    index,
                    averageItemLength,
                }) => {
                    // Layout doesn't know the exact location of the requested element.
                    // Falling back to calculating the destination manually
                    flatListRef.current?.scrollToOffset({
                        offset: index * averageItemLength,
                        animated: true,
                    });
                }}
                renderItem={renderItem}
                scrollEventThrottle={200}
                onMomentumScrollEnd={onChangeDot}
                keyExtractor={keyExtractor}
                onContentSizeChange={() => {
                    if (CurrentSlide !== 0) {
                        flatListRef?.current.scrollToIndex({ index: CurrentSlide, animated: false });
                    }
                }}
            />
            {renderPagination}
        </>
    );
};

export default React.memo(CommonCrousal);