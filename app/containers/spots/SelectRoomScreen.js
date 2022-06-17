import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {HomestayRoomCardItem} from '../../components/HomestayRoomCardItem';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';
import moment from 'moment';
import Card from '../../components/Card';
import {SimpleCalendar} from '../../components/CalenderPicker/SimpleCalendar';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';

const height = Dimensions.get('window').height;

export const SelectRoomScreen = ({navigation, route}) => {
  const {item} = route.params;
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [selected, setSelected] = useState([]);
  const [isModelPopUp, setIsModelPopUp] = useState(false);

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  useEffect(() => {
    if (moment(checkInDate).isAfter(checkOutDate)) setTotalDays(0);
    else {
      const diff =
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
      setTotalDays(diff);
    }
  }, [checkInDate, checkOutDate]);

  const getTotalPrice = () => {
    let curr = 0;
    selected.forEach(s => {
      curr += s.price * totalDays * s.quantity;
    });
    return curr.toFixed(2);
  };

  return (
    <GradientBackground
      footer={
        <View
          style={{
            flexDirection: 'row',
            padding: '3%',
            width: '100%',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10,
            shadowOpacity: 0.26,
            elevation: 10,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CustomText fontSize="lg">
            Total Price : RM {getTotalPrice()}
          </CustomText>
          <CustomButton
            size="md"
            colorScheme="secondary"
            onPress={() => {
              if (
                moment(checkInDate).isSame(checkOutDate) ||
                moment(checkInDate).isAfter(checkOutDate)
              ) {
                setIsModelPopUp(true);
              } else {
                // check total price
                if (getTotalPrice() <= 0) {
                  Alert.alert('You must select at least a room!');
                  return;
                }
                navigation.navigate('HotelConfirmation', {
                  item,
                  checkInDate: moment(checkInDate).format('DD/MM/YYYY'),
                  checkOutDate: moment(checkOutDate).format('DD/MM/YYYY'),
                  totalDays,
                  totalPrice: getTotalPrice(),
                  selected,
                });
              }
            }}>
            Book Rooms
          </CustomButton>
        </View>
      }>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: '3%', width: '90%'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1={item?.name} />
        </View>
        <Card style={{marginBottom: 25}}>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 5,
              justifyContent: 'center',
            }}>
            <SimpleCalendar
              value={checkInDate}
              setValue={setCheckInDate}
              label="Check In Date"
            />
            <SimpleCalendar
              value={checkOutDate}
              setValue={setCheckOutDate}
              label="Check Out Date"
            />
          </View>
        </Card>

        {item?.rooms.map(room => (
          <HomestayRoomCardItem
            key={room.id}
            id={room.id}
            name={room.name}
            price={room.price}
            pax={room.pax}
            availability={room.availability}
            thumbnailSrc={room.thumnailSrc}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
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
              Your check in and check out dates are invalid. Please make sure
              that the check out date is after check in date.
            </CustomText>
          </ModelContent>
        </Modal>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    position: 'relative',
    height: height * 0.35,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    tintColor: 'gray',
  },
  iconText: {
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    alignSelf: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'rgba(69, 69 , 69, 0.7)',
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
  centerElement: {justifyContent: 'center', alignItems: 'center'},
});
