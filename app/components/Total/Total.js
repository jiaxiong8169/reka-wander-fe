import React from 'react';
import {View} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText} from '../texts/custom-text';

export const Total = ({totalPrice}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
      }}>
      <Icon style={{marginRight: 5}} name="pricetag" size={20} />
      <CustomText color="gray.500" fontSize="3xl">
        RM {totalPrice}
      </CustomText>
    </View>
  );
};