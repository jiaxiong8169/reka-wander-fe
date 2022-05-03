import React from 'react';
import {Text, Box, Center} from 'native-base';
import Card from './Card';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CarCardItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card
        style={{
          flexDirection: 'row',
          flex: 2,
          margin: 10,
          marginTop: 50,
          paddingLeft: 15,
          height: 120,
        }}>
        <Center>
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
            style={{maxWidth: 100, textAlign: 'center'}}
            lineHeight={20}
            numberOfLines={2}>
            {props.name}
          </Text>
        </Center>
        <FastImage
          style={{
            // maxWidth: '75%',
            // height: 'auto',
            // padding:50,
            // // resizeMode: 'contain',
            // aspectRatio: 16/9,
            marginTop: -15,
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain',
          }}
          source={{uri: props.thumbnailSrc}}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default CarCardItem;
