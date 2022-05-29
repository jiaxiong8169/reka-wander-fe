import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {View} from 'native-base';
import FastImage from 'react-native-fast-image';
import {RatingButton} from './RatingButton';
import {CustomText} from './texts/custom-text';

export const GuideCardItem = ({item, navigation, marginBottom}) => {
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
        onPress={() => {
          navigation.navigate('GuideDetails', {
            type: 'guides',
            id: item.id,
          });
        }}
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
        <FastImage
          style={{
            width: undefined,
            flex: 2,
            height: undefined,
          }}
          source={{
            uri: item.thumbnailTransparentSrc,
          }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};
