import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Image} from 'react-native';
import {Box, Heading, Text, ArrowBackIcon, Pressable} from 'native-base';
import {Rating} from 'react-native-ratings';
import {ScrollView, SafeAreaView} from 'react-native';
import RoundButton from '../../../components/RoundButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function NearByDetailsScreen({navigation}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../../assets/home.jpg')}></Image>
        <View style={{flex: 1}}></View>
        <Box style={styles.backButton}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowBackIcon size="8" color="white" m="1" />
          </Pressable>
        </Box>

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
            adsalksjdklasjdklaslkjdaklslasjdlaskjdasdasdsadsadsadasdasdasdasdsadasdasdasdasdasda
            adsalksjdklasjdklaslkjdaklslasjdlaskjdasdasdsadsadsadasdasdasdasdsadasdasdasdasdasda
            adsalksjdklasjdklaslkjdaklslasjdlaskjdasdasdsadsadsadasdasdasdasdsadasdasdasdasdasda
          </Text>
          <RoundButton title="Direction" backgroundColor="#dc2626" />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.icon}
              source={require('../../../assets/love.png')}></Image>
            <Text
              ml={'2'}
              bold
              fontSize={12}
              color="gray.500"
              style={styles.iconText}>
              10.5k
            </Text>
          </View>
          <TouchableOpacity
            style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
            onPress={() => navigation.navigate('SpotsComment')}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.icon}
                source={require('../../../assets/message.png')}
                tintColor="red"></Image>
              <Text
                ml={'2'}
                bold
                fontSize={12}
                color="red.500"
                style={styles.iconText}>
                633
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.icon}
              source={require('../../../assets/share.png')}></Image>
            <Text
              ml={'2'}
              bold
              fontSize={12}
              color="gray.500"
              style={styles.iconText}>
              87
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#414141',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    // height: height,
    minHeight: height * 0.5 + 20,
    width: '100%',
    paddingTop: '14%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  buttonContainer: {
    height: 60,
    width: '70%',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 20,
    left: '15%',
    right: 0,
    top: height * 0.33,
    paddingLeft: '10%',
    paddingRight: '10%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#414141',
  },
  image: {
    flex: 1,
    width: '100%',
    height: height * 0.4,
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
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(69, 69 , 69, 0.7)',
    borderRadius: 5,
  },
});
