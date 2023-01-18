import React, {useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../components/Card';
import {Mail} from '../../components/JumpMail/Mail';
import {Phone} from '../../components/Phone/Phone';
import {Total} from '../../components/Total/Total';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {CustomText} from '../../components/texts/custom-text';
import {SimpleLocationName} from '../../components/Location/SimpleLocationName';
import Snackbar from 'react-native-snackbar';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
import {RoomsSelected} from '../homestays/HomestayRoomSelected';
import {ContactModal} from '../../components/Contact/ContactModal';
import { ControlledPropUpdatedSelectedItem } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import dayjs from 'dayjs';


export const HotelConfirmationScreen = ({navigation, route}) => {
  const {
    item,
    checkInDate,
    checkOutDate,
    totalDays,
    adults,
    children,
    guests,
    totalPrice,
    selected,
  } = route.params;
  const {authData} = useAuth();
  const [isContactModelPopUp, setIsContactModelPopUp] = useState(false);
  const {postWithAuth} = useHttpCall();
  const selectedItem = [];

  const onPressHandler = () => {
    // if not logged in, navigate user to login page
    if (!authData?.id) {
      navigation.navigate('SignInScreen');
      return;
    }{
      selected.map((s, i) => {
        for (let i = 0; i < s.quantity; i++) {
          postWithAuth('reservations', {
            targetId: item.id,
            userId: authData.id,
            type: 'Hotel',
            reservedName: item.name,
            totalPrice: totalPrice,
            roomId: s.id,
            status: 'pending',
            startDate: checkInDate,
            endDate: checkOutDate,
          })
            .then(() => {
              navigation.navigate('SpotsHome');
            })
            .catch(err => {
              console.log(JSON.stringify(err));
            });
        }

        // selectedItem.push({
        //   roomId: item.id,
        //   roomName: item.name,
        //   roomQuantity: item.quantity,
        //   roomPrice: item.price,
        // });
      });
    }

    // postWithAuth('mail/hotel-vendor', {
    //   checkInDate,
    //   checkOutDate,
    //   location: locationName,
    //   totalPrice: totalPrice,
    //   hotel: item,
    //   user: authData,
    //   rooms: selected,
    // });
    // postWithAuth('mail/hotel-request', {
    //   checkInDate,
    //   checkOutDate,
    //   location: locationName,
    //   totalPrice: totalPrice,
    //   hotel: item,
    //   user: authData,
    // })
    //   .then(() => {
    //     Snackbar.show({
    //       text: 'Your request has been sent to the vendor successfully, please check your mail box for further updates!',
    //       duration: Snackbar.LENGTH_LONG,
    //     });
    //     navigation.navigate('MyHome');
    //   })
    //   .catch(e => {
    //     Snackbar.show({
    //       text: 'Error sending your request, please try again later.',
    //       duration: Snackbar.LENGTH_LONG,
    //     });
    //     console.log(e);
    //   });
  };

  return (
    <GradientBackground
    contentContainerStyle={{
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
    stickyHeader={true}>
    <BackButton navigation={navigation} style={{width: '20%'}} />
    <BlueSubtitle
      text1="Confirm booking"
      style={{width: '80%', marginBottom: 10}}
    />
    <View style={{flexDirection: 'column', marginBottom: 10, width: '100%'}}>
      <CustomText
        bold
        style={{
          alignSelf: 'center',
          fontSize: 24,
          paddingVertical: 10,
          color: '#4169e1',
        }}>
        Trip Details
      </CustomText>
      <Card style={{margin: 10}}>
        <View style={styles.subContainer}>
          <CustomText style={styles.tripSubTitle}>Dates</CustomText>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              paddingBottom: 5,
            }}>
            <Icon name="calendar-today" size={19} color="#000"></Icon>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              Check In Date:
            </CustomText>
            <CustomText style={{flex: 1, marginLeft: 3}}>
            {dayjs(checkInDate).format('DD/MM/YYYY')}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
              paddingLeft: 10,
              paddingBottom: 10,
            }}>
            <Icon name="calendar" size={19} color="#000"></Icon>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              Check Out Date:
            </CustomText>
            <CustomText style={{flex: 1, marginLeft: 3}}>
            {dayjs(checkOutDate).format('DD/MM/YYYY')}
            </CustomText>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 10,
            marginLeft: 12,
          }}>
          <CustomText style={styles.tripSubTitle}>Guests</CustomText>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10,
              paddingBottom: 10,
            }}>
            <Icon name="human-male" size={19} color="#000"></Icon>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              Adult(s):
            </CustomText>
            <CustomText style={{flex: 1, marginLeft: 3}}>{adults}</CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
              paddingLeft: 10,
            }}>
            <Icon name="human-male-child" size={19} color="#000"></Icon>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              Children:
            </CustomText>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              {children.length}
            </CustomText>
          </View>

          <View style={{paddingBottom: 10}}>
            {children.map((child, i) => (
              <View
                key={i}
                id={i}
                style={{
                  flexDirection: 'row',
                  paddingTop: 5,
                  paddingLeft: 10,
                }}>
                <Icon name="teddy-bear" size={19} color="#000"></Icon>
                <CustomText style={{flex: 1, marginLeft: 3}}>
                  Child {i + 1}:
                </CustomText>
                <CustomText style={{flex: 1, marginLeft: 3}}>
                  {child.ageOfChild} years old
                </CustomText>
              </View>
            ))}
          </View>
        </View>
      </Card>

      <CustomText bold style={styles.title}>
        Rooms Selected Details
      </CustomText>
      <View>
        {selected.length > 0 && (
          <Card style={{margin: 10}}>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
              }}>
              <View>
                {selected.map((item, i) => {
                  return (
                    <RoomsSelected
                      id={item.id}
                      key={i}
                      name={item.name}
                      url={item.thumbnailSrc}
                      price={item.price}
                      quantity={item.quantity}
                      style={{
                        borderBottomColor:
                          i !== selected.length - 1 ? '#DCDCDC' : '',
                        borderBottomWidth: i !== selected.length - 1 ? 1 : 0,
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </Card>
        )}
      </View>

      <CustomText bold style={styles.title}>
        Price Details
      </CustomText>
      <Card style={{margin: 10}}>
        <View style={styles.subContainer}>
          {selected.length > 0 && (
            <View>
              {selected.map((item, i) => {
                const roomTotalPrice = item.price * totalDays * item.quantity;
                selectedItem.push({
                  roomId: item.id,
                  roomName: item.name,
                  roomQuantity: item.quantity,
                  roomPrice: item.price,
                });
                return (
                  <View key={i}>
                    <CustomText
                      style={{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: '500',
                        paddingBottom: 15,
                        paddingTop: 5,
                      }}>
                      Room {i + 1}
                    </CustomText>
                    <View style={styles.priceText}>
                      <CustomText style={{marginLeft: 3}}>
                        Price per night:
                      </CustomText>
                      <CustomText style={{marginLeft: 3}}>
                        RM {item.price}
                      </CustomText>
                    </View>
                    <View style={styles.priceText}>
                      <CustomText style={{marginLeft: 3}}>
                        Quantity selected for this room:
                      </CustomText>
                      <CustomText style={{marginLeft: 3}}>
                        {item.quantity}
                      </CustomText>
                    </View>
                    <View style={styles.priceText}>
                      <CustomText style={{marginLeft: 3}}>
                        Total night(s):
                      </CustomText>
                      <CustomText style={{marginLeft: 3}}>
                        {totalDays} night(s)
                      </CustomText>
                    </View>
                    <View style={styles.priceText}>
                      <CustomText
                        style={{
                          flex: 1,
                          marginLeft: 3,
                          fontWeight: 'bold',
                        }}>
                        Total for this room:
                      </CustomText>
                      <CustomText style={{marginLeft: 3}}>
                        {roomTotalPrice}
                      </CustomText>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 12,
            paddingVertical: 15,
            paddingRight: 30,
            justifyContent: 'space-between',
          }}>
          <CustomText
            style={{
              fontSize: 18,
              color: '#af002a',
              fontWeight: '500',
              paddingLeft: 10,
              paddingTop: 5,
            }}>
            Total:
          </CustomText>
          <CustomText
            style={{
              fontSize: 18,
              color: '#af002a',
              fontWeight: 'bold',
              paddingLeft: 10,
              paddingTop: 5,
            }}>
            RM {totalPrice}
          </CustomText>
        </View>
      </Card>

      <CustomText bold style={styles.title}>
        Vendor Details
      </CustomText>
      <Card style={{margin: 10}}>
        <View
          style={{
            paddingBottom: 10,
            paddingTop: 4,
            marginLeft: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              alignItems: 'center',
            }}>
            <Icon name="human-greeting" size={23} color="#000" />
            <CustomText
              style={{
                color: 'black',
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Name:{' '}
            </CustomText>
            <View style={{flex: 3, marginLeft: 10}}>
              <CustomText>{item.vendorName}</CustomText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <Icon name="email" size={23} color="#000" />
            <CustomText
              style={{
                paddingLeft: 5,
                color: 'black',
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Email:{' '}
            </CustomText>
            <View style={{flex: 3, marginLeft: 10}}>
              <CustomText>{item.vendorEmail}</CustomText>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <Icon name="phone" size={23} color="#000" />
            <CustomText
              style={{
                paddingLeft: 5,
                color: 'black',
                fontWeight: '500',
                paddingLeft: 5,
              }}>
              Phone:{' '}
            </CustomText>
            <View style={{flex: 3, marginLeft: 10}}>
              <CustomText>{item.vendorPhoneNumber}</CustomText>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              height: 40,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => {
              setIsContactModelPopUp(current => !current);
            }}>
            <CustomText style={{color: 'black', fontWeight: '400'}}>
              Contact Vendor
            </CustomText>
            <ContactModal
              vendorEmail={item.vendorEmail}
              vendorPhoneNumber={item.vendorPhoneNumber}
              isContactModelPopUp={isContactModelPopUp}
              setIsContactModelPopUp={setIsContactModelPopUp}
            />
          </TouchableOpacity>
        </View>
      </Card>
      <Total totalPrice={totalPrice} />

      <CustomButton
        colorScheme="secondary"
        onPress={onPressHandler}
        style={{marginBottom: 40}}>
        {!!authData?.id ? 'Confirm' : 'Log In To Proceed'}
      </CustomButton>
    </View>
  </GradientBackground>
  );
};


const styles = StyleSheet.create({
  subContainer: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 4,
    marginLeft: 12,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    paddingTop: 30,
    paddingBottom: 15,
    color: '#4169e1',
  },
  tripSubTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    paddingBottom: 15,
    paddingTop: 5,
  },
  priceText: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 5,
    paddingRight: 30,
    justifyContent: 'space-between',
  },
});
