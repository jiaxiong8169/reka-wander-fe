import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {StyleSheet, ScrollView, useWindowDimensions} from 'react-native';

const GradientBackground = props => {
  const {height} = useWindowDimensions();

  const styles = StyleSheet.create({
    p3: {
      padding: '3%',
      // minHeight: height ? height : 0,
    },
    p0: {
      // minHeight: height ? height : 0,
    },
  });

  if (!props || !props.children)
    return (
      <LinearGradient
        colors={['#CFDDFC', 'white']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={{
          height: '100%',
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
        height: '100%',
        ...props.style,
      }}>
      <ScrollView
        refreshControl={props.refreshControl}
        style={props.fullWidth ? styles.p0 : styles.p3}>
        {props.children}
      </ScrollView>
    </LinearGradient>
  );
};

export default GradientBackground;
