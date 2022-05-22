import React from 'react';
import {Text, Box, Center} from 'native-base';
import Card from './Card';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

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
        <Image
          style={{
            marginTop: -15,
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain',
          }}
          source={{uri: props.thumbnailSrc}}
        />
        {props.withEdit && (
          <TouchableOpacity
            onPress={() => {
              if (!props.toggleItemSelection) return;
              props.toggleItemSelection(props.item?.id, props.item);
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 5,
              }}>
              <CheckBox
                value={
                  props.selected && props.selected.includes(props.item?.id)
                }
              />
            </View>
          </TouchableOpacity>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default CarCardItem;
