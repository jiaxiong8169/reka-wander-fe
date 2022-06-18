import React from 'react';
import {Box, Image} from 'native-base';
import Card from './Card';
import {TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CustomText} from './texts/custom-text';

export const HomestayCardItem = ({
  onPress,
  price,
  item,
  name,
  thumbnailSrc,
  withEdit,
  selected,
  toggleItemSelection,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
              RM {price}
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
            numberOfLines={2}>
            {name}
          </CustomText>
        </Box>
        <Card
          style={{
            flex: 1,
            marginHorizontal: 20,
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            alt="thumbnail"
            source={{uri: thumbnailSrc}}
          />
        </Card>
        {withEdit && (
          <CheckBox
            onValueChange={() => {
              toggleItemSelection(item.id, item);
            }}
            value={selected && selected.includes(item.id)}
          />
        )}
      </Card>
    </TouchableOpacity>
  );
};
