import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

TouchableOpacity.defaultProps = {activeOpacity: 0.7};

export const RatingButton = ({onPress, rating, editable, style}) => {
  // for selection
  if (editable) {
    return (
      <Stars
        default={rating}
        update={onPress}
        spacing={2}
        count={5}
        starSize={50}
        fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
        emptyStar={
          <Icon
            name={'star-outline'}
            style={[styles.myStarStyle, styles.myEmptyStarStyle]}
          />
        }
        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
        style={style}
      />
    );
  }

  // for display
  return (
    <Stars
      default={rating}
      disabled
      spacing={2}
      count={5}
      starSize={50}
      fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
      emptyStar={
        <Icon
          name={'star-outline'}
          style={[styles.myStarStyle, styles.myEmptyStarStyle]}
        />
      }
      halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});
