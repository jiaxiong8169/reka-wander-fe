import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomText} from '../texts/custom-text';

export const Parking = ({
  parkingFee,
  parkingNumber,
  iconColor,
  parkingNumStyle,
  parkingFeeStyle,
}) => {
  return (
    <View
      style={{
        paddingTop: 15,
      }}>
      <View style={{flexDirection: 'column', marginLeft: 12}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 4,
          }}>
          <Icon name="car" size={26} color={iconColor} />
          <CustomText ml="3" fontSize="14" style={parkingNumStyle}>
            Parking slot: {parkingNumber}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="cash" size={27} color={iconColor} />
          <CustomText ml="3" fontSize="14" style={parkingFeeStyle}>
            Parking Fee for each slot: RM {parkingFee}
          </CustomText>
        </View>
      </View>
    </View>
  );
};
