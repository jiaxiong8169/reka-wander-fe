import * as React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from '../../components/Card';
import {View} from 'native-base';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';

export default function NearBySearchScreen({navigation}) {
  return (
    <GradientBackground>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <BackButton navigation={navigation} />
        <BlueSubtitle text1="Hi" text2={`Welcome,`} />
      </View>
      <Card style={styles.card}>
        <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => navigation.navigate('SpotsImages', {isNearby: true})}>
          <Image
            style={styles.image}
            source={require('../../assets/map.png')}
          />
          <CustomButton
            size="lg"
            onPress={() =>
              navigation.navigate('SpotsImages', {isNearby: true})
            }>
            Find Nearby
          </CustomButton>
        </TouchableOpacity>
        <Text style={styles.h2}>Or</Text>
        <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => navigation.navigate('SpotsSearchManually')}>
          <Text style={styles.h2}>Search Manually</Text>
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
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flexDirection: 'column',
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
    marginVertical: 10,
    alignSelf: 'center',
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    paddingBottom: 10,
  },
});
