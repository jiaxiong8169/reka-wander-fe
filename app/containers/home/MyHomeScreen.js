import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RoundButton from '../../components/RoundButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Input} from 'native-base';
import {MyCircleIcon} from '../../components/CircleIcon';

const width = Dimensions.get('window').width;

export const MyHomeScreen = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#CFDDFC', 'white', 'white', '#CFDDFC']}
      style={{height: '100%', width: '100%', position: 'relative'}}>
      <ImageBackground
        source={require('../../assets/home_scenery.jpg')}
        style={{
          width: '100%',
          height: 200,
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        <Text style={styles.title}>
          Hi{' '}
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'sans-serif-light',
            }}>
            Welcome,
          </Text>
        </Text>
      </ImageBackground>
      <Input
        placeholder="Search attractions, places, etc."
        width="300"
        height="50"
        borderRadius="10"
        variant="filled"
        fontSize="14"
        value={''}
        top="175"
        left={width / 2 - 150}
        onChangeText={e => {}}
        shadow="3"
        backgroundColor={'#fff'}
        InputLeftElement={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#BDBDBD"
            name="search"
          />
        }
      />
      <View style={styles.container}>
        <Text
          style={{
            color: '#2e2e2e',
            fontWeight: 'bold',
          }}>
          Explore
        </Text>
        <View
          style={{
            marginVertical: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <MyCircleIcon text="Car Rental" onPress={() => navigation.navigate('CarRentalList')}>
            <Image
              source={require('../../assets/car_rental.png')}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
            />
          </MyCircleIcon>
          <MyCircleIcon text="Homestay">
            <Image
              source={require('../../assets/Homestay.png')}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
            />
          </MyCircleIcon>
          <MyCircleIcon text="Food">
            <Image
              source={require('../../assets/Food.png')}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
            />
          </MyCircleIcon>
        </View>
        <RoundButton
          onPress={() => {
            navigation.navigate('Planner_Question');
          }}
          title="PLAN MY TRIP"
          backgroundColor="rgb(117,157,246)"
          style={{
            width: '100%',
            borderRadius: 10,
            backgroundColor: '#3988c4',
          }}
          textStyle={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 200,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontWeight: '300',
    fontSize: 40,
    color: `#fff`,
    marginLeft: 30,
  },
});
