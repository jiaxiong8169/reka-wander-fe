import React, {useState,useEffect} from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {View, Dimensions, StyleSheet, Alert} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {HomestayRoomCardItem} from '../../components/HomestayRoomCardItem';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';
import dayjs from 'dayjs';
import {useHttpCall} from '../../hooks/useHttpCall';

const height = Dimensions.get('window').height;

export const HomestaySelectRoomScreen = ({navigation, route}) => {
  const {
    id,
    item,
    checkInDate,
    checkOutDate,
    totalDays,
    adults,
    children,
    guests,
    locationName,
    facilities,
  } = route.params;
  const [selected, setSelected] = useState([]);
  const [rooms, setRooms] = useState([]);
  const {getWithoutAuth} = useHttpCall();

  const getTotalPrice = () => {
    let curr = 0;
    selected.forEach(s => {
      curr += s.price * totalDays * s.quantity;
    });
    return curr.toFixed(2);
  };

  useEffect(() => {
    // if (!id) return;
    
    console.log(id)
    let startDate = dayjs(checkInDate).format('YYYY-MM-DD')
    let endDate = dayjs(checkOutDate).format('YYYY-MM-DD')
    console.log(startDate)
    console.log(endDate)
    getWithoutAuth(`reservations/availability?startDate=${startDate}&endDate=${endDate}&type=homestay&id=${id}`)
      .then(({data}) => {
        setRooms(data);
        console.log(rooms)
      })
      .catch(e => {
        console.log(e);
      });
      console.log(rooms)
  }, []);

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
              // check total price
              if (getTotalPrice() <= 0) {
                Alert.alert('You must select at least a room!');
                return;
              }
              navigation.navigate('HomestayRent', {
                item,
                checkInDate,
                checkOutDate,
                totalDays,
                adults,
                children,
                guests,
                locationName,
                totalPrice: getTotalPrice(),
                selected,
              });
              console.log(checkInDate,
                checkOutDate)
            }}>
            Rent Rooms
          </CustomButton>
        </View>
      }
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      stickyHeader={true}>
      <BackButton navigation={navigation} style={{width: '20%'}} />
      <BlueSubtitle
        text1={item?.name}
        style={{width: '80%', marginBottom: 10}}
      />

      <View style={[styles.container, {width: '100%'}]}>
        {rooms.map((room,i) => (
          <HomestayRoomCardItem
            key={i}
            id={room.id}
            navigation={navigation}
            room={room}
            name={room.name}
            price={room.price}
            pax={room.pax}
            availability={room.availability}
            thumbnailSrc={room.thumnailSrc}
            bedType={room.bedTypes}
            locationName={locationName}
            facilities={facilities}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
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
