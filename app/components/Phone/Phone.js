import React, {useEffect, useState} from 'react';
import {View, Text, Linking, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Phone = props => {
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
    <View style={{flexDirection: 'column', marginTop: 5}}>
      <Text style={{fontSize: 15, color: '#000'}}>{props.type} Phone</Text>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Icon name="call-outline" size={23} color="#000" />
        <View style={{flex: 2, marginLeft: 10}}>
          <Text style={{fontSize: 15, color: '#000'}}>
            {props.vendorPhoneNumber}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#00CCD2',
              padding: 4,
              width: '50%',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
            onPress={call}>
            <View>
              <Icon name="call-sharp" size={18} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
