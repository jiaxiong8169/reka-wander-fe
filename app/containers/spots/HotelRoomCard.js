import React from 'react';
import {Box, AspectRatio, Stack, Divider, Image, Center} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert, View, TouchableOpacity} from 'react-native';
import { CustomText } from '../../components/texts/custom-text';

export const HotelRoomCardItem = ({
  id,
  room,
  navigation,
  name,
  price,
  pax,
  availability,
  thumbnailSrc,
  locationName,
  facilities,
  bedType,
  selected,
  setSelected,
}) => {
  const printPersonPerPax = personPerPax => {
    const person = [];
    for (var i = 0; i < personPerPax; i++) {
      person.push(<Icon name="person" key={i} size={12} />);
    }
    return person;
  };

  const removeFromCart = targetId => {
    const tmp = JSON.parse(JSON.stringify(selected));
    const index = tmp.map(x => x.id).indexOf(targetId);
    if (index >= 0) {
      tmp[index].quantity -= 1;
      if (tmp[index].quantity <= 0) tmp.splice(index, 1);
      setSelected(tmp);
    }
  };

  const addToCart = targetId => {
    const tmp = JSON.parse(JSON.stringify(selected));
    let target = tmp.find(x => x.id === targetId);
    if (!target) {
      target = {
        id,
        room,
        name,
        price,
        pax,
        availability,
        thumbnailSrc,
        quantity: 0,
      };
      tmp.push(target);
    }
    target.quantity += 1;
    if (target.quantity > availability) {
      Alert.alert('Max room number selected!');
      return;
    }
    // add to cart
    setSelected(tmp);
  };

  const clearItem = targetId => {
    setSelected(prev => prev.filter(x => x.id !== targetId));
  };

  const getQuantity = () => {
    let target = selected.find(x => x.id === id);
    if (!target) {
      return 0;
    }
    return target.quantity;
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HotelRoomDetails', {
              id,
              room,
              thumbnailSrc,
              locationName,
              facilities,
              bedType,
              price,
            });
            console.log(locationName);
          }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: thumbnailSrc,
                }}
                alt="thumbnail"
              />
            </AspectRatio>
            <Center
              bg="primary.400"
              rounded={5}
              _dark={{
                bg: 'primary.600',
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
              {availability} Left
            </Center>
          </Box>
        </TouchableOpacity>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <CustomText fontSize="lg">{name}</CustomText>
            <CustomText
              fontSize="xs"
              _light={{
                color: 'primary.400',
              }}
              _dark={{
                color: 'primary.400',
              }}
              bold>
              {printPersonPerPax(pax)} / pax
            </CustomText>
          </Stack>
          <Divider />

          <CustomText fontSize="xl">RM {price}</CustomText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
              borderWidth: 0.9,
              borderColor: 'gray',
              padding: 5,
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Icon
                name="ios-remove-circle"
                size={25}
                color={'#f87171'}
                onPress={() => removeFromCart(id)}
              />
            </TouchableOpacity>
            <CustomText fontSize="md" style={{paddingHorizontal: 8}}>
              {getQuantity()}
            </CustomText>
            <TouchableOpacity>
              <Icon
                name="ios-add-circle"
                size={25}
                color={'#33c37d'}
                onPress={() => addToCart(id)}
              />
            </TouchableOpacity>
            <Divider
              orientation="vertical"
              marginHorizontal={10}
              bg="gray.400"
            />

            <TouchableOpacity>
              <Icon
                name="close-outline"
                size={20}
                color={'gray'}
                onPress={() => clearItem(id)}
              />
            </TouchableOpacity>
          </View>
        </Stack>
      </Box>
    </Box>
  );
};
