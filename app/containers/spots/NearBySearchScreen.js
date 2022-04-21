import * as React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import Card from '../../components/Card';
import {Button} from 'native-base';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {useAuth} from '../../hooks/useAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';


export default function NearBySearchScreen({navigation}) {
  const {authData} = useAuth();

  return (
    <GradientBackground>
      <BlueSubtitle
        text1={'Hi'}
        text2={
          authData?.token
            ? authData.name
              ? authData.name + ','
              : 'User,'
            : 'Visitor,'
        }
        style={{marginBottom: 20}}></BlueSubtitle>
      <Card style={styles.card}>
        <TouchableOpacity
          style={{minHeight: 150 , height: undefined, width: '100%'}}
          onPress={() => navigation.navigate('SpotsImages', {isNearby: true})}>
          <Image
            style={styles.image}
            source={require('../../assets/map.png')}
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
          onPress={() => navigation.navigate('SpotsImages', {isNearby: true})}
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
          source={require('../../assets/search.png')}
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
