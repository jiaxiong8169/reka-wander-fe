import * as React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import Card from '../../components/Card';
import {View} from 'native-base';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';

export default function NearBySearchScreen({navigation}) {
  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1="Hi" text2={`Welcome,`} />
        </View>
      </View>
      <Card style={styles.card}>
        <TouchableOpacity
          style={{minHeight: 150, height: undefined, width: '100%'}}
          onPress={() => navigation.navigate('SpotsImages', {isNearby: true})}>
          <Image
            style={styles.image}
            source={require('../../assets/map.png')}
          />
        </TouchableOpacity>
        <CustomButton
          size="lg"
          onPress={() => navigation.navigate('SpotsImages', {isNearby: true})}>
          Find Nearby
        </CustomButton>

        <Text style={styles.h2}>
          Or {'\n'}
          Search Manually
        </Text>
        <TouchableOpacity
          style={{minHeight: 150, height: undefined, width: '100%'}}
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
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flexDirection: 'column',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    height: '50%',
    marginVertical: 10,
    // width: 100,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    paddingBottom: 10,
  },
});
