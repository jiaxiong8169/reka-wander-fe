import React, {useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import {View} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../../components/Card';
import {RoomsSelected} from './HomestayRoomSelected';
import {Mail} from '../../components/JumpMail/Mail';
import {Phone} from '../../components/Phone/Phone';
import {Total} from '../../components/Total/Total';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {CustomText} from '../../components/texts/custom-text';
import {SimpleLocationName} from '../../components/Location/SimpleLocationName';

export const HomestayRentScreen = ({navigation, route}) => {
  const {item, checkInDate, checkOutDate, totalDays, totalPrice, selected} =
    route.params;

  const [locationName, setLocationName] = useState('');

  const onPressHandler = () => {
    navigation.navigate('SignInScreen');
    try {
      // TODO: Send email to vendor
      // postWithAuth(
      //   'homestays/mail',
      //   {
      //     data: {
      //       ...data,
      //       roomsAdded,
      //       checkInDate,
      //       checkOutDate,
      //       totalPrice,
      //     },
      //   },
      //   () => {
      //     navigation.navigate('SignInScreen');
      //   },
      // );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <GradientBackground>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <BackButton navigation={navigation} />
          <View style={{flex: 5}}>
            <BlueSubtitle text1={item?.name} />
          </View>
        </View>
        <CustomText
          bold
          fontSize="lg"
          style={{
            alignSelf: 'center',
          }}>
          Dates Details
        </CustomText>
        <Card style={{margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#DCDCDC',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            <Icon name="calendar-sharp" size={19} color="#000"></Icon>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              Check In Date:
            </CustomText>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              {checkInDate}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
            }}>
            <Icon name="calendar-sharp" size={19} color="#000"></Icon>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              Check Out Date:
            </CustomText>
            <CustomText style={{flex: 1, marginLeft: 3}}>
              {checkOutDate}
            </CustomText>
          </View>
        </Card>
        <CustomText
          bold
          fontSize="lg"
          style={{
            alignSelf: 'center',
          }}>
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
                        key={item.id}
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
            <CustomText>Homestay Location</CustomText>
            <SimpleLocationName
              lat={item?.loc?.coordinates[1]}
              long={item?.loc?.coordinates[0]}
              value={locationName}
              setValue={setLocationName}
              title="Homestay"
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
        <Total totalPrice={totalPrice} />

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
