import React, {useEffect, useState} from 'react';
import {View, Text, Linking, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText} from '../texts/custom-text';

export const Call = props => {
  const call = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${props.vendorPhoneNumber}`;
    } else {
      number = `tel:${props.vendorPhoneNumber}`;
    }
    Linking.openURL(number);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        paddingBottom: 8,
        alignItems: 'center',
        flex:1,
        // backgroundColor: 'grey',
      }}>
      <CustomText>Call the vendor</CustomText>
      <TouchableOpacity
        style={{
          borderColor: 'grey',
          borderWidth: 2,
          height: 40,
          width: '80%',
          margin: 10,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={call}>
        <CustomText style={{color: 'black', fontWeight: '400'}}>
          <Icon name="call-outline" size={16} color="#000" />
          {'  '}Call
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
