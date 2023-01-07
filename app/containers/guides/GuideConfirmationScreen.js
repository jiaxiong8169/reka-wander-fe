import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {View, StyleSheet, TouchableOpacity,} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {useAuth} from '../../hooks/useAuth';
import {useHttpCall} from '../../hooks/useHttpCall';
import {ContactModal} from '../../components/Contact/ContactModal';
import dayjs from 'dayjs';

export const GuideConfirmationScreen = ({navigation, route}) => {
  const {item, selected, startDate, endDate, totalDays} = route.params;
  const [isContactModelPopUp, setIsContactModelPopUp] = useState(false);
  // const [locationName, setLocationName] = useState('');
  // const [startDate, setStartDate] = useState(new Date());
  const [totalPrice, setTotalPrice] = useState(0);
  // const [totalDays, setTotalDays] = React.useState(0);
  const {authData} = useAuth();
  const {postWithAuth} = useHttpCall();
  const selectedItem = [];

  // const closeModel = () => {
  //   setIsModelPopUp(false);
  // };

  useEffect(() => {
  //   if (moment(startDate).isAfter(endDate)) setTotalDays(0);
  //   else {
  //     const diff =
  //       (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  //     setTotalDays(diff + 1);
  //   }
  getTotalPrice()
  });

  const getTotalPrice = () => {
    let curr = 0;
    selected.forEach(s => {
      curr += s.price * totalDays;
    });
    setTotalPrice(curr.toFixed(2));
  };

  const onPressHandler = () => {
    // if not logged in, navigate user to login page
    if (!authData?.id) {
      navigation.navigate('SignInScreen');
      return;
    }
    postWithAuth('reservations', {
      targetId: item.id,
      userId: authData.id,
      type: 'Guide',
      reservedName: item.name,
      totalPrice: totalPrice,
      selectedItems: selectedItem,
      status: 'pending',
      startDate: startDate,
      endDate: endDate,
    })
      .then(() => {
        navigation.navigate('GuideList');
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
    // if (moment(startDate).isAfter(endDate)) {
    //   setIsModelPopUp(true);
    // } else {
    //   postWithAuth('mail/guide-vendor', {
    //     startDate,
    //     endDate,
    //     location: locationName,
    //     totalPrice: getTotalPrice(),
    //     guide: item,
    //     user: authData,
    //     packages: selected,
    //   });
    //   postWithAuth('mail/guide-request', {
    //     startDate,
    //     endDate,
    //     location: locationName,
    //     totalPrice: getTotalPrice(),
    //     guide: item,
    //     user: authData,
    //     packages: selected,
    //   })
    //     .then(() => {
    //       Snackbar.show({
    //         text: 'Your request has been sent to the vendor successfully, please check your mail box for further updates!',
    //         duration: Snackbar.LENGTH_LONG,
    //       });
    //       navigation.navigate('MyHome');
    //     })
    //     .catch(e => {
    //       Snackbar.show({
    //         text: 'Error sending your request, please try again later.',
    //         duration: Snackbar.LENGTH_LONG,
    //       });
    //       console.log(e);
    //     });
    // }
  };

  return (
    <GradientBackground
      stickyHeader={true}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
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
          Tour Guides Details
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
                Start Date:
              </CustomText>
              <CustomText style={{flex: 1, marginLeft: 3}}>
                {dayjs(startDate).format('DD/MM/YYYY')}
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
                End Date:
              </CustomText>
              <CustomText style={{flex: 1, marginLeft: 3}}>
                {dayjs(endDate).format('DD/MM/YYYY')}
              </CustomText>
            </View>
          </View>
        </Card>

        {/* <Card style={{margin: 10}}>
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
        </Card> */}
        <CustomText bold style={styles.title}>
          Packages Selected Details
        </CustomText>
        {/* <CustomText
          bold
          fontSize="lg"
          style={{
            alignSelf: 'center',
          }}>
          Packages Details
        </CustomText> */}

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
                    selectedItem.push({
                      packageId: p.id,
                      packageName: p.name,
                      packageGuideName: p.guideName,
                      packagePrice: p.price,
                    });
                    return (
                      <GuidePackagesSelected
                        id={p.id}
                        key={i}
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

        <CustomText bold style={styles.title}>
          Price Details
        </CustomText>
        <Card style={{margin: 10}}>
          <View style={styles.subContainer}>
            {selected.length > 0 && (
              <View>
                {selected.map((item, i) => {
                  const packageTotalPrice = item.price * totalDays;
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
                        Package {i + 1}
                      </CustomText>
                      <View style={styles.priceText}>
                        <CustomText style={{marginLeft: 3}}>
                          Price per day:
                        </CustomText>
                        <CustomText style={{marginLeft: 3}}>
                          RM {item.price}
                        </CustomText>
                      </View>
                      <View style={styles.priceText}>
                        <CustomText style={{marginLeft: 3}}>
                          Total day(s):
                        </CustomText>
                        <CustomText style={{marginLeft: 3}}>
                          {totalDays} day(s)
                        </CustomText>
                      </View>
                      <View style={styles.priceText}>
                        <CustomText
                          style={{
                            flex: 1,
                            marginLeft: 3,
                            fontWeight: 'bold',
                          }}>
                          Total for this package:
                        </CustomText>
                        <CustomText style={{marginLeft: 3}}>
                          {packageTotalPrice}
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
        {/* <CustomText
          bold
          fontSize="lg"
          style={{
            alignSelf: 'center',
          }}>
          More Details
        </CustomText> */}
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

        {/* <Card style={{margin: 10}}>
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
        </Card> */}
        <Total totalPrice={totalPrice} />

        <CustomButton
          colorScheme="secondary"
          onPress={onPressHandler}
          style={{marginBottom: 40}}>
          {!!authData?.id ? 'Confirm' : 'Log In To Proceed'}
        </CustomButton>
        {/* <Modal
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
        </Modal> */}
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
