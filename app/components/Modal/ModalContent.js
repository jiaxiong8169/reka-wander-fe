import React from 'react';
import {Button, View, Text, StyleSheet, Dimensions} from 'react-native';

const ModelContent = props => {
  return (
    <View style={styles.content}>
      <View style={{marginBottom: 15}}>{props.children}</View>
      <Button testID={'close-button'} onPress={props.onPress} title="Close" color='#6495ED'/>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default ModelContent;
