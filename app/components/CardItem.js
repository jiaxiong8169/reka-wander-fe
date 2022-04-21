import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'native-base';
import {Button, Badge, Flex} from 'native-base';
import Card from '../components/Card';
import {Rating} from 'react-native-ratings';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CardItem = props => {
  return (
    <View>
      <Card style={{height: 150, flexDirection: 'row', margin: 5}}>
        {/* <Image
          style={{flex: 1, height: undefined, borderRadius: 5}}
          source={{
            uri: props.imgSrc,
          }}></Image> */}
          <Image
          style={{flex: 1, height: undefined, borderRadius: 5}}
            source= {props.imageSrc}
          ></Image>
        <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
          <View style={{flexDirection: 'row', flex: 2}}>
            <View style={{flex: 1}}>
              <Text bold fontSize={14} letterSpacing="sm" lineHeight="xs">
                {props.itemName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 'auto',
                  marginTop: 2,
                }}>
                <Rating
                  imageSize={15}
                  ratingCount={5}
                  startingValue={props.ratingPercentage/10*5}
                  readonly
                />
                <Text marginLeft="1" fontSize={12} color="gray.600">
                  {props.category}
                </Text>
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
                  {props.location}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 4,
                }}>
                <Badge
                  _text={{
                    fontSize: 6,
                  }}
                  colorScheme="danger"
                  variant="solid"
                  style={{borderRadius: 100}}>
                  {props.rating}
                </Badge>
                <Text bold marginLeft="1" fontSize={8} color="gray.600">
                  Excellent{' '}
                  <Text marginLeft="1" fontSize={8} color="gray.400">
                    ({props.totalReviews} reviews)
                  </Text>
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
                justifyContent: 'space-between',
                padding: 8,
              }}>
              <Text bg="blue.600" style={{padding: 2, textAlign: 'right'}}>
                <Text
                  bold
                  fontSize={10}
                  color="white"
                  bg="blue.600"
                  px="3"
                  style={{padding: 3, textAlign: 'right'}}>
                  {props.lessThanUsualPercentage}% {'  '}
                  <Text
                    color="blue.600"
                    bg="white"
                    p="10"
                    m="20"
                    style={{padding: 3, margin: 10, textAlign: 'right'}}>
                    {' '}
                    Less than usual{' '}
                  </Text>
                </Text>
              </Text>
              <View>
                <Text
                  fontSize="12"
                  color="blue.600"
                  style={{textAlign: 'right'}}>
                  {props.perk}
                </Text>
                <Text
                  bold
                  lineHeight="xs"
                  fontSize="25"
                  color="blue.600"
                  style={{textAlign: 'right'}}>
                  RM {props.price}
                </Text>
              </View>
            </View>
          </View>
          <Button
            size="sm"
            padding="1"
            bg="blue.600"
            _pressed={{bg: 'blue.300', _text: {color: 'white'}}}>
            Reserve Now
          </Button>
        </View>
      </Card>
    </View>
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
