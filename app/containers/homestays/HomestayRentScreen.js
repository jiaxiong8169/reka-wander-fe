import React from 'react';
import GradientBackground from '../../components/GradientBackground';
import {View, StyleSheet, Text} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../../components/Card';
import moment from 'moment';
import {RoomsSelected} from './HomestayRoomSelected';
import {LocationName} from '../../components/Location/LocationName';
import {Mail} from '../../components/JumpMail/Mail';
import {Phone} from '../../components/Phone/Phone';
import {Total} from '../../components/Total/Total';
import {clearCart} from '../../redux/Homestay/actions';

export const HomestayRentScreen = ({navigation, route}) => {
  const {id, data} = route.params;
  const dispatch = useDispatch();

  const {roomsAdded} = useSelector(state => state.homestayReducer);
  const {checkInDate} = useSelector(state => state.homestayReducer);
  const {checkOutDate} = useSelector(state => state.homestayReducer);
  const {homestayName} = useSelector(state => state.homestayReducer);
  const {totalPrice} = useSelector(state => state.homestayReducer);

  const onPressHandler = () => {
    navigation.navigate('SignInScreen');
    dispatch(clearCart());

    const completeData = {
      // ...data,
      // name: item.name,
      // price: item.price,
      // priceWithBaby: item.priceWithBaby,
      // availabilityBeforeRent: item.availability,
    };
    try {
      postWithAuth(
        'car-rental/mail',
        {
          data: completeData,
          vendorEmail: 'nicky.lyy2000@gmail.com',
          // vendorEmail: item.vendorEmail,
        },
        () => {
          navigation.navigate('SignInScreen');
        },
      );
    } catch (e) {
      console.log(e);
      console.log('press23');
    }
  };
  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <BackButton navigation={navigation} />
          <View style={{flex: 5}}>
            <Text style={{fontWeight: '500', fontSize: 20, color: '#005533'}}>
              {homestayName}
            </Text>
          </View>
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
          Dates Details
        </Text>
        <Card style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <Icon name="calendar-sharp" size={19} color="#000"></Icon>
            <Text style={{fontSize: 15, color: '#000', flex: 5, marginLeft: 3}}>
              CheckIn Date:
            </Text>
            <Text style={{fontSize: 15, color: '#000'}}>
              {moment(checkInDate).format('dddd, MMMM Do YYYY')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
            }}>
            <Icon name="calendar-sharp" size={19} color="#000"></Icon>
            <Text style={{fontSize: 15, color: '#000', flex: 5, marginLeft: 3}}>
              CheckOut Date:
            </Text>
            <Text style={{fontSize: 15, color: '#000'}}>
              {moment(checkOutDate).format('dddd, MMMM Do YYYY')}
            </Text>
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
          Rooms Selected Details
        </Text>
        <View>
          {roomsAdded.length > 0 && (
            <Card style={{margin: 10}}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                }}>
                <View>
                  {roomsAdded.map((item, i, rooms) => {
                    if (i + 1 == rooms.length) {
                      return (
                        <RoomsSelected
                          id={item.id}
                          key={item.id}
                          name={item.name}
                          url={item.thumbnailSrc}
                          price={item.price}
                          quantity={item.quantity}
                        />
                      );
                    } else {
                      return (
                        <RoomsSelected
                          style={{
                            borderBottomColor: '#DCDCDC',
                            borderBottomWidth: 1,
                          }}
                          id={item.id}
                          key={item.id}
                          name={item.name}
                          url={item.thumbnailSrc}
                          price={item.price}
                          quantity={item.quantity}
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
            <Text style={{fontSize: 15, color: '#000'}}>Homestay Location</Text>
            <LocationName
              lat={data?.loc?.coordinates[1]}
              long={data?.loc?.coordinates[0]}
              type={'homestay'}
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
                  {data.vendorName}
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
            vendorEmail={data.vendorEmail}></Mail>
          <Phone
            type={'Vendor'}
            vendorPhoneNumber={data.vendorPhoneNumber}></Phone>
        </Card>
        <Total totalPrice={totalPrice._W}></Total>

        <CustomButton
          colorScheme="secondary"
          onPress={onPressHandler}
          style={{marginBottom: 40}}>
          Confirm
        </CustomButton>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({});
