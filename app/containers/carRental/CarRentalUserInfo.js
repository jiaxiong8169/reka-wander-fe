import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {useHttpCall} from '../../hooks/useHttpCall';
import {BackButton} from '../../components/BackButton';
import moment from 'moment';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Phone} from '../../components/Phone/Phone';
import {Mail} from '../../components/JumpMail/Mail';
import {CustomButton} from '../../components/CustomButton';
import {useAuth} from '../../hooks/useAuth';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {SimpleCalendar} from '../../components/CalenderPicker/SimpleCalendar';
import {SimpleCalendarTime} from '../../components/CalenderPicker/SimpleCalendarTime';
import {SimpleLocationName} from '../../components/Location/SimpleLocationName';
import {Total} from '../../components/Total/Total';
import {CustomText} from '../../components/texts/custom-text';
import GradientBackground from '../../components/GradientBackground';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import {ContactModal} from '../../components/Contact/ContactModal';
import ModelContent from '../../components/Modal/ModalContent';

export default function UserCarRentalInfo({navigation, route}) {
  const {authData} = useAuth();
  const {item, pickUpDate, returnDate, totalDays, locationName} = route.params;
  const {postWithAuth} = useHttpCall();
  const [totalPrice, setTotalPrice] = useState(0);
  const [days, setDays] = useState(0);
  const [isContactModelPopUp, setIsContactModelPopUp] = useState(false);

  useEffect(() => {
    setDays(totalDays);
    if (pickUpDate == returnDate) setDays(1);
    setTotalPrice((item.price * days).toFixed(2));
  });

  const onPressHandler = () => {
    // if not logged in, navigate user to login page
    if (!authData?.id) {
      navigation.navigate('SignInScreen');
      return;
    }
    postWithAuth('mail/car-vendor', {
      pickUpDate,
      returnDate,
      carLocation: locationName,
      totalPrice: totalPrice,
      vehicle: item,
      user: authData,
    });
    postWithAuth('mail/car-request', {
      pickUpDate,
      returnDate,
      carLocation: locationName,
      totalPrice: totalPrice,
      vehicle: item,
      user: authData,
    })
      .then(() => {
        Snackbar.show({
          text: 'Your request has been sent to the vendor successfully, please check your mail box for further updates!',
          duration: Snackbar.LENGTH_LONG,
        });
        navigation.navigate('MyHome');
      })
      .catch(e => {
        Snackbar.show({
          text: 'Error sending your request, please try again later.',
          duration: Snackbar.LENGTH_LONG,
        });
        console.log(e);
      });
  };

  return (
    <GradientBackground
      stickyHeader={true}
      contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
      <BackButton navigation={navigation} style={{width: '20%'}} />
      <BlueSubtitle
        text1={item.name}
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
          <View
            style={{
              paddingBottom: 10,
              paddingTop: 4,
              marginLeft: 12,
            }}>
            <CustomText style={styles.tripSubTitle}>Dates</CustomText>
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 10,
                paddingBottom: 5,
              }}>
              <Icon name="calendar-today" size={19} color="#000"></Icon>
              <CustomText style={{flex: 1, marginLeft: 3}}>
                Pickup Date:
              </CustomText>
              <CustomText style={{flex: 1, marginLeft: 3}}>
                {pickUpDate}
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
                Return Date:
              </CustomText>
              <CustomText style={{flex: 1, marginLeft: 3}}>
                {returnDate}
              </CustomText>
            </View>
          </View>
        </Card>

        <CustomText bold style={styles.title}>
          Rooms Selected Details
        </CustomText>
        <Card style={{margin: 10}}>
          <View style={{flexDirection: 'row', width: '100%',padding:10, }}>
            <View style={{flex: 2}}>
              <Image
                style={{
                  flex: 1,
                  // width: '100%',
                  resizeMode: 'contain',
                }}
                source={{uri: item.thumbnailSrc}}
                alt="room"
              />
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: 'column',
                marginLeft: 3,
                paddingLeft: 10,
              }}>
              <View>
                <Text style={{fontSize: 15, color: '#000', fontWeight: 'bold'}}>
                  {item.name}
                </Text>
              </View>
              <View style={{flexDirection: 'row', paddingTop: 10}}>
                <Text style={{flex: 1}}>Price per day: </Text>
                <Text>RM {item.price}</Text>
              </View>
            </View>
          </View>
        </Card>

        <CustomText bold style={styles.title}>
          Price Details
        </CustomText>
        <Card style={{margin: 10}}>
        <View style={styles.subContainer}>
            <CustomText
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '500',
                paddingBottom: 15,
                paddingTop: 5,
              }}>
              {item.name}
            </CustomText>
            <View style={styles.priceText}>
              <CustomText style={{marginLeft: 3}}>Price per day:</CustomText>
              <CustomText style={{marginLeft: 3}}>RM {item.price}</CustomText>
            </View>
            <View style={styles.priceText}>
              <CustomText style={{marginLeft: 3}}>
                Total day(s) selected:
              </CustomText>
              <CustomText style={{marginLeft: 3}}>{days} day(s)</CustomText>
            </View>
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
}

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
