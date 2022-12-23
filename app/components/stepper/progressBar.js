import * as Progress from 'react-native-progress';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

export const TripProgress = ({completion, progress}) => {
  const {width} = Dimensions.get('window');

  return (
    <View>
      <View>
        <Text style={{fontWeight: '300', fontSize: 40, color: `#4169E1`}}>
          Hi{' '}
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'sans-serif-light',
            }}>
            Welcome,
          </Text>
        </Text>
        <Text style={{fontSize: 15, color: `#4169E1`}}>
          Create your destiny
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Progress.Bar
          width={width * 0.93}
          height={17}
          style={{
            marginTop: 15,
          }}
          color="#8ab9f1"
          //   unfilledColor="rgba(65,105,225, 1)"
          progress={progress}
          //   borderWidth={0}
          borderRadius={8}
        //   animationType={'timing'}
          >
          <Text
            style={{
              alignSelf: 'flex-start',
              position: 'absolute',
              fontSize: 14,
              flex: 0,
              bottom: 0,
              paddingHorizontal: 8,
              color: 'white',
              fontWeight: 'bold',
            }}>
            {completion}
          </Text>
        </Progress.Bar>
      </View>
    </View>
  );
};
