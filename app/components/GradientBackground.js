import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {Dimensions, StyleSheet, ScrollView} from 'react-native';

const height = Dimensions.get('window').height;

const GradientBackground = props => {
  if (!props || !props.children)
    return (
      <LinearGradient
        colors={['#CFDDFC', 'white']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={{
          height: height - 80,
          width: '100%',
          ...props.style,
        }}
      />
    );

  return (
    <LinearGradient
      colors={['#CFDDFC', 'white']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.5}}
      style={{
        width: '100%',
        height: height - 80,
        ...props.style,
      }}>
      <ScrollView
        refreshControl={props.refreshControl}
        style={props.fullWidth ? '' : styles.p3}>
        {props.children}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  p3: {
    padding: '3%',
  },
});
export default GradientBackground;
