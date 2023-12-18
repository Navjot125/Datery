import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import styles from './RatingStyle';
import color from '../../../Constants/Color';
import Images from '../../../assets/Images';

export const Rating = props => {
  const { currentRating, containerStyle, titleStyle, isSubmit, onSubmit, onChange, disabled } = props;

  const maxRating = 5; // Maximum rating value

  const starImageFilled = Images.starFillImage; // Replace with the actual path to your star image
  const starImageUnFilled = Images.starImage; // Replace with the actual path to your star image
   const [defaultRating, setDefaultRating] = useState(+currentRating);

  const handleStarPress = (index) => {
    setDefaultRating(index + 1);
    onChange(index + 1)
  };

  return (
    <View>
      <View style={containerStyle}>
        <View style={[styles.customRatingBarStyle, { flexDirection: "row" }]}>
          {Array(maxRating)
            .fill()
            .map((_, index) => (
              <TouchableOpacity
                disabled={disabled || false}
                key={index}
                onPress={() => handleStarPress(index)}
              >
                <Image
                  style={{ height: 15, width: 15 }}
                  source={
                    index < defaultRating
                      ? starImageFilled
                      : starImageUnFilled
                  }
                />
              </TouchableOpacity>
            ))}
        </View>
        {/* <Text style={styles.textStyle}> */}
        {/* To show the rating selected */}
        {/* {defaultRating} / {maxRating} */}
        {/* </Text> */}
      </View>
    </View>
  );
};

export default Rating;

