import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

const GradientBackground = props => {
  const styles = StyleSheet.create({
    p3: {
      padding: props.fullWidth ? '0%' : '3%',
    },
  });

  if (!props || !props.children)
    return (
      <LinearGradient
        colors={['#CFDDFC', 'white']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={{
          flex: 1,
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
        flex: 1,
        width: '100%',
        height: '100%',
        ...props.style,
      }}>
      <ScrollView
        stickyHeaderIndices={props.stickyHeader ? [0] : ''}
        refreshControl={props.refreshControl}
        style={styles.p3}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={props.contentContainerStyle}>
        {props.children}
      </ScrollView>
      <View>{props.footer}</View>
    </LinearGradient>
  );
};

export default GradientBackground;
