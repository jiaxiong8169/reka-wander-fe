import React from 'react';
import {Box} from 'native-base';
import Card from './Card';
import {Image, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CustomText} from './texts/custom-text';

const CarCardItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card
        style={{
          flexDirection: 'row',
          margin: 10,
          padding: 10,
          height: 150,
        }}>
        <Box>
          <Box
            bg={{
              linearGradient: {
                colors: ['blue.600', 'lightBlue.300'],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            p="3"
            rounded="2xl"
            shadow={5}>
            <CustomText color="white" style={{textAlign: 'center'}}>
              RM {props.price}
            </CustomText>
            <CustomText color="white" style={{textAlign: 'center'}}>
              Per Day
            </CustomText>
          </Box>
          <CustomText
            bold
            fontSize="lg"
            mt={3}
            style={{textAlign: 'center', width: 100}}
            lineHeight={20}
            numberOfLines={2}>
            {props.name}
          </CustomText>
        </Box>
        <Image
          style={{
            flex: 1,
            marginHorizontal: 20,
            width: null,
            height: null,
            resizeMode: 'contain',
          }}
          source={{uri: props.thumbnailSrc}}
        />
        {props.withEdit && (
          <CheckBox
            onValueChange={() => {
              if (!props.toggleItemSelection) return;
              props.toggleItemSelection(props.item?.id, props.item);
            }}
            value={props.selected && props.selected.includes(props.item?.id)}
          />
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default CarCardItem;
