import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {View, Dimensions, StyleSheet} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {HomestayRoomCardItem} from '../../components/HomestayRoomCardItem';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';

const height = Dimensions.get('window').height;

export const HomestaySelectRoomScreen = ({navigation, route}) => {
  const {item, checkInDate, checkOutDate, totalDays} = route.params;
  const [selected, setSelected] = useState([]);

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
              navigation.navigate('HomestayRent', {
                item,
                checkInDate,
                checkOutDate,
                totalDays,
                totalPrice: getTotalPrice(),
                selected,
              });
            }}>
            Rent Rooms
          </CustomButton>
        </View>
      }>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: '3%', width: '90%'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1={item?.name} />
        </View>

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
