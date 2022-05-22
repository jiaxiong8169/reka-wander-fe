import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

TouchableOpacity.defaultProps = {activeOpacity: 0.7};

export const RatingButton = ({onPress, rating, editable}) => {
  return (
    <Stars
      display={rating}
      default={rating}
      update={editable ? onPress : () => {}}
      spacing={2}
      count={5}
      starSize={50}
      disabled={!editable}
      // half
      fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
      emptyStar={
        <Icon
          name={'star-outline'}
          style={[styles.myStarStyle, styles.myEmptyStarStyle]}
        />
      }
      halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
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
