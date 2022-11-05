import React from 'react';
import {Box} from 'native-base';
import Card from './Card';
import {View, Image, TouchableOpacity, Dimensions} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomText} from './texts/custom-text';

const CarCardItem = ({
  onPress,
  price,
  name,
  thumbnailSrc,
  toggleItemSelection,
  item,
  withEdit,
  selected,

}) => {
  const {width} = Dimensions.get('window');

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={{
          flexDirection: 'row',
          width: '80%',
          margin: 10,
          padding: 0,
          height: 170,
          width: width * 0.8,
        }}>
        <View style={{width: '45%'}}>
          <CustomText
            bold
            ml={3}
            mt={4}
            style={{
              textAlign: 'left',
              lineHeight: 18.5,
              color: '#23297a',
              fontSize: 18,
            }}>
            {name}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}>
            <Icon name="map-marker" size={14} color="#52525b" />
            <CustomText
              style={{
                textAlign: 'left',
                fontSize: 12,
                paddingLeft: 5,
              }}>
              {item.city}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="seat-passenger" size={15} color="#52525b" />
              <CustomText
                style={{
                  textAlign: 'left',
                  lineHeight: 15,
                  fontSize: 12,
                  paddingLeft: 5,
                }}>
                {item.seatNumber}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
              }}>
              <Icon name="car" size={15} color="#52525b" />
              <CustomText
                style={{
                  textAlign: 'left',
                  fontSize: 12,
                  lineHeight: 15,
                  paddingLeft: 5,
                }}>
                {item.transmission}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 12,
            }}>
            <Icon name="car-hatchback" size={15} color="#52525b" />
            <CustomText
              style={{
                textAlign: 'left',
                fontSize: 12,
                paddingLeft: 5,
              }}>
              {item.type}
            </CustomText>
          </View>
        </View>
        <CustomText
          ml={3}
          mt={2}
          style={{
            textAlign: 'left',
            width: '85%',
            fontSize: 11,
            position: 'absolute',
            bottom: 10,
          }}>
          From {'  '}
          <CustomText style={{fontSize: 11}}>RM </CustomText>
          <CustomText
            bold
            style={{
              fontSize: 20,
              color: '#fb8500',
            }}>
            {price}
          </CustomText>
        </CustomText>
        <View
          style={{
            width: '50%',
            height: '100%',
          }}>
          <Image
            style={{
              height: '100%',
              resizeMode: 'contain',
            }}
            alt="thumbnail"
            source={{uri: thumbnailSrc}}
          />
        </View>

        {withEdit && (
          <CheckBox
            style={{position: 'absolute', right:'1%'}}
            onValueChange={() => {
              if (!toggleItemSelection) return;
              toggleItemSelection(item?.id, item);
            }}
            value={selected && selected.includes(item?.id)}
          />
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default CarCardItem;
