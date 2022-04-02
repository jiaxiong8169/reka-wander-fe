import React from 'react';
import {Text } from 'react-native';
const BlueSubtitle = props => {
  return (
    <Text
      style={{
        fontSize: 40,
        color: 'rgb(117,157,246)',
        fontWeight: '300',
        marginBottom: 20,
      }}>
      {props.text1}
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          color: 'rgb(117,157,246)',
        }}>
        {' '}
        {props.text2}
      </Text>
    </Text>
  );
};

export default BlueSubtitle;