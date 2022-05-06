import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import {BackButton} from '../../components/BackButton';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Card from '../../components/Card';
import {CalendarCar} from '../../components/CalenderPicker/CalenderCar';
import {LocationName} from '../../components/Location/LocationName';
import Icon from 'react-native-vector-icons/Ionicons';
import {GetTotal} from '../../components/Total/GetTotal';
import {Phone} from '../../components/Phone/Phone';
import {Mail} from '../../components/JumpMail/Mail';
import RoundButton from '../../components/RoundButton';

export default function UserCarRentalInfo({navigation, route}) {
  const {id} = route.params;
  const {pickUpDate, returnDate} = useSelector(state => state.carReducer);
  const data = useSelector(state => state.carReducer);
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [item, setItem] = useState([]);
  const {getWithoutAuth, postWithAuth} = useHttpCall();
  const [diff, setDiff] = React.useState(0);

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  // on load, get vehicle data
  React.useEffect(() => {
    // try to fetch the data
    getWithoutAuth(`vehicles/${id}`)
      .then(({data}) => {
        if (!!data) {
          setItem(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const a = moment(pickUpDate);
    const b = moment(returnDate);
    const D = b.diff(a, 'days');
    setDiff(D + 1);
  }, [pickUpDate, returnDate]);

  const onPressHandler = () => {
    if (moment(pickUpDate).isAfter(returnDate)) {
      const completeData = {
        ...data,
        name: item.name,
        price: item.price,
        priceWithBaby: item.priceWithBaby,
        availabilityBeforeRent: item.availability,
      };
      try {
        postWithAuth(
          'car-rental/mail',
          {
            data: completeData,
            // vendorEmail: item.vendorEmail,
            vendorEmail: 'autumnlewjb@gmail.com',
          },
          () => {
            navigation.navigate('SignInScreen');
          },
        );
      } catch (e) {
        console.log(e);
      }
      setIsModelPopUp(true);
    }
  };

  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          {/* <Text style={{fontWeight: '500', fontSize: 28, color: '#005533'}}>
            {item.name}
          </Text> */}
        </View>
        <Text color="rgb(117,157,246)">
          Fill in all fields to book{' '}
          <Text style={{fontWeight: '500', fontSize: 20, color: '#005533'}}>
            {item.name}
          </Text>
        </Text>
      </View>

      <Text style={styles.Subtitle}>Pickup Details</Text>
      <Card style={{margin: 10}}>
        <View>
          <View style={styles.firstColumn}>
            <CalendarCar mode={'date'} type={'Pickup'} />
          </View>
          <View style={{flexDirection: 'column', marginTop: 5}}>
            <CalendarCar mode={'time'} type={'Pickup'} />
          </View>
        </View>
      </Card>

      <Text style={styles.Subtitle}>Return Details</Text>
      <Card style={{margin: 10}}>
        <View>
          <View style={styles.firstColumn}>
            <CalendarCar mode={'date'} type={'Return'} />
          </View>
          <View style={{flexDirection: 'column', marginTop: 5}}>
            <CalendarCar mode={'time'} type={'Return'} />
          </View>
        </View>
      </Card>

      <Text style={styles.Subtitle}>Car Details</Text>
      <Card style={{margin: 10}}>
        <View>
          <View style={styles.firstColumn}>
            <Text style={{fontSize: 15, color: '#000'}}>Car Location</Text>
            <LocationName
              lat={item?.loc?.coordinates[1]}
              long={item?.loc?.coordinates[0]}
            />
          </View>
          <View style={[styles.firstColumn, {marginTop: 5}]}>
            <Text style={{fontSize: 15, color: '#000'}}>Price</Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Icon name="cash-outline" size={23} color="#000" />
              <View style={{flex: 3, marginLeft: 10}}>
                <Text style={{fontSize: 15, color: '#000'}}>
                  RM{item.price} per day
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.firstColumn, {marginTop: 5}]}>
            <Text style={{fontSize: 15, color: '#000'}}>Vendor Name</Text>
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
            firstColumn={styles.firstColumn}
            vendorEmail={item.vendorEmail}></Mail>
          <Phone
            type={'Vendor'}
            vendorPhoneNumber={item.vendorPhoneNumber}></Phone>
        </View>
      </Card>

      {!!diff && (
        <View>
          <Text style={[styles.Subtitle, {fontSize: 20, fontWeight: 'bold'}]}>
            Rental Details
          </Text>
          <GetTotal price={item.price} diff={diff} />
        </View>
      )}
      <RoundButton
        backgroundColor="#dc2626"
        title={'Confirm'}
        onPress={onPressHandler}
        style={{marginBottom: 40}}
      />
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
            Your travel budget must at least more than RM100! Please re-enter
            your travel budget!
          </Text>
        </ModelContent>
      </Modal>
    </GradientBackground>
  );
}

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
