import React, {Component, useEffect, useRef} from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel'; //Thank From distributer(s) of this lib
import styles from './SliderBox.style';
import {get, values} from 'lodash';
import base from '../../../Constants/CommonStyle';
import color from '../../../Constants/Color';
import fonts from '../../../Constants/Fonts';
import {Button} from '../../Button/Button';
import Banner1 from '../../../resources/svg/ic_banner_1.svg';

const SliderBoxTemp = (props, {navigation}) => {
  const width = Dimensions.get('window').width;
  const [currentImage, setCurrentImage] = React.useState(props.firstItem || 0);
  const [loading, setLoading] = React.useState([]);

  const {
    images,
    circleLoop,
    autoplay,
    parentWidth,
    loopClonesPerSide,
    autoplayDelay,
  } = props;

  const Loader = ActivityIndicator;

  useEffect(() => {
    let a = [...Array(props.images.length).keys()].map(i => false);
  }, []);

  useEffect(() => {
    if (props.ImageLoader) {
      Loader = props.ImageLoader;
    }
  }, [props.ImageLoader]);

  const onCurrentImagePressedHandler = () => {
    if (props.onCurrentImagePressed) {
      props.onCurrentImagePressed(currentImage);
    }
  };

  const onSnap = index => {
    const {currentImageEmitter} = this.props;
    setCurrentImage(index);
    if (currentImageEmitter) {
      currentImageEmitter(currentImage);
    }
  };

  const _renderItem = ({item, index}) => {
    const {
      ImageComponent,
      ImageComponentStyle = {},
      sliderBoxHeight = 443,
      disableOnPress,
      resizeMethod,
      resizeMode,
      imageLoadingColor = '#E91E63',
      activeOpacity = 0.9, // default activeOpacity is 0.85
      infoTitle = false,
      shopNowBTN = true,
      value = () => {},
    } = props;
    return (
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
            // activeOpacity={0.9}
          key={index}
          underlayColor="transparent"
          disabled={disableOnPress}
          onPress={() => {
            this.onCurrentImagePressedHandler();
            this.props.onImagePress();
          }}
          style={{backgroundColor: 'red'}}
          activeOpacity={activeOpacity}>
          {/* <View style={[base.block]}> */}
          <Banner1 width={'100%'} />
          {/* <Text>{item.back}</Text> */}
          <View style={[styles.bannerContent]}>
            <Text style={[styles.title]} numberOfLines={3}>
              {item.title}
            </Text>
            <Button
              btn={{width: '58%', marginTop: 12}}
              title={item.btn}
              onPress={() => {}}
            />
          </View>
          {/* </View> */}
          {/* <Image
            style={[
              {
                width: '100%',
                height: sliderBoxHeight || 300,
                alignSelf: 'center',
              },
              ImageComponentStyle,
            ]}
            source={
              typeof get(item, 'image', '') === 'string'
                ? {uri: get(item, 'image', '')}
                : item
            }
            resizeMethod={resizeMethod || 'resize'}
            resizeMode={resizeMode || 'cover'}
            onLoad={() => {}}
            onLoadStart={() => {}}
            onLoadEnd={() => {
              let t = this.state.loading;
              t[index] = true;
              this.setState({loading: t});
            }}
            {...this.props}
          /> */}
        </TouchableOpacity>
        {!loading[index] && (
          <Loader
            index={index}
            size="large"
            color={imageLoadingColor}
            style={{
              position: 'absolute',
              alignSelf: 'center',
            }}
          />
        )}
      </View>
    );
  };

  const pagination = () => {
    const {currentImage} = currentImage;
    const {
      images,
      dotStyle,
      dotColor,
      inactiveDotStyle,
      paginationBoxStyle,
      paginationBoxVerticalPadding,
    } = props;
    return (
      <Pagination
        borderRadius={5}
        dotsLength={images.length}
        activeDotIndex={currentImage}
        dotStyle={dotStyle || styles.dotStyle}
        dotColor={dotColor || colorsDot.dotColors}
        inactiveDotStyle={inactiveDotStyle || colorsDot.white}
        inactiveDotScale={0.8}
        // carouselRef={this._ref}
        inactiveDotOpacity={0.8}
        // tappableDots={!!this._ref}
        containerStyle={[
          styles.paginationBoxStyle,
          paginationBoxVerticalPadding
            ? {paddingVertical: paginationBoxVerticalPadding}
            : {},
          paginationBoxStyle ? paginationBoxStyle : {},
        ]}
        {...props}
      />
    );
  };

  return (
    <View>
      <Carousel
        autoplayDelay={autoplayDelay}
        layout={'default'}
        useScrollView
        data={images}
        // ref={c => (this._ref = c)}
        loop={circleLoop || false}
        enableSnap={true}
        autoplay={autoplay || false}
        itemWidth={parentWidth || width}
        sliderWidth={parentWidth || width}
        loopClonesPerSide={loopClonesPerSide || 5}
        renderItem={item => _renderItem(item)}
        onSnapToItem={index => onSnap(index)}
        animatedDuration={500}
        {...props}
      />
      {images.length > 1 && pagination}
    </View>
  );
};

const colorsDot = {
  dotColors: null,
  white: '#FFFFFF',
};

SliderBoxTemp.defaultProps = {
  ImageComponent: Image,
};

export default SliderBoxTemp;
