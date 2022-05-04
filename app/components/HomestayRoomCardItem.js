import React from 'react';
import {
  Text,
  Box,
  Heading,
  AspectRatio,
  Stack,
  Button,
  Divider,
  Image,
  Center,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const printPersonPerPax = personPerPax => {
  const person = [];
  for (var i = 0; i < personPerPax; i++) {
    person.push(<Icon name="person" key={i} size={12} />);
  }
  return person;
};

export const HomestayRoomCardItem = props => {
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
            py="1.5" style={{flexDirection: 'row'}}>
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
            Free Wifi, Bath, Air conditioning, Flat-screen TV
          </Text>
          <Divider />
          <Heading alignItems="center" flexDirection="row">
            RM {props.price}
          </Heading>
          {/* <Button
              variant="outline"
              size={'lg'}>
              Select
            </Button> */}
        </Stack>
      </Box>
    </Box>
  );
};
