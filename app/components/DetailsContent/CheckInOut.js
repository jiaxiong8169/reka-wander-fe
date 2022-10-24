import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {CustomText} from '../texts/custom-text';

export const CheckInOut = ({checkInTime, checkOutTime, additionalRules}) => {
  return (
    <View
      style={{
        paddingTop: 15,
      }}>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 4,
          }}>
          <Icon name="time" size={18} />
          <CustomText ml="3" fontSize="14">
            Check-in: {checkInTime}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 30,
            alignItems: 'center',
          }}>
          <Icon name="time" size={17} />
          <CustomText ml="3" fontSize="14">
            Checkout: {checkOutTime}
          </CustomText>
        </View>
        <Text style={{fontSize: 18, color: 'black', paddingBottom: 3}}>
          Additional Rules
        </Text>
        {additionalRules.map(rules => (
          <View key={rules.key} id={rules.id}>
            <CustomText>- {rules.item}</CustomText>
          </View>
        ))}
      </View>
    </View>
  );
};
