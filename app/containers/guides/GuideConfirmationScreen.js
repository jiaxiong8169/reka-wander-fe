import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {View, StyleSheet, Text} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../../components/Card';
import moment from 'moment';
import {LocationName} from '../../components/Location/LocationName';
import {CalendarGuide} from '../../components/CalenderPicker/CalenderGuide';
import {Mail} from '../../components/JumpMail/Mail';
import {Phone} from '../../components/Phone/Phone';
import {Total} from '../../components/Total/Total';
import {GuidePackagesSelected} from './GuideSelectedPackages';
import {resetGuide} from '../../redux/Guides/actions';

export const GuideConfirmationScreen = ({navigation, route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const {packages} = useSelector(state => state.guidesReducer);
  const {guideTotal} = useSelector(state => state.guidesReducer);
  const {guideStartDate} = useSelector(state => state.guidesReducer);
  const {guideEndDate} = useSelector(state => state.guidesReducer);
  const [diff, setDiff] = React.useState(0);
  const closeModel = () => {
    setIsModelPopUp(false);
  };
  React.useEffect(() => {
    const a = moment(guideStartDate);
    const b = moment(guideEndDate);
    const D = b.diff(a, 'days');
    setDiff(D + 1);
  }, [guideStartDate, guideEndDate]);

  const onPressHandler = () => {
    if (moment(guideStartDate).isAfter(guideEndDate)) {
      setIsModelPopUp(true);
    } else {
      dispatch(resetGuide());
      navigation.navigate('SignInScreen');
      const completeData = {
        // ...data,
        // name: item.name,
        // price: item.price,
        // priceWithBaby: item.price,
        // availabilityBeforeRent: item.price,
      };
      try {
        postWithAuth('car-rental/mail', {
          data: completeData,
          vendorEmail: 'nicky.lyy2000@gmail.com',
          // vendorEmail: item.vendorEmail,
        });
        dispatch(resetGuide());
        navigation.navigate('SignInScreen');
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <BackButton navigation={navigation} />
          <View style={{flex: 5}}>
            <Text style={{fontWeight: '500', fontSize: 27, color: '#005533'}}>
              Tour Guide Plan Confirmation
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 18,
            color: '#000',
            flex: 5,
            // marginTop: 10,
            alignSelf: 'center',
            fontWeight: '700',
          }}>
          Dates Details
        </Text>
        <Card style={{margin: 10}}>
          <View>
            <View style={styles.firstColumn}>
              <CalendarGuide mode={'date'} type={'Start'} />
            </View>
            <View style={{flexDirection: 'column', marginTop: 5}}>
              <CalendarGuide mode={'date'} type={'End'} />
            </View>
          </View>
        </Card>

        <Text
          style={{
            fontSize: 18,
            color: '#000',
            flex: 5,
            marginTop: 10,
            alignSelf: 'center',
            fontWeight: '700',
          }}>
          Tour Guide's Plan Details
        </Text>
        <View>
          {packages.length > 0 && (
            <Card style={{margin: 10}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                }}>
                <View>
                  {packages.map((item, i, packages) => {
                    if (i + 1 == packages.length) {
                      return (
                        <GuidePackagesSelected
                          id={item.id}
                          key={item.id}
                          name={item.name}
                          guideName={item.guideName}
                          price={item.price}
                          hours={item.hours}
                        />
                      );
                    } else {
                      return (
                        <GuidePackagesSelected
                          style={{
                            borderBottomColor: '#DCDCDC',
                            borderBottomWidth: 1,
                          }}
                          id={item.id}
                          key={item.id}
                          name={item.name}
                          guideName={item.guideName}
                          hours={item.hours}
                          price={item.price}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            </Card>
          )}
        </View>
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            flex: 5,
            marginTop: 10,
            alignSelf: 'center',
            fontWeight: '700',
          }}>
          More Details
        </Text>
        <Card style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'column',
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <Text style={{fontSize: 15, color: '#000'}}>
              Tour Guide Location
            </Text>
            <LocationName
              lat={item?.loc?.coordinates[1]}
              long={item?.loc?.coordinates[0]}
              type={'guide'}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <Text style={{fontSize: 15, color: '#000', marginTop: 5}}>
              Vendor Name
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon name="person-outline" size={23} color="#000" />
              <View style={{flex: 3, marginLeft: 10}}>
                <Text style={{fontSize: 15, color: '#000'}}>
                  {item.vendorName}
                </Text>
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
            vendorEmail={item.vendorEmail}></Mail>
          <Phone
            type={'Vendor'}
            vendorPhoneNumber={item.vendorPhoneNumber}></Phone>
        </Card>
        <Total totalPrice={guideTotal}></Total>

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
