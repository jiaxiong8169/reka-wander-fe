import React, {useState, useEffect} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, Pressable, ArrowBackIcon, View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';
import {HomestayExpandableList} from '../../components/ExpandableListView/HomestayContent';
import {Facilities} from '../../components/DetailsContent/Facilities';
import {CheckInOut} from '../../components/DetailsContent/CheckInOut';
import {LocationName} from '../../components/Location/LocationName';
import {ContactModal} from '../../components/Contact/ContactModal';
import {About} from '../../components/DetailsContent/About';
import {Location} from '../../components/DetailsContent/Location';
import {VendorDetails} from '../../components/DetailsContent/VendorDetails';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const HotelRoomDetailsScreen = ({navigation, route}) => {
  const {id, room, thumbnailSrc, locationName, facilities, bedType, price} =
    route.params;
  const singleBed = bedType.singleBed;
  const superSingleBed = bedType.superSingleBed;
  const queenBed = bedType.queenBed;
  const kingBed = bedType.queenBed;
  const sofaBed = bedType.sofaBed;

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
          source={{uri: thumbnailSrc}}
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
              {room.name}
            </CustomText>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
              }}>
              <Icon
                name="map-marker"
                size={14}
                color="#52525b"
                style={{paddingTop: 3}}
              />
              <CustomText fontSize={14} style={{paddingLeft: 7}}>
                {locationName}
              </CustomText>
            </View>
          </View>

          <View
            style={{
              borderColor: 'grey',
              borderBottomWidth: 1,
              paddingBottom: 25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingBottom: 6,
              }}>
              <View
                style={{
                  borderLeftColor: '#4169e1',
                  borderLeftWidth: 5,
                  borderRadius: 4,
                }}>
                <CustomText
                  fontSize="2xl"
                  style={{lineHeight: 35, paddingLeft: 13}}>
                  General Information
                </CustomText>
              </View>
            </View>
            <View style={{paddingLeft: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 15,
                  paddingBottom: 5,
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Icon name="bunk-bed" size={23} />
                <CustomText
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '500',
                    marginLeft: 12,
                  }}>
                  Bed Type
                </CustomText>
              </View>
              {singleBed > 0 && (
                <View>
                  <CustomText style={{marginLeft: 35, paddingBottom: 20}}>
                    Single Bed : {singleBed}
                  </CustomText>
                </View>
              )}
              {superSingleBed > 0 && (
                <View>
                  <CustomText style={{marginLeft: 35, paddingBottom: 20}}>
                    Super Single Bed : {superSingleBed}
                  </CustomText>
                </View>
              )}
              {queenBed > 0 && (
                <View>
                  <CustomText style={{marginLeft: 35, paddingBottom: 20}}>
                    Queen Bed : {queenBed}
                  </CustomText>
                </View>
              )}
              {kingBed > 0 && (
                <View>
                  <CustomText style={{marginLeft: 35, paddingBottom: 20}}>
                    King Bed : {kingBed}
                  </CustomText>
                </View>
              )}
              {sofaBed > 0 && (
                <View>
                  <CustomText style={{marginLeft: 35, paddingBottom: 20}}>
                    Sofa Bed : {sofaBed}
                  </CustomText>
                </View>
              )}
              {/* {bedType.map((value,index) => (
                <View key={index}>
                <CustomText style={{marginLeft: 35, paddingBottom: 20}}>
                  {value}
                </CustomText>
                </View>
              ))} */}

              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 15,
                  paddingBottom: 5,
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Icon name="tag" size={23} />
                <CustomText
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '500',
                    //
                    marginLeft: 12,
                  }}>
                  Price
                </CustomText>
              </View>
              <CustomText style={{marginLeft: 35, paddingBottom: 20}}>
                RM{price} per night
              </CustomText>

              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 15,
                  paddingBottom: 5,
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Icon name="account-multiple" size={23} />
                <CustomText
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '500',
                    marginLeft: 12,
                  }}>
                  Number of Guests
                </CustomText>
              </View>
              <CustomText style={{marginLeft: 35, paddingBottom: 20}}>
                {room.pax} pax
              </CustomText>
            </View>
          </View>

          <View
            style={{
              // borderColor: 'grey',
              // borderBottomWidth: 1,
              paddingBottom: 25,
              paddingTop: 25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingBottom: 6,
              }}>
              <View
                style={{
                  borderLeftColor: '#4169e1',
                  borderLeftWidth: 5,
                  borderRadius: 4,
                }}>
                <CustomText
                  fontSize="2xl"
                  style={{lineHeight: 35, paddingLeft: 13}}>
                  Amenities
                </CustomText>
              </View>
            </View>
            <View style={{paddingLeft: 15}}>
              <Facilities
                facilities={facilities.bedroom}
                iconName="bed"
                title="Bedroom"
                style={{paddingTop: 15}}
              />
              <Facilities
                facilities={facilities.bathroom}
                iconName="shower"
                title="Bathroom"
              />
              <Facilities
                facilities={facilities.kitchen}
                iconName="stove"
                title="Kitchen"
              />
              <Facilities
                facilities={facilities.media}
                iconName="television"
                title="Entertaiment"
              />
            </View>
          </View>

          <CustomButton
            colorScheme="secondary"
            style={{marginTop: 20}}
            onPress={() => navigation.goBack()}>
            Back to Select Room
          </CustomButton>
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
