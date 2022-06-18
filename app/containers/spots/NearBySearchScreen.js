import * as React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from '../../components/Card';
import {View} from 'native-base';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import InsertDetailsCard from '../../components/stepper/InsertDetailsCard';

export default function NearBySearchScreen({navigation}) {
  return (
    <GradientBackground
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      stickyHeader={true}>
      <BackButton
        navigation={navigation}
        style={{width: '20%', marginTop: 15}}
      />
      <BlueSubtitle
        text1="Hi Welcome,"
        text2={`Search Spots`}
        style={{width: '80%', marginBottom: 10}}
      />
      <View style={{flexDirection: 'column', marginBottom: 20, width: '100%'}}>
        <InsertDetailsCard>
          <TouchableOpacity
            style={{marginBottom: 20}}
            onPress={() =>
              navigation.navigate('SpotsImages', {isNearby: true})
            }>
            <Image
              style={styles.image}
              source={require('../../assets/map.png')}
              alt="map"
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
              alt="search"
            />
          </TouchableOpacity>
        </InsertDetailsCard>
      </View>
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
