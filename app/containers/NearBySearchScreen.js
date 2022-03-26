import * as React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Card from '../components/Card';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from "native-base";
import { createStackNavigator } from '@react-navigation/stack';

export default function NearBySearchScreen({navigation}) {
  return (
    <LinearGradient
      colors={['#CFDDFC', 'white']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.5}}
      style={{height: '100%', width: '100%'}}>
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: 40,
            color: 'rgb(117,157,246)',
            fontWeight: '300',
            marginBottom: 20,
          }}>
          Hi
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color: 'rgb(117,157,246)',
            }}>
            {' '}
            Melvin,
          </Text>
        </Text>
        <Card style={styles.card}>
          <Image
          style={styles.image}
            source={require('../assets/map.png')}
          />
          <Button w="50%" m="3" size="lg" bg="blue.500"
          onPress={() => navigation.navigate('NearByCategory')}
          _pressed={{bg: "blue.300",_text: {color: "white"}}}>Find Nearby</Button>

          <Text style={styles.h2}>Or {"\n"}
          Search Manually</Text>
          
          <Image
          style={styles.image}
            source={require('../assets/search.png')}
          />
        </Card>
      </View>
    </LinearGradient>
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
    flexDirection: 'column'
  },
  imgContainer: {
    flexDirection: 'row'
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    // aspectRatio: 1, // Your aspect ratio
  },
  h2:{
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    paddingBottom: 10,
  },
});
