import React, {useState, useEffect} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {ZStack, Center, Box} from 'native-base';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Container} from '../../components/DetailsContent/container';
import {About} from '../../components/DetailsContent/About';
import {Location} from '../../components/DetailsContent/Location';
import {LocationName} from '../../components/Location/LocationName';
import {VendorDetails} from '../../components/DetailsContent/VendorDetails';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const CarRentalDetailsScreen = ({navigation, route}) => {
  const {item, pickUpDate, returnDate, totalDays, planner} = route.params;
  const [locationName, setLocationName] = useState('');

  const onPressHandlerRent = () => {
    navigation.navigate('CarRentalUserInfo', {
      item,
      pickUpDate,
      returnDate,
      totalDays,
      locationName,
    });
  };

  return (
    <GradientBackground fullWidth={true} stickyHeader={true}>
      <View style={{alignItems: 'flex-start'}}>
        <BackButton navigation={navigation} />
      </View>
      <View style={styles.containerProducts}>
        <Box>
          <CustomText bold fontSize="3xl" style={{color: '#4169e1'}}>
            {item.name}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="tag"
              size={14}
              // color="#4169e1"
              style={{paddingTop: 3}}
            />
            <CustomText style={{paddingLeft: 7}}>
              RM {item.price}/day
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="map-marker"
              size={15}
              // color="#4169e1"
            />
            <LocationName
              lat={item?.loc?.coordinates[1]}
              long={item?.loc?.coordinates[0]}
              value={locationName}
              setValue={setLocationName}
              textViewStyle={{}}
              textStyle={{
                paddingLeft: 7,
                fontSize: 14,
                // color: 'black',
                // fontWeight: 'bold',
              }}
            />
          </View>
        </Box>

        <View style={styles.carLeft}>
          <CustomText bold color={'gray.500'}>
            {item.availability} cars left
          </CustomText>
        </View>
      </View>
      <Center>
        <ZStack
          alignItems="center"
          justifyContent="center"
          style={{marginTop: 120, marginBottom: 120}}>
          <View style={styles.semiEllipse}></View>
          <Image
            style={{
              width: 350,
              height: 220,
              resizeMode: 'contain',
            }}
            alt="thumbnail"
            source={{
              uri: item.thumbnailSrc,
            }}
          />
        </ZStack>
      </Center>
      <View style={{paddingHorizontal: 20}}>
        <About
          seeMoreStyle={{color: 'black'}}
          seeLessStyle={{color: 'black'}}
          description={item.description}
          styleContainer={{paddingTop: 0}}
        />

        <Location
          lat={item?.loc?.coordinates[1]}
          long={item?.loc?.coordinates[0]}
          locationName={locationName}
          iconColor={'black'}
        />
        <VendorDetails
          vendorName={item.vendorName}
          vendorEmail={item.vendorEmail}
          vendorPhoneNumber={item.vendorPhoneNumber}
          iconColor={'#52525b'}
        />

        <Container borderColor={'#4169e1'} title={'General Information'}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 25,
                paddingBottom: 5,
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Icon name="car" size={23} color="#52525b" />
              <CustomText
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: '500',
                  marginLeft: 12,
                }}>
                Transmission
              </CustomText>
            </View>
            <CustomText
              style={{marginLeft: 35, paddingBottom: 20, fontSize: 15}}>
              {item.transmission}
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 5,
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Icon name="seat-passenger" size={23} color="#52525b" />
              <CustomText
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: '500',
                  marginLeft: 12,
                }}>
                Seat Number
              </CustomText>
            </View>
            <CustomText
              style={{marginLeft: 35, paddingBottom: 20, fontSize: 15}}>
              {item.seatNumber} seats
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 5,
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Icon name="car-hatchback" size={23} color="#52525b" />
              <CustomText
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: '500',
                  marginLeft: 12,
                }}>
                Car Type
              </CustomText>
            </View>
            <CustomText
              style={{marginLeft: 35, paddingBottom: 20, fontSize: 15}}>
              {item.type}
            </CustomText>
          </View>
        </Container>

        <Container
          styleView={{borderBottomWidth: 0, paddingBottom: 10}}
          borderColor={'#4169e1'}
          title={'Additional Rules'}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 25,
              paddingBottom: 5,
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Icon name="file-document" size={23} color="#52525b" />
            <CustomText
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '500',
                marginLeft: 12,
              }}>
              Car Rules
            </CustomText>
          </View>
          {item.additionalRules.map((value,index) => (
            <View key={index}>
              <CustomText style={{fontSize: 15, marginLeft: 35}}>
                -{'   '}
                {value}
              </CustomText>
            </View>
          ))}
        </Container>

        {planner && (
          <View>
            <CustomButton
              colorScheme="secondary"
              
              
              onPress={() => navigation.goBack()}>
              Back
            </CustomButton>
          </View>
        )}

        {!planner && (
          <CustomButton
            style={{marginTop: 30, marginBottom: 30}}
            colorScheme="secondary"
            onPress={onPressHandlerRent}>
            Rent
          </CustomButton>
        )}

      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  semiEllipse: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 300,
    transform: [{scaleX: 1.8}],
  },
  containerProducts: {
    marginTop: 10,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  carLeft: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
  },
  whatsapp: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
});
