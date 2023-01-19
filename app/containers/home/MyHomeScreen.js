import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {CustomButton} from '../../components/CustomButton';
import {preventBack} from '../../utils/navigation-utils';
import GradientBackground from '../../components/GradientBackground';
import {CustomText} from '../../components/texts/custom-text';
import {useAuth} from '../../hooks/useAuth';

export const MyHomeScreen = ({navigation}) => {
  const {authData} = useAuth();
  const call = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${'999'}`;
    } else {
      number = `tel:${'999'}`;
    }
    Linking.openURL(number);
  };

  useEffect(() => {
    preventBack(navigation, 'MyHome');
  }, [navigation]);

  return (
    <GradientBackground fullWidth>
      <ImageBackground
        source={require('../../assets/home_scenery.jpg')}
        style={{
          width: '100%',
          height: 150,
          // justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            height: 85,
            width: 85,
            borderRadius: (85 + 85) / 2,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            right: 30,
            top: 10,
          }}
          onPress={call}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 35,
            }}>
            SOS
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Hi{' '}
          <Text
            style={{
              // fontWeight: 'bold',
              // fontFamily: 'sans-serif-light',
              fontFamily: 'Baloo2-Bold',
              fontSize: 45,
            }}>
            Welcome,
          </Text>
        </Text>
      </ImageBackground>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          paddingHorizontal: 5,
        }}>
        <CustomButton
          onPress={() => {
            navigation.navigate('PlannerSteps');
          }}
          style={{
            marginRight: 10,
            flex: 1,
          }}>
          PLAN MY TRIP
        </CustomButton>
        <CustomButton
          size="sm"
          onPress={() => {
            navigation.navigate('MyTripHistory');
          }}
          colorScheme="secondary"
          style={{
            flex: 1,
          }}
          isDisabled={!authData?.id}>
          VIEW MY TRIP HISTORY
        </CustomButton>
      </View>
      <View style={styles.container}>
        <CustomText
          style={{
            color: '#2e2e2e',
            fontWeight: 'bold',
            marginLeft: 10,
            marginBottom: 10,
          }}
          fontSize="md">
          Explore
        </CustomText>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomestayEdit', {planner: false})}>
          <ImageBackground
            source={require('../../assets/home_homestay.jpg')}
            style={{
              width: '100%',
              height: 120,
              marginVertical: 5,
            }}
            imageStyle={{
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                height: '100%',
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <CustomText
                style={{
                  color: 'white',
                  marginLeft: 20,
                }}
                fontSize="3xl">
                Homestay
              </CustomText>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SpotsList', {
              type: 'restaurants',
            });
          }}>
          <ImageBackground
            source={require('../../assets/home_food.jpg')}
            style={{
              width: '100%',
              height: 120,
              justifyContent: 'center',
              marginVertical: 5,
            }}
            imageStyle={{
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                height: '100%',
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <CustomText
                style={{
                  color: 'white',
                  marginLeft: 20,
                }}
                fontSize="3xl">
                Food
              </CustomText>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CarRentalList', {planner: false})
          }>
          <ImageBackground
            source={require('../../assets/home_car.jpg')}
            style={{
              width: '100%',
              height: 120,
              justifyContent: 'center',
              marginVertical: 5,
            }}
            imageStyle={{
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                height: '100%',
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <CustomText
                style={{
                  color: 'white',
                  marginLeft: 20,
                }}
                fontSize="3xl">
                Car Rental
              </CustomText>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  title: {
    fontWeight: '300',
    fontSize: 45,
    color: `#fff`,
    marginLeft: 14,
    position: 'absolute',
    bottom: 10,
    fontFamily: 'Baloo2-Bold',
  },
});
