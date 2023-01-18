import React, {useState, useEffect} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, Pressable, ArrowBackIcon, View} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';
import {HomestayExpandableList} from '../../components/ExpandableListView/HomestayContent';
import {CheckInOut} from '../../components/DetailsContent/CheckInOut';
import {LocationName} from '../../components/Location/LocationName';
import {ContactModal} from '../../components/Contact/ContactModal';
import {About} from '../../components/DetailsContent/About';
import {Location} from '../../components/DetailsContent/Location';
import {VendorDetails} from '../../components/DetailsContent/VendorDetails';
import {Parking} from '../../components/DetailsContent/Parking';
import {Facilities} from '../../components/DetailsContent/Facilities';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const HomestayDetailsScreen = ({navigation, route}) => {
  const {
    item,
    checkInDate,
    checkOutDate,
    totalDays,
    adults,
    children,
    guests,
    planner,
  } = route.params;
  const [locationName, setLocationName] = useState('');
  const facilities = {
    outdoors: ['Swimming pool', 'Badminton court', 'Garden', 'BBQ facilities'],
    services: ['Room Service', 'CCTV outside property'],
    general: ['Air Conditioning', 'Fan', 'Safe'],
    bathroom: ['Shampoo', 'Hot water', 'Hair Dryer', 'Towels', 'Toilet paper'],
    bedroom: ['Extra pillows and blankets', 'Linens', 'Hangers', 'Iron'],
    kitchen: ['Electric kettle', 'Refrigerator', 'Stove'],
    internet: ['WIFI'],
    media: ['TV'],
  };
  const footer = () => {
    return (
      <View>
        <Text style={{height: height * 0.2}}>Footer</Text>
      </View>
    );
  };

  return (
    <GradientBackground
      fullWidth={true}
      navigation={navigation}
      // footer={
      //   <View>
      //     <CustomText style={{height: height * 0.09, backgroundColor:'grey'}}>Footer</CustomText>
      //   </View>
      // }
    >
      <View style={styles.container}>
        <Image
          alt="thumbnail"
          style={styles.image}
          source={{uri: item.thumbnailSrc}}
        />
        <View style={styles.textContainer}>
          <View
            style={{
              paddingBottom: 28,
              paddingTop: 4,
            }}>
            <CustomText
              fontSize="3xl"
              style={{
                lineHeight: 35,
                // fontFamily: 'Baloo2-Bold',
              }}>
              {item.name}
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
              }}>
              <Icon
                name="location-outline"
                size={14}
                color="#52525b"
                style={{paddingTop: 3}}
              />
              <LocationName
                lat={item?.loc?.coordinates[1]}
                long={item?.loc?.coordinates[0]}
                value={locationName}
                setValue={setLocationName}
                textViewStyle={{}}
                textStyle={{paddingLeft: 7, fontSize: 14, color: 'grey'}}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              <Icon
                name="pricetag-outline"
                size={14}
                color="#52525b"
                style={{paddingTop: 3}}
              />
              <CustomText fontSize={14} color="grey" style={{paddingLeft: 7}}>
                RM {item.price ? item.price : item.minPrice}
              </CustomText>
            </View>
          </View>

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

          <HomestayExpandableList type={'House Rules'} iconColor={'#52525b'}>
            <CheckInOut
              checkInTime={item.checkInTime}
              checkOutTime={item.checkOutTime}
              additionalRules={item.additionalRules}
              iconColor={'#52525b'}
            />
          </HomestayExpandableList>

          <HomestayExpandableList type={'Parking'} iconColor={'#52525b'}>
            <Parking
              parkingNumber={item.parkingNumber}
              parkingFee={item.parkingFee.toFixed(2)}
              iconColor={'#52525b'}
            />
          </HomestayExpandableList>

          <HomestayExpandableList
            type={'Facilities & Amenities'}
            iconColor={'#52525b'}>
            <View style={{paddingLeft: 15}}>
              <Facilities
                facilities={facilities.general}
                iconName="home"
                title="General"
                styleSubContent={{paddingTop: 25}}
                iconColor={'#52525b'}
              />
              <Facilities
                facilities={facilities.services}
                iconName="room-service"
                title="Services"
                iconColor={'#52525b'}
              />
              <Facilities
                facilities={facilities.outdoors}
                iconName="flower"
                title="Outdoor"
                iconColor={'#52525b'}
              />

              <Facilities
                facilities={facilities.internet}
                iconName="wifi"
                title="Internet"
                iconColor={'#52525b'}
              />
            </View>
          </HomestayExpandableList>

          {planner && (
            <View>
              <CustomButton
                colorScheme="secondary"
                style={{marginTop: 30, marginBottom: 30}}
                onPress={() => navigation.goBack()}>
                Back
              </CustomButton>
            </View>
          )}

          {!planner && (
            <CustomButton
              colorScheme="secondary"
              style={{marginTop: 20}}
              onPress={() => {
                navigation.navigate('HomestaySelectRoom', {
                  id:item.id,
                  item,
                  checkInDate,
                  checkOutDate,
                  totalDays,
                  adults,
                  children,
                  guests,
                  locationName,
                  facilities,
                });
                console.log(typeof(checkInDate));
                console.log(checkOutDate);
              }}>
              Select Rooms
            </CustomButton>
          )}
        </View>
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
    paddingTop: 5,
    paddingLeft: 40,
    marginBotton: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
  },
  productName: {
    alignSelf: 'flex-start',
    maxWidth: width - 210,
  },
  carLeft: {
    height: 30,
    paddingHorizontal: 20,
    marginLeft: 'auto',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
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
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    width: '90%',
    padding: 15,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    justifyContent: 'center',
  },
  commentBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    width: '90%',
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 8,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    position: 'relative',
    height: height * 0.35,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    alignSelf: 'flex-start',
    borderRadius: 5,
    // backgroundColor: 'rgba(69, 69 , 69, 0.7)',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 20,
    backgroundColor: '#dc2626',
    position: 'relative',
    top: -17,
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 9,
  },
});
