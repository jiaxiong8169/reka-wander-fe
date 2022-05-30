import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {View, StyleSheet, Text} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../components/Card';
import moment from 'moment';
import {Mail} from '../../components/JumpMail/Mail';
import {Phone} from '../../components/Phone/Phone';
import {Total} from '../../components/Total/Total';
import {GuidePackagesSelected} from './GuideSelectedPackages';
import {SimpleLocationName} from '../../components/Location/SimpleLocationName';
import Snackbar from 'react-native-snackbar';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {CustomText} from '../../components/texts/custom-text';
import {SimpleCalendar} from '../../components/CalenderPicker/SimpleCalendar';

export const GuideConfirmationScreen = ({navigation, route}) => {
  const {item, selected} = route.params;
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalDays, setTotalDays] = React.useState(0);

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  useEffect(() => {
    if (moment(startDate).isAfter(endDate)) setTotalDays(0);
    else {
      const diff =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      setTotalDays(diff + 1);
    }
  }, [startDate, endDate]);

  const getTotalPrice = () => {
    let curr = 0;
    selected.forEach(s => {
      curr += s.price * totalDays;
    });
    return curr.toFixed(2);
  };

  const onPressHandler = () => {
    if (moment(startDate).isAfter(endDate)) {
      setIsModelPopUp(true);
    } else {
      Snackbar.show({
        text: 'Your request has been sent to the vendor successfully, please check your mail box for further updates!',
        duration: Snackbar.LENGTH_LONG,
      });
      navigation.navigate('MyHome');
      // const completeData = {
      //   // ...data,
      //   // name: item.name,
      //   // price: item.price,
      //   // priceWithBaby: item.price,
      //   // availabilityBeforeRent: item.price,
      // };
      // try {
      //   postWithAuth('car-rental/mail', {
      //     data: completeData,
      //     vendorEmail: 'nicky.lyy2000@gmail.com',
      //     // vendorEmail: item.vendorEmail,
      //   });
      //   dispatch(resetGuide());
      //   navigation.navigate('SignInScreen');
      // } catch (e) {
      //   console.log(e);
      // }
    }
  };

  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1={item.name} />
        </View>

        <CustomText
          bold
          fontSize="lg"
          style={{
            alignSelf: 'center',
          }}>
          Date Details
        </CustomText>
        <Card style={{margin: 10}}>
          <View>
            <View style={styles.firstColumn}>
              <SimpleCalendar
                value={startDate}
                setValue={setStartDate}
                label="Start Date"
              />
            </View>
            <View style={{flexDirection: 'column', marginTop: 5}}>
              <SimpleCalendar
                value={endDate}
                setValue={setEndDate}
                label="End Date"
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
          Packages Details
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
                  {selected.map((p, i) => {
                    return (
                      <GuidePackagesSelected
                        id={p.id}
                        key={p.id}
                        name={p.name}
                        guideName={p.guideName}
                        price={p.price}
                        hours={p.hours}
                        style={{
                          borderBottomColor:
                            i === selected.length - 1 ? '#DCDCDC' : '',
                          borderBottomWidth: i === selected.length - 1 ? 1 : 0,
                        }}
                      />
                    );
                  })}
                </View>
              </View>
            </Card>
          )}
        </View>
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
            <CustomText>Tour Guide Location</CustomText>
            <SimpleLocationName
              lat={item?.loc?.coordinates[1]}
              long={item?.loc?.coordinates[0]}
              title="Guide"
              value={locationName}
              setValue={setLocationName}
            />
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
          Confirm
        </CustomButton>
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
            <Text style={{fontSize: 20, marginBottom: 12}}>Opps!</Text>
            <Text>
              Opps your date is invalid, please check your pickup and return
              date. Make sure your pickup date is always after return date.
            </Text>
          </ModelContent>
        </Modal>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  Subtitle: {
    margin: 3,
    fontSize: 17,
    color: `#009B66`,
    fontWeight: '700',
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
  },
  firstColumn: {
    flexDirection: 'column',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});
