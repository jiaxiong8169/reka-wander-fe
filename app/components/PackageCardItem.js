import React from 'react';
import {Image, Linking} from 'react-native';
import Card from './Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import {CustomButton} from './CustomButton';
import {CustomText} from './texts/custom-text';

export const PackageCardItem = ({
  item,
  selected,
  setSelected,
  marginBottom,
}) => {
  return (
    <Card
      style={{
        minHeight: 180,
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
        <CustomText color="gray.600">
          {selected.includes(item.id)
            ? 'Package Selected'
            : 'Package Not Selected'}
        </CustomText>
        <CheckBox
          disabled={false}
          value={selected.includes(item.id)}
          onValueChange={() => setSelected(item.id, item)}
        />
      </View>
      <CustomText bold fontSize="lg">
        {item.name}
      </CustomText>
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
        <CustomText marginLeft="1" fontSize={10} color="gray.600">
          {item.location}
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 4,
        }}>
        <Icon size={15} name="time-outline" />
        <CustomText marginLeft="1" fontSize={10} color="gray.600">
          {item.hours} Hours
        </CustomText>
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
        <CustomText marginLeft="1" fontSize={10} color="gray.600">
          RM {item.price}
        </CustomText>
      </View>
      <CustomButton
        size="sm"
        onPress={() => {
          if (!item?.link) return;
          Linking.canOpenURL(item.link).then(supported => {
            if (supported) {
              Linking.openURL(item.link);
            } else {
              Alert.alert('Link unavailable.');
            }
          });
        }}
        style={{width: 200, alignSelf: 'flex-end'}}>
        View Details
      </CustomButton>
    </Card>
  );
};
