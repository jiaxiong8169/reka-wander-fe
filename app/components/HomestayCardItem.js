import React from 'react';
import {Text, Box, Center} from 'native-base';
import Card from './Card';
import FastImage from 'react-native-fast-image';

export const HomestayCardItem = props => {
  return (
    <Card
      style={{
        flexDirection: 'row',
        flex: 2,
        margin: 10,
        marginTop: 40,
        minHeight: 120,
      }}>
      <Center flex="1">
        <Box
          bg={{
            linearGradient: {
              colors: ['blue.600', 'lightBlue.300'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          mt="-10"
          p="2"
          rounded="2xl"
          shadow={5}>
          <Text
            style={{textAlign: 'center'}}
            bold
            fontSize={20}
            lineHeight={30}
            color={'white'}>
            RM {props.price}
            {'\n'}
            <Text fontSize={15} lineHeight={25}>
              Per Day
            </Text>
          </Text>
        </Box>
        <Text
          bold
          fontSize={20}
          mt={3}
          style={{maxWidth: 100}}
          lineHeight={20}
          numberOfLines={2}>
          {props.name}
        </Text>
      </Center>
      <Card
        style={{
          flex: 1,
          borderRadius: 0,
          transform: [{rotate: '-5deg'}, {translateY: -30}],
        }}>
        <FastImage
          style={{
            width: undefined,
            height: '100%',
            resizeMode: 'contain',
          }}
          source={{uri: props.thumbnailSrc}}
        />
      </Card>
    </Card>
  );
};
