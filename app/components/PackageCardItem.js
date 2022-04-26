import React from 'react';
import {View, Image} from 'react-native';
import Card from './Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Text} from 'native-base';
import CheckBox from '@react-native-community/checkbox';

export const PackageCardItem = ({
  item,
  navigation,
  selected,
  setSelected,
  marginBottom,
}) => {
  return (
    <Card
      style={{
        height: 180,
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        marginBottom: marginBottom,
        paddingHorizontal: 20,
      }}
      key={item.id}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 4,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <Text color="gray.600">
          {selected.includes(item.id)
            ? 'Package Selected'
            : 'Package Not Selected'}
        </Text>
        <CheckBox
          disabled={false}
          value={selected.includes(item.id)}
          onValueChange={() => setSelected(item.id)}
        />
      </View>
      <Text bold fontSize={24} letterSpacing="sm" lineHeight="xs">
        {item.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 4,
          alignItems: 'center',
        }}>
        <Image
          style={{width: 15, height: 15}}
          source={require('../assets/pin.png')}
          tintColor={'#52525b'}
        />
        <Text marginLeft="1" fontSize={10} color="gray.600">
          {item.location}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 4,
        }}>
        <Icon size={15} name="time-outline" />
        <Text marginLeft="1" fontSize={10} color="gray.600">
          {item.hours} Hours
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 4,
        }}>
        <Image
          style={{width: 15, height: 15}}
          source={require('../assets/money.png')}
          tintColor={'#52525b'}
        />
        <Text marginLeft="1" fontSize={10} color="gray.600">
          RM {item.price}
        </Text>
      </View>
      <Button
        size="sm"
        padding="1"
        bg="blue.600"
        _pressed={{bg: 'blue.300', _text: {color: 'white'}}}
        onPress={() => {
          // TODO: Where to navigate?
        }}
        style={{width: 200, alignSelf: 'flex-end'}}>
        View Details
      </Button>
    </Card>
  );
};
