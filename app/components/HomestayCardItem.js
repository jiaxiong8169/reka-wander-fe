import React, {useEffect, useState} from 'react';
import {Box, Hidden, Image} from 'native-base';
import Card from './Card';
import {TouchableOpacity, View, Dimensions, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CustomText} from './texts/custom-text';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {convertAbsoluteToRem} from 'native-base/lib/typescript/theme/tools';

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

  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={{
          minHeight: 150,
          flexDirection: 'row',
          margin: 10,
          marginBottom: 10,
          width: width * 0.8,
        }}
        key={item.id}>
        <Image
          style={{flex: 1, height: undefined, borderRadius: 5}}
          source={{uri: item.thumbnailSrc}}
          alt="thumbnail"
        />
        <View
          style={{flex: 2, marginLeft: 10, justifyContent: 'space-between'}}>
          <View style={{}}>
            <CustomText bold style={{color: '#23297a'}}>
              {item.name}
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 4,
                alignItems: 'center',
              }}>
              <Icon name="map-marker" size={13} color="#ff4500" />
              <CustomText
                color="gray.600"
                style={{fontSize: 10, paddingLeft: 8}}>
                {item.city}
              </CustomText>
            </View>
            <View style={styles.lineStyle} />

            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
                alignItems: 'center',
              }}>
              <Icon name="home-city" size={13} color="#52525b" />
              <CustomText
                color="gray.600"
                style={{fontSize: 10, paddingLeft: 8}}>
                {item.propertyType}
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="bed-king" size={15} color="#52525b" />
              <CustomText
                color="gray.600"
                style={{fontSize: 10, paddingLeft: 7}}>
                {item.rooms.length} room(s)
              </CustomText>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <CustomText
              style={{
                fontSize: 12,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                alignContent:'flex-end',
              }}>
              From {'  '}
              <CustomText style={{fontSize: 11}}>RM </CustomText>
              <CustomText
                bold
                style={{
                  fontSize: 25,
                  color: '#fb8500',
                  lineHeight: 30,
                }}>
                {item.price ? item.price : item.minPrice}
              </CustomText>
            </CustomText>
          </View>
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

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.2,
    borderColor: '#rgb(204,204,204)',
  },
  button: {
    borderRadius: 100,
  },
});
