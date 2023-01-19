import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomButton} from '../CustomButton';

const ModelContent = props => {
  return (
    <View style={{...styles.content, ...props.style}}>
      <View style={{marginBottom: 5}}>{props.children}</View>
      <CustomButton onPress={props.onPress}>
        {!!props.buttonTitle ? props.buttonTitle : 'Close'}
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default ModelContent;
