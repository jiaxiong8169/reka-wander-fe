import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
import {Rating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';

export const GuideCardItem = ({item, navigation, marginBottom}) => {
  return (
    <ImageBackground
      style={{
        height: 150,
        margin: 10,
        marginBottom: marginBottom,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        overflow: 'hidden',
        borderRadius: 10,
      }}
      source={require('../assets/sky.jpg')}
      key={item.id}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SpotDetails', {
            type: 'guides',
            id: item.id,
          });
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}>
        <View
          style={{
            flex: 3,
            marginLeft: 20,
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}>
          <Text
            bold
            fontSize={30}
            letterSpacing="sm"
            lineHeight="xs"
            style={{color: '#fff'}}>
            {item.name.toUpperCase()}
          </Text>
          <Text fontSize={12} color="gray.600">
            {item.city}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginRight: 'auto',
              marginTop: 2,
              marginBottom: 10,
            }}>
            <Rating
              imageSize={15}
              ratingCount={5}
              startingValue={item.avgRating}
              readonly
            />
          </View>
        </View>
        <FastImage
          style={{
            width: undefined,
            flex: 2,
            height: undefined,
          }}
          source={{
            uri: item.thumbnailSrc,
          }}
        />
      </TouchableOpacity>
      {/* <View style={{flexDirection: 'row', flex: 2}}>
          
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
              type: 'guides',
              id: item.id,
            });
          }}>
          View Details
        </Button> */}
    </ImageBackground>
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
