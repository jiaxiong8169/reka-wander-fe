import React from 'react';
import {View, Dimensions, ScrollView, Image} from 'react-native';
import {Text, Input, Box, ZStack, Center} from 'native-base';
import Card from './Card';
import LinearGradient from 'react-native-linear-gradient';
import BlueSubtitle from './BlueSubtitle';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const CarCardItem = (props) => {

  return (
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
        {/* <ZStack> */}
        <Box
          bg={'blue.300'}
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
            RM {props.price}{'\n'}
            <Text fontSize={15} lineHeight={25}>
              Per Day
            </Text>
          </Text>
        </Box>
        {/* </ZStack> */}
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
          width: 260,
          height: 150,
          resizeMode: 'contain',
          marginTop: -50,
        }}
        source={{uri: props.thumbnailSrc}}
      />
    </Card>
  );
};

export default CarCardItem;
