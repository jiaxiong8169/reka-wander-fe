import {Button} from 'native-base';
import {Text, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, children, disabled, style}) => {
  return (
    <Button style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    // backgroundColor: '#F5362E',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    shadowColor: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomButton;
