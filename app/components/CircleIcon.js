import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

TouchableOpacity.defaultProps = {activeOpacity: 0.7};

export const MyCircleIcon = ({
  onPress,
  backgroundColor,
  style,
  text,
  children,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{display: 'flex', alignItems: 'center'}}>
    <View
      style={[
        styles.button,
        backgroundColor && {backgroundColor},
        style && style,
      ]}>
      {children}
    </View>
    {text && <Text>{text}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 64,
    width: 64,
    elevation: 6,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    margin: 5,
  },
});
