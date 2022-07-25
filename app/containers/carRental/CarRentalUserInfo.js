import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useHttpCall} from '../../hooks/useHttpCall';
import {BackButton} from '../../components/BackButton';
import moment from 'moment';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
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
import ModelContent from '../../components/Modal/ModalContent';

export default function UserCarRentalInfo({navigation, route}) {
  const {authData} = useAuth();
  const {item} = route.params;
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const {postWithAuth} = useHttpCall();
  const [totalDays, setTotalDays] = React.useState(0);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    if (moment(pickUpDate).isAfter(returnDate)) setTotalDays(0);
    else {
      const diff =
        (returnDate.getTime() - pickUpDate.getTime()) / (1000 * 3600 * 24);
      setTotalDays(diff + 1);
    }
  }, [pickUpDate, returnDate]);

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  const getTotalPrice = () => {
    const curr = item.price * totalDays;
    return curr.toFixed(2);
  };

  const onPressHandler = () => {
    // if not logged in, navigate user to login page
    if (!authData?.id) {
      navigation.navigate('SignInScreen');
      return;
    }
    if (moment(pickUpDate).isAfter(returnDate)) {
      setIsModelPopUp(true);
    } else {
      postWithAuth('mail/car-vendor', {
        pickUpDate,
        returnDate,
        carLocation: locationName,
        totalPrice: getTotalPrice(),
        vehicle: item,
        user: authData,
      });
      postWithAuth('mail/car-request', {
        pickUpDate,
        returnDate,
        carLocation: locationName,
        totalPrice: getTotalPrice(),
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
    }
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
      <View style={{flexDirection: 'column', width: '100%'}}>
        <CustomText
          bold
          fontSize="lg"
          style={{
            alignSelf: 'center',
          }}>
          Pickup Details
        </CustomText>
        <Card style={{margin: 10}}>
          <SimpleCalendar
            value={pickUpDate}
            setValue={setPickUpDate}
            label="Pick Up Date"
          />
          <SimpleCalendarTime
            value={pickUpDate}
            setValue={setPickUpDate}
            label="Pick Up Time"
          />
        </Card>

        <CustomText
          bold
          fontSize="lg"
          style={{
            alignSelf: 'center',
          }}>
          Return Details
        </CustomText>
        <Card style={{margin: 10}}>
          <View>
            <View>
              <SimpleCalendar
                value={returnDate}
                setValue={setReturnDate}
                label="Return Date"
              />
            </View>
            <View style={{flexDirection: 'column', marginTop: 5}}>
              <SimpleCalendarTime
                value={returnDate}
                setValue={setReturnDate}
                label="Return Time"
              />
            </View>
          </View>
        </Card>

        <CustomText
          bold
          fontSize="lg"
          style={{
            alignSelf: 'center',
          }}>
          More Details
        </CustomText>
        <Card style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <CustomText>Car Location</CustomText>
            <SimpleLocationName
              lat={item?.loc?.coordinates[1]}
              long={item?.loc?.coordinates[0]}
              value={locationName}
              setValue={setLocationName}
              title="Car Rental"
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <CustomText>Price</CustomText>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon name="cash-outline" size={23} color="#000" />
              <View style={{flex: 3, marginLeft: 10}}>
                <CustomText>RM {item.price} per day</CustomText>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <CustomText>Vendor Name</CustomText>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon name="person-outline" size={23} color="#000" />
              <View style={{flex: 3, marginLeft: 10}}>
                <CustomText>{item.vendorName}</CustomText>
              </View>
            </View>
          </View>
          <Mail
            type={'Vendor'}
            firstColumn={{
              flexDirection: 'column',
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}
            vendorEmail={item.vendorEmail}
          />
          <Phone type={'Vendor'} vendorPhoneNumber={item.vendorPhoneNumber} />
        </Card>

        <Total totalPrice={getTotalPrice()} />
        <CustomButton
          colorScheme="secondary"
          onPress={onPressHandler}
          style={{marginBottom: 40}}>
          {!!authData?.id ? 'Confirm' : 'Log In To Proceed'}
        </CustomButton>
      </View>
      <Modal
        isVisible={isModelPopUp}
        onBackdropPress={closeModel}
        onSwipeComplete={closeModel}
        useNativeDriverForBackdrop
        swipeDirection={['left', 'right', 'up', 'down']}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={700}
        animationOutTiming={700}
        backdropTransitionInTiming={700}
        backdropTransitionOutTiming={700}>
        <ModelContent onPress={closeModel} buttonTitle={'Close'}>
          <CustomText fontSize="lg" style={{marginBottom: 12}}>
            Invalid Date
          </CustomText>
          <CustomText>
            Your pick up and return dates are invalid. Please make sure that the
            return date is after pick up date.
          </CustomText>
        </ModelContent>
      </Modal>
    </GradientBackground>
  );
}
