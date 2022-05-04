import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

TouchableOpacity.defaultProps = {activeOpacity: 0.7};

const RoundButton = ({onPress, title, backgroundColor, style, textStyle}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      backgroundColor && {backgroundColor},
      style && style,
    ]}>
    <Text style={[styles.buttonText, textStyle && textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 13,
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default RoundButton;
