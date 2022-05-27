import React from 'react';
import {
  Text,
  Box,
  Heading,
  AspectRatio,
  Stack,
  Divider,
  Image,
  Center,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert, Dimensions, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setRoomsAdded,
  setTotalPrice,
  clearCart,
} from '../redux/Homestay/actions';

const width = Dimensions.get('window').width;

const printPersonPerPax = personPerPax => {
  const person = [];
  for (var i = 0; i < personPerPax; i++) {
    person.push(<Icon name="person" key={i} size={12} />);
  }
  return person;
};

export const HomestayRoomCardItem = props => {
  const {roomsAdded} = useSelector(state => state.homestayReducer);
  const {totalPrice} = useSelector(state => state.homestayReducer);
  const dispatch = useDispatch();
  let tempRooms = roomsAdded;
  React.useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  }, [totalPrice]);

  const addToCart = async (
    id,
    name,
    price,
    pax,
    availability,
    thumbnailSrc,
    action,
  ) => {
    dispatch(clearCart());
    let tempRooms = roomsAdded;
    const check_index = tempRooms.findIndex(item => item.id === id);
    if (action == 'add' && availability > 0) {
      if (check_index !== -1) {
        if (
          tempRooms[check_index].availability > tempRooms[check_index].quantity
        ) {
          tempRooms[check_index].quantity++;
          dispatch(setTotalPrice(getSum(tempRooms)));
          dispatch(setRoomsAdded(tempRooms));
        } else {
          Alert.alert('Max room number selected!');
          dispatch(setTotalPrice(getSum(tempRooms)));
          dispatch(setRoomsAdded(tempRooms));
        }
      } else {
        tempRooms.push({
          id,
          name,
          price,
          pax,
          availability,
          thumbnailSrc,
          quantity: 1,
        });
        dispatch(setTotalPrice(getSum(tempRooms)));
        dispatch(setRoomsAdded(tempRooms));
      }
    } else {
      if (check_index !== -1) {
        if (tempRooms[check_index].quantity > 1) {
          tempRooms[check_index].quantity--;
          dispatch(setTotalPrice(getSum(tempRooms)));
          dispatch(setRoomsAdded(tempRooms));
        } else {
          tempRooms.pop({...tempRooms.find(p => p.id === id), quantity: 0});
          dispatch(setRoomsAdded(tempRooms));
          dispatch(setTotalPrice(getSum(tempRooms)));
        }
      }
    }
  };

  const getSum = async items => {
    if (items.filter(({homestayId}) => homestayId === homestayId).length != 0) {
      let total = items
        .filter(({homestayId}) => homestayId === homestayId)
        .reduce(function (previousValue, currentValue) {
          return previousValue + currentValue.quantity * currentValue.price;
        }, 0);
      return total;
    } else {
      return 0;
    }
  };
  const clearItem = async (items, roomId) => {
    if (items.filter(({id}) => id === roomId).length != 0) {
      items.pop({...items.find(p => p.id === roomId), quantity: 0});
      dispatch(setRoomsAdded(items));
      dispatch(setTotalPrice(getSum(items)));
    }
  };

  return (
    <Box alignItems="center" mb={5}>
      <Box
        maxW="90%"
        rounded="20"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        style={{
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 6,
          shadowOpacity: 0.26,
          elevation: 8,
        }}
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: props.thumbnailSrc,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="lightBlue.500"
            rounded={5}
            _dark={{
              bg: 'blue.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'lg',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
            style={{flexDirection: 'row'}}>
            {props.availability} Left
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Twin Room
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'blue.500',
              }}
              _dark={{
                color: 'blue.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              {printPersonPerPax(props.pax)}/ pax
            </Text>
          </Stack>
          <Text fontWeight="400">
            Free Wifi, Bath, Air conditioning, Flat-screen TV {props.homestayId}
          </Text>
          <Divider />
          <Heading alignItems="center" flexDirection="row">
            RM {props.price}
          </Heading>
          {/* <TouchableOpacity
            // onPress={()=>this.onClickAddCart(item)}
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              padding: 15,
              borderWidth: 1,
              borderColor: '#60a5fa',
            }}>
            <Text style={{fontSize: 18, color: '#60a5fa', fontWeight: 'bold'}}>
              Select Room
            </Text>
            <View style={{width: 10}} />
          </TouchableOpacity> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
              borderWidth: 0.9,
              borderColor: 'gray',
              padding: 5,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity>
              <Icon
                name="ios-remove-circle"
                size={35}
                color={'#f87171'}
                onPress={() =>
                  addToCart(
                    props.id,
                    props.name,
                    props.price,
                    props.pax,
                    props.availability,
                    props.thumbnailSrc,
                    'remove',
                  )
                }
              />
            </TouchableOpacity>
            <Text
              style={{paddingHorizontal: 8, fontWeight: 'bold', fontSize: 18}}>
              {tempRooms.findIndex(item => item.id === props.id) !== -1
                ? tempRooms[tempRooms.findIndex(item => item.id === props.id)]
                    .quantity
                : 0}
            </Text>
            <TouchableOpacity>
              <Icon
                name="ios-add-circle"
                size={35}
                color={'#33c37d'}
                onPress={() =>
                  addToCart(
                    props.id,
                    props.name,
                    props.price,
                    props.pax,
                    props.availability,
                    props.thumbnailSrc,
                    'add',
                  )
                }
              />
            </TouchableOpacity>
            <Divider
              orientation="vertical"
              marginHorizontal={10}
              bg="blue.500"
            />

            <TouchableOpacity>
              <Icon
                name="close-outline"
                size={20}
                color={'gray'}
                onPress={() => clearItem(roomsAdded, props.id)}
              />
            </TouchableOpacity>
          </View>
        </Stack>
      </Box>
    </Box>
  );
};
