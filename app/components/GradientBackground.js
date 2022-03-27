import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {Component} from 'react';
import {View} from 'native-base';
const GradientBackground = props => {
  return (
    <LinearGradient
      colors={['#CFDDFC', 'white']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.5}}
      style={{height: '100%', width: '100%'}}>
      <View style={{padding: 20}}>{props.children}</View>
    </LinearGradient>
  );
};
export default GradientBackground;
