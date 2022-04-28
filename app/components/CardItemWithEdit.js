import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Text} from 'native-base';
import {Button} from 'native-base';
import Card from '../components/Card';
import FastImage from 'react-native-fast-image';
import {RatingButton} from './RatingButton';

const CardItemWithEdit = ({
  item,
  navigation,
  type,
  marginBottom,
  selected,
  toggleItemSelection,
}) => {
  return (
    <Card
      style={{
        minHeight: 150,
        flexDirection: 'row',
        flex: 1,
        margin: 10,
        marginBottom: marginBottom,
      }}
      key={item.id}>
      <FastImage
        style={{flex: 1, height: undefined, borderRadius: 5}}
        source={{uri: item.thumbnailSrc}}
      />
      <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: 5,
          }}>
          <Text style={{color: 'blue'}}>
            {selected &&
            (typeof selected === 'string'
              ? selected === item.id
              : selected.includes(item.id))
              ? 'Item Selected  '
              : ''}
          </Text>
          <CheckBox
            value={
              selected &&
              (typeof selected === 'string'
                ? selected === item.id
                : selected.includes(item.id))
            }
            onValueChange={() => toggleItemSelection(item.id, item)}
          />
        </View>
        <View style={{flexDirection: 'row', flex: 2}}>
          <View style={{flex: 1}}>
            <Text bold fontSize={14} letterSpacing="sm" lineHeight="xs">
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 'auto',
                marginTop: 2,
                marginBottom: 4,
              }}>
              <RatingButton rating={item.avgRating} />
            </View>
            <View style={styles.lineStyle} />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 4,
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../assets/pin.png')}
                tintColor={'#52525b'}
              />
              <Text marginLeft="1" fontSize={10} color="gray.600">
                {item.city}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 4,
              }}>
              <Text marginLeft="1" fontSize={8} color="gray.400">
                {!item.reviews ? '' : `${item.reviews.length} reviews`}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#D0ECFA',
              height: undefined,
              margin: 5,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 8,
            }}>
            <View>
              <Text fontSize="12" color="blue.600" style={{textAlign: 'right'}}>
                {item.perks}
              </Text>
              <Text
                bold
                lineHeight="xs"
                fontSize="25"
                color="blue.600"
                style={{textAlign: 'right'}}>
                RM {item.price ? item.price : item.minPrice}
              </Text>
            </View>
          </View>
        </View>
        <Button
          size="sm"
          padding="1"
          bg="blue.600"
          _pressed={{bg: 'blue.300', _text: {color: 'white'}}}
          onPress={() => {
            navigation.navigate('SpotDetails', {
              type: type,
              id: item.id,
            });
          }}>
          View Details
        </Button>
      </View>
    </Card>
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
export default CardItemWithEdit;
