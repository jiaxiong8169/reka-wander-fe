import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {Image, View} from 'native-base';
import {RatingButton} from './RatingButton';
import {CustomText} from './texts/custom-text';

export const GuideCardItem = ({item, onPress, marginBottom}) => {
  return (
    <ImageBackground
      style={{
        height: 150,
        margin: 10,
        marginBottom: marginBottom,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        overflow: 'hidden',
        borderRadius: 10,
      }}
      source={require('../assets/sky.jpg')}
      key={item.id}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}>
        <View
          style={{
            flex: 3,
            marginLeft: 20,
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}>
          <CustomText bold fontSize="xl">
            {item.name.toUpperCase()}
          </CustomText>
          <CustomText fontSize="xs">{item.city}</CustomText>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 'auto',
              marginTop: 2,
              marginBottom: 10,
            }}>
            <RatingButton rating={item.avgRating} />
          </View>
        </View>
        <Image
          style={{
            width: undefined,
            flex: 2,
            height: undefined,
          }}
          alt="thumbnail"
          source={{
            uri: item.thumbnailTransparentSrc,
          }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};
