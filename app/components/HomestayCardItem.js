import React, {useEffect, useState} from 'react';
import {Box, Hidden, Image} from 'native-base';
import Card from './Card';
import {TouchableOpacity, View, Dimensions} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CustomText} from './texts/custom-text';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';

export const HomestayCardItem = ({
  onPress,
  price,
  item,
  name,
  city,
  thumbnailSrc,
  withEdit,
  selected,
  toggleItemSelection,
}) => {
  const {width} = Dimensions.get('window');
  // const [roomLength, setRoomLength] = useState([]);

  // useEffect(() => {
  //   console.log(item.id);
  // }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={{
          flexDirection: 'row',
          margin: 10,
          padding: 0,
          height: 150,
          width: width * 0.8,
        }}>
        <LinearGradient
          style={{
            zIndex: 1,
            width: '75%',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          locations={[0.79, 1]}
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}>
          <CustomText
            bold
            ml={3}
            mt={4}
            style={{
              textAlign: 'left',
              lineHeight: 18.5,
              width: '80%',
              color: '#23297a',
              fontSize: 18,
            }}>
            {name}
          </CustomText>
          <CustomText
              ml={3}
              style={{
                textAlign: 'left',
                // lineHeight: 11,
                fontSize: 11,
              }}>
              {item.rooms.length} rooms
            </CustomText>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText
              ml={3}
              style={{
                textAlign: 'left',
                fontSize: 11,
              }}>
              <Icon name="star" size={13} color="#52525b" /> 4.1 (20)
            </CustomText>
            
            <CustomText
              ml={2}
              style={{
                textAlign: 'left',
                // lineHeight: 13,
                fontSize: 11,
              }}>
              <Icon name="location" size={13} color="#52525b" /> {city}
            </CustomText>
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
              // justifyContent: 'space-between',
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

          {/* <CustomText
            ml={3}
            numberOfLines={3}
            style={{
              textAlign: 'left',
              width: '100%',
              lineHeight: 13,
              fontSize: 11,
              paddingRight: 40,
              marginTop: 18,
            }}>
            {item.description}
          </CustomText> */}
        </LinearGradient>

        <View
          style={{
            width: '40%',
            height: '100%',
          }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              right: '39%',
              overflow: 'hidden',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              resizeMode: 'cover',
            }}
            alt="thumbnail"
            source={{uri: thumbnailSrc}}
          />

          {/* <LinearGradient
            style={{
              width:'90%',
              paddingVertical: 5,
              zIndex: 1,
              right: '12%',
              bottom: '26%',
              justifyContent: 'flex-end',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            locations={[0.5, 1]}
            colors={['#4f86f7', 'rgba(79,134,247,0.1)']}>
            <CustomText
              style={{
                fontSize: 12,
                textAlign: 'center',
                lineHeight: 14,
                marginBottom: 4,
              }}>
              From
            </CustomText>
            <CustomText
              style={{
                fontSize: 20,
                textAlign: 'center',
                lineHeight: 21,
              }}>
              <CustomText style={{fontSize: 11,}}>RM</CustomText> {price}
            </CustomText>
          </LinearGradient> */}
        </View>

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
