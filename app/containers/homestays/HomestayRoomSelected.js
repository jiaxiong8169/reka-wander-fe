import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/BlueSubtitle';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

export const RoomsSelected = ({style, id, name, url, price, quantity}) => {
  return (
    <View
      key={id}
      style={[
        {
          flexDirection: 'column',
          paddingBottom: 10,
          paddingTop: 10,
          width: '100%',
        },
        style,
      ]}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{flex: 2}}>
          <FastImage
            style={{
              flex: 1,
              width: undefined,
              resizeMode: 'contain',
              borderRadius: 5,
              paddingRight: 8,
            }}
            source={{uri: url}}
          />
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: 'column',
            marginLeft: 3,
            paddingLeft: 10,
          }}>
          <View>
            <Text style={{fontSize: 15, color: '#000'}}>{name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Price per day: </Text>
            <Text>{price}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Quantity: </Text>
            <Text>{quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
