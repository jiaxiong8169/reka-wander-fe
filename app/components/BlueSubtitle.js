import React from 'react';
import {Text} from 'react-native';

const BlueSubtitle = props => {
  return (
    <Text
      style={[
        {
          fontSize: props.small ? 30 : 40,
          color: 'rgb(117,157,246)',
          fontWeight: '300',
        },
        props.style,
      ]}>
      {props.text1}
      <Text
        style={{
          fontSize: props.small ? 30 : 40,
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
