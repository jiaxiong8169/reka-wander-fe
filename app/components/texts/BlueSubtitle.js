import React from 'react';
import {View, Text} from 'react-native';

const BlueSubtitle = ({text1, text2, style}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        // padding:0,
        ...style,
      }}>
      {!!text1 && (
        <Text
          // includeFontPadding={false}
          style={{
            fontFamily: 'Baloo2-Medium',
            fontSize: 40,
            color: '#000080',
            lineHeight: 40 * 1.4,
            height: 40,
            // backgroundColor: 'red',
          }}>
          {text1}
        </Text>
      )}
      {!!text2 && (
        <Text
          style={{
            fontFamily: 'Baloo2-Regular',
            fontSize: 20,
            color: '#000080',
          }}>
          {text2}
        </Text>
      )}
    </View>
  );
};

export default BlueSubtitle;
