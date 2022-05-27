import {Text, View} from 'native-base';
import React from 'react';

const BlueSubtitle = ({text1, text2, style}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}>
      {!!text1 && (
        <Text fontSize="3xl" color="primary.400">
          {text1}
        </Text>
      )}
      {!!text2 && (
        <Text fontSize="xl" color="primary.400">
          {text2}
        </Text>
      )}
    </View>
  );
};

export default BlueSubtitle;
