import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import {RatingButton} from './RatingButton';
import {CustomButton} from './CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomText} from './texts/custom-text';

const {width} = Dimensions.get('window');

const CardItem = ({item, onPress, type, marginBottom}) => {
  return (
    <TouchableOpacity style={{alignItems: 'center'}} onPress={onPress}>
      <Card
        style={{
          minHeight: 150,
          flexDirection: 'row',
          margin: 10,
          marginBottom: marginBottom,
          width: width * 0.8,
        }}
        key={item.id}>
        <Image
          style={{flex: 1, height: undefined, borderRadius: 5}}
          source={{uri: item.thumbnailSrc}}
          alt="thumbnail"
        />
        <View style={{flex: 2, marginLeft: 10, justifyContent: 'space-between'}}>
          <View
            style={{}}>
            <CustomText bold style={{color: '#23297a'}}>
              {item.name}
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 2,
              }}>
              <Icon name="star" size={13} color="#ffdf00" />
              <CustomText style={{fontSize: 10, paddingLeft: 8}}>
                {item.avgRating} (
                {!item.reviews ? '' : `${item.reviews.length} reviews`})
              </CustomText>
            </View>
            <View style={styles.lineStyle} />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 4,
                alignItems: 'center',
              }}>
              <Icon name="map-marker" size={13} color="#52525b" />
              <CustomText
                color="gray.600"
                style={{fontSize: 10, paddingLeft: 8}}>
                {item.city}
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="home-city" size={13} color="#52525b" />
              <CustomText
                color="gray.600"
                style={{fontSize: 10, paddingLeft: 8}}>
                {item.category}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <CustomText style={{textAlign: 'left', fontSize: 12}}>
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
              {type === 'restaurants' && (
                <CustomText
                  fontSize="xs"
                  color="primary.400"
                  style={{textAlign: 'right'}}>
                  {'  '}average per pax
                </CustomText>
              )}
            </CustomText>
          </View>
        </View>
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
export default CardItem;
