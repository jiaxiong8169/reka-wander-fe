import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Card from '../components/Card';
import FastImage from 'react-native-fast-image';
import {RatingButton} from './RatingButton';
import {CustomButton} from './CustomButton';
import {CustomText} from './texts/custom-text';

const CardItem = ({item, navigation, type, marginBottom}) => {
  return (
    <Card
      style={{
        minHeight: 150,
        flexDirection: 'row',
        margin: 10,
        marginBottom: marginBottom,
      }}
      key={item.id}>
      <FastImage
        style={{flex: 1, height: undefined, borderRadius: 5}}
        source={{uri: item.thumbnailSrc}}
      />
      <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
        <View style={{flexDirection: 'row', flex: 2}}>
          <View style={{flex: 1}}>
            <CustomText bold>{item.name}</CustomText>
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
                alignItems: 'center',
              }}>
              <Image
                style={{width: 15, height: 15}}
                source={require('../assets/pin.png')}
                tintColor={'#52525b'}
              />
              <CustomText marginLeft="1" fontSize="xs" color="gray.600">
                {item.city}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 4,
              }}>
              <CustomText marginLeft="1" fontSize={8} color="gray.400">
                {!item.reviews ? '' : `${item.reviews.length} reviews`}
              </CustomText>
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
              <CustomText
                fontSize="xs"
                color="primary.400"
                style={{textAlign: 'right'}}>
                {item.perks}
              </CustomText>
              <CustomText
                bold
                fontSize="3xl"
                color="primary.400"
                style={{textAlign: 'right'}}>
                RM {item.price ? item.price : item.minPrice}
              </CustomText>
            </View>
          </View>
        </View>
        <CustomButton
          size="sm"
          onPress={() => {
            navigation.navigate('SpotDetails', {
              type: type,
              id: item.id,
            });
          }}>
          View Details
        </CustomButton>
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
export default CardItem;
