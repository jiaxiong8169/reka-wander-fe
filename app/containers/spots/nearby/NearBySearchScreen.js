import * as React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Card from '../../../components/Card';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'native-base';
import BlueSubtitle from '../../../components/BlueSubtitle';
import GradientBackground from '../../../components/GradientBackground';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function NearBySearchScreen({navigation}) {
  return (
    <GradientBackground>
      <BlueSubtitle
        text1={'Hi'}
        text2={'Melvin,'}
        style={{marginBottom: 20}}></BlueSubtitle>
      <Card style={styles.card}>
        <TouchableOpacity
          style={{minHeight: 150 , height: undefined, width: '100%'}}
          onPress={() => navigation.navigate('NearByHome')}>
          <Image
            style={styles.image}
            source={require('../../../assets/map.png')}
          />
        </TouchableOpacity>
        {/* <Image
          style={styles.image}
          source={require('../../../assets/map.png')}
        /> */}
        <Button
          w="50%"
          m="3"
          size="lg"
          bg="blue.500"
          onPress={() => navigation.navigate('NearByHome')}
          _pressed={{bg: 'blue.300', _text: {color: 'white'}}}>
          Find Nearby
        </Button>

        <Text style={styles.h2}>
          Or {'\n'}
          Search Manually
        </Text>
        <TouchableOpacity
          style={{minHeight: 150 , height: undefined, width: '100%'}}
          onPress={() => navigation.navigate('SpotsSearchManually')}>
          <Image
          style={styles.image}
          source={require('../../../assets/search.png')}
        />
        </TouchableOpacity>
      </Card>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    height: '85%',
    width: '100%',
    // flex: 1,
    // // backgroundColor: 'white',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flexDirection: 'column',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    // aspectRatio: 1, // Your aspect ratio
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    paddingBottom: 10,
  },
});
