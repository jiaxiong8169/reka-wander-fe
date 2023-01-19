import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {BackButton} from './BackButton';
const GradientBackground = props => {
  const styles = StyleSheet.create({
    p3: {
      padding: props.fullWidth ? '0%' : '3%',
    },
    backButton: {
      position: 'absolute',
      left: 20,
      top: 20,
      alignSelf: 'flex-start',
      borderRadius: 5,
      backgroundColor: 'rgba(69, 69 , 69, 0.7)',
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
      {props.navigation && (
        <BackButton navigation={props.navigation} absolute />
      )}
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
