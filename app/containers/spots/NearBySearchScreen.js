import * as React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import Card from '../../components/Card';
import {Button} from 'native-base';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {useAuth} from '../../hooks/useAuth';

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
        <Image style={styles.image} source={require('../../assets/map.png')} />
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

        <Image
          style={styles.image}
          source={require('../../assets/search.png')}
        />
      </Card>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    height: '85%',
    width: '100%',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flexDirection: 'column',
  },
  imgContainer: {
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    paddingBottom: 10,
  },
});
