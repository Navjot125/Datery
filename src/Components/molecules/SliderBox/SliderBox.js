import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel"; //Thank From distributer(s) of this lib
import styles from "./SliderBox.style";
import { get, values } from "lodash";
import base from "../../../Constants/CommonStyle";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import { Button } from "../../Button/Button";
import Banner1 from "../../../resources/svg/ic_banner_1.svg";

// -------------------Props---------------------
// images
// onCurrentImagePressed
// sliderBoxHeight
// parentWidth
// dotColor
// inactiveDotStyle
// dotStyle
// paginationBoxVerticalPadding
// circleLoop
// autoplay
// ImageComponent
// ImageLoader
// paginationBoxStyle
// resizeMethod
// resizeMode
// ImageComponentStyle,
// imageLoadingColor = "#E91E63"
// firstItem = 0
// activeOpacity
// onButtonPress

const width = Dimensions.get("window").width;

export class SliderBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: props.firstItem || 0,
            loading: [],
        };
        this.onCurrentImagePressedHandler =
            this.onCurrentImagePressedHandler.bind(this);
        this.onSnap = this.onSnap.bind(this);

        if (props.ImageLoader) {
            this.Loader = props.ImageLoader;
        }
    }
    componentDidMount() {
        let a = [...Array(this.props.images.length).keys()].map((i) => false);
    }
    onCurrentImagePressedHandler() {
        if (this.props.onCurrentImagePressed) {
            this.props.onCurrentImagePressed(this.state.currentImage);
        }
    }

    onSnap(index) {
        const { currentImageEmitter } = this.props;
        this.setState({ currentImage: index }, () => {
            if (currentImageEmitter) {
                currentImageEmitter(this.state.currentImage);
            }
        });
    }

    Loader = ActivityIndicator;

    _renderItem({ item, index }) {
        const {
            ImageComponent,
            ImageComponentStyle = {},
            sliderBoxHeight = 443,
            disableOnPress,
            resizeMethod,
            resizeMode,
            imageLoadingColor = "#E91E63",
            activeOpacity = 0.9, // default activeOpacity is 0.85
            infoTitle = false,
            shopNowBTN = true,
            value = () => {},
        } = this.props;
        return (
            <View
                style={{
                    // position: 'relative',
                    justifyContent: "center",
                    borderRadius: 10,
                }}
                key={index.toString()}
            >
                <TouchableOpacity
                
                    key={index}
                    underlayColor="transparent"
                    disabled={disableOnPress}
                    onPress={() => {
                        this.onCurrentImagePressedHandler();
                        this.props.onImagePress();
                    }}
                    // style={{width: '100%'}}
                    activeOpacity={activeOpacity}
                >
                    {/* <Banner1 width={'100%'} /> */}
                    <Image
                        style={[
                            base.horizonalSpace,
                            {
                                // width: '100%',
                                height: sliderBoxHeight || 300,
                                alignSelf: "center",
                                width: width - 32,
                                borderRadius: 8,
                            },
                            ImageComponentStyle,
                        ]}
                        source={
                            typeof get(item, "image", "") === "string"
                                ? { uri: get(item, "image", "") }
                                : item.image
                        }
                        resizeMethod={resizeMethod || "resize"}
                        resizeMode={resizeMode || "cover"}
                        onLoad={() => {}}
                        onLoadStart={() => {}}
                        onLoadEnd={() => {
                            let t = this.state.loading;
                            t[index] = true;
                            this.setState({ loading: t });
                        }}
                        {...this.props}
                    />
                    <View style={[styles.bannerContent]}>
                        <Text style={[styles.title]} numberOfLines={3}>
                            {item.description}
                        </Text>
                        <Button
                            btn={{ width: "58%", marginTop: 10 }}
                            title={item.title}
                            onPress={this.props.onButtonPress}
                        />
                    </View>
                </TouchableOpacity>
                {!this.state.loading[index] && (
                    <this.Loader
                        index={index}
                        size="large"
                        color={imageLoadingColor}
                        style={{
                            position: "absolute",
                            alignSelf: "center",
                        }}
                    />
                )}
            </View>
        );
    }

    get pagination() {
        const { currentImage } = this.state;
        const {
            images,
            dotStyle,
            dotColor,
            inactiveDotStyle,
            paginationBoxStyle,
            paginationBoxVerticalPadding,
        } = this.props;
        return (
            <Pagination
                borderRadius={6}
                dotsLength={images.length}
                activeDotIndex={currentImage}
                activeDotStyle={"red"}
                dotStyle={styles.dotStyle}
                // dotColor={'red'}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotScale={0.8}
                carouselRef={this._ref}
                inactiveDotOpacity={0.8}
                tappableDots={!!this._ref}
                containerStyle={[{ position: "absolute", top: -10 }]}
                {...this.props}
            />
        );
    }

    render() {
        const {
            images,
            circleLoop,
            autoplay,
            parentWidth,
            loopClonesPerSide,
            autoplayDelay,
        } = this.props;
        return (
            <View style={{ paddingHorizontal: 16 }}>
                <Carousel
                    autoplayDelay={autoplayDelay}
                    layout={"default"}
                    useScrollView
                    data={images}
                    ref={(c) => (this._ref = c)}
                    loop={circleLoop || false}
                    enableSnap={true}
                    autoplay={autoplay || false}
                    itemWidth={width - 32}
                    sliderWidth={width - 32}
                    loopClonesPerSide={loopClonesPerSide || 5}
                    renderItem={(item) => this._renderItem(item)}
                    onSnapToItem={(index) => this.onSnap(index)}
                    animatedDuration={500}
                    removeClippedSubviews={false}
                    // style={[{marginHorizontal: 20}]}
                    {...this.props}
                />
                {images.length > 1 && this.pagination}
            </View>
        );
    }
}

const colorsDot = {
    dotColors: color._white,
    white: color._white,
};

SliderBox.defaultProps = {
    ImageComponent: Image,
};
