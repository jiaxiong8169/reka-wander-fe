import * as React from 'react';
import {View, Image} from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import {Button, ChevronLeftIcon, Text, Badge} from 'native-base';
import BlueSubtitle from '../../components/BlueSubtitle';
import Card from '../../components/Card';
import {Rating} from 'react-native-ratings';
import {StyleSheet} from 'react-native';

export default function NearByCategoryScreen({navigation}) {
  return (
    <GradientBackground>
      <View style={{flexDirection: 'row'}}>
        <ChevronLeftIcon
          color="gray.500"
          size="xl"
          mt="1"
          marginRight="2"
          onPress={() => navigation.goBack()}></ChevronLeftIcon>
        <BlueSubtitle text1={''} text2={'Hotels'} style={{marginBottom: 20}}></BlueSubtitle>
      </View>
      <View>
        <Card style={{height: 150, flexDirection: 'row'}}>
          <Image
            style={{flex: 1, height: undefined, borderRadius: 5}}
            source={require('../../assets/home.jpg')}></Image>
          <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
            <View style={{flexDirection: 'row', flex: 2}}>
              <View style={{flex: 1}}>
                <Text bold fontSize={14} letterSpacing="sm" lineHeight="xs">
                  Hotel Testingv 2132
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
                    startingValue={4}
                    readonly
                  />
                  <Text marginLeft="1" fontSize={12} color="gray.600">
                    Hotel
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
                    source={require('../../assets/pin.png')}
                    tintColor={'#52525b'}
                  />
                  <Text marginLeft="1" fontSize={10} color="gray.600">
                    Kinabalu
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
                    8.3
                  </Badge>
                  <Text bold marginLeft="1" fontSize={8} color="gray.600">
                    Excellent{' '}
                    <Text marginLeft="1" fontSize={8} color="gray.400">
                      (1199 reviews)
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
                  padding: 8
                }}>
                <Text bg="blue.600" style={{padding: 2, textAlign: 'right'}}>
                  <Text
                    bold
                    fontSize={10}
                    color="white"
                    bg="blue.600"
                    px="3"
                    style={{padding: 3, textAlign: 'right'}}>
                    100% {'  '}
                    <Text
                      color="blue.600"
                      bg="white"
                      p="10"
                      m="20"
                      style={{padding: 3, margin: 10, textAlign: 'right'}}>
                      {' '}Less than usual{' '}
                    </Text>
                  </Text>
                </Text>
                <View>
                  <Text fontSize="12" color='blue.600' style={{textAlign:'right'}}>Free breakfast</Text>
                  <Text bold lineHeight="xs" fontSize="25" color='blue.600' style={{textAlign:'right'}}>RM 266</Text>
                </View>
              </View>
            </View>
            <Button size="sm" padding="1" bg="blue.600" _pressed={{bg: 'blue.300', _text: {color: 'white'}}}>
              Reserve Now
            </Button>
          </View>
        </Card>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.2,
    borderColor: '#rgb(204,204,204)',
  },
});
