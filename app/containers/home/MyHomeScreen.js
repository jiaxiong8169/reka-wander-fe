import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {CustomButton} from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyCircleIcon} from '../../components/CircleIcon';
import {preventBack} from '../../utils/navigation-utils';
import GradientBackground from '../../components/GradientBackground';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

const width = Dimensions.get('window').width;

export const MyHomeScreen = ({navigation}) => {
  useEffect(() => {
    preventBack(navigation, 'MyHome');
  }, [navigation]);

  return (
    <GradientBackground fullWidth>
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
      <CustomTextInput
        placeholder="Search attractions, places, etc."
        width="300"
        height="50"
        variant="filled"
        value={''}
        top="175"
        left={width / 2 - 150}
        onChangeText={e => {}}
        startAdornment={
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
          <MyCircleIcon
            text="Car Rental"
            onPress={() => navigation.navigate('CarRentalList')}>
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
          <MyCircleIcon
            text="Homestay"
            onPress={() => {
              navigation.navigate('HomestayEdit');
            }}>
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
          <MyCircleIcon
            text="Food"
            onPress={() => {
              navigation.navigate('SpotsList', {
                type: 'restaurants',
              });
            }}>
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
        <CustomButton
          onPress={() => {
            navigation.navigate('PlannerSteps');
          }}
          style={{
            marginBottom: 20,
          }}>
          PLAN MY TRIP
        </CustomButton>
        <CustomButton
          onPress={() => {
            navigation.navigate('MyTripHistory');
          }}
          colorScheme="secondary">
          VIEW MY TRIP HISTORY
        </CustomButton>
      </View>
    </GradientBackground>
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
