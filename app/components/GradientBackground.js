import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {View, Dimensions} from 'react-native';

const height = Dimensions.get('window').height;

const GradientBackground = props => {
  if (!props || !props.children)
    return (
      <LinearGradient
        colors={['#CFDDFC', 'white']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={{height: '100%', width: '100%'}}
      />
    );

  return (
    <LinearGradient
      colors={['#CFDDFC', 'white']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.5}}
      style={{height: '100%', width: '100%', minHeight:height}}>
      <View style={{padding: '3%'}}>{props.children}</View>
    </LinearGradient>
  );
};
export default GradientBackground;
