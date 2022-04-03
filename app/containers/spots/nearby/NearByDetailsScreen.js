import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import GradientBackground from '../../../components/GradientBackground';
import {Image} from 'react-native';
import {IconButton, Box, Heading, Text, Button} from 'native-base';
import {Rating} from 'react-native-ratings';
import {ScrollView, SafeAreaView} from 'react-native';

export default function NearByDetailsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/restaurant.jpg')}></Image>
      <View style={{flex: 1}}></View>
      <View style={styles.textContainer}>
        <Heading size="2xl" color={'white'}>
          Hotel 1234
        </Heading>

        <Text fontSize={14} color="white">
          Kota Kinabalu
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text bold fontSize={14} color="white">
            Western Food
          </Text>
        </View>
        <Rating
          style={{
            marginRight: 'auto',
            marginTop: 6,
          }}
          imageSize={15}
          ratingCount={5}
          startingValue={4}
          tintColor={'#414141'}
          readonly
        />
        <Text mt="3" mb="10" color={'white'}>
          adsalksjdklasjdklaslkjdaklslasjdlaskjdasdasdsadsadsadasdasdasdasdsadasdasdasdasdasda
        </Text>
        <Button
          bg={'red.500'}
          key={'lg'}
          size={'lg'}
          _pressed={{bg: 'red.300', _text: {color: 'white'}}}>
          Direction
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{flexDirection:'row'}}>
          <Image
            style={styles.icon}
            source={require('../../../assets/love.png')}></Image>
          <Text ml={'2'} bold fontSize={12} color="gray.500" style={styles.iconText}>
            10.5k
          </Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <Image
          style={styles.icon}
          source={require('../../../assets/message.png')} tintColor="red"></Image>
        <Text ml={'2'} bold fontSize={12} color="red.500" style={styles.iconText}>
          633
        </Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <Image
          style={styles.icon}
          source={require('../../../assets/share.png')}></Image>
        <Text ml={'2'} bold fontSize={12} color="gray.500" style={styles.iconText}>
          87
        </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#414141',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    right: 0,
    left: 0,
    top: '47%',
    height: '100%',
    width: '100%',
    paddingTop: '14%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  buttonContainer: {
    height: '12%',
    width: '70%',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 20,
    left: '15%',
    right: 0,
    top: '41%',
    paddingLeft: '10%',
    paddingRight: '10%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '50%',
    position: 'relative',
  },
  icon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    tintColor: 'gray',
  },
  iconText: {
    alignSelf: 'center',
  },
});
