import React, {useEffect, useState} from 'react';
import {View, Text, Linking, TouchableOpacity, Platform} from 'react-native';
import {CustomText} from '../texts/custom-text';
import Icon from 'react-native-vector-icons/Ionicons';

export const Email = props => {
  const mail = () => {
    console.log(props.vendorEmail);
    let mail = '';
    if (Platform.OS === 'ios') {
      mail = props.vendorEmail;
      Linking.canOpenURL(`message:${mail}`)
        .then(supported => {
          if (!supported) {
            console.log('Cant handle url');
          } else {
            return Linking.openURL(`message:${mail}`);
          }
        })
        .catch(err => {
          console.error('An error occurred', err);
        });
    } else {
      mail = `mailto:${props.vendorEmail}`;
      Linking.openURL(mail);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        paddingBottom: 8,
        alignItems: 'center',
        flex:1,
      }}>
      <CustomText>Email the vendor</CustomText>
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
        onPress={mail}>
        <CustomText style={{color: 'black', fontWeight: '400', alignItems: 'center',}}>
          <Icon name="mail-outline" size={16} color="#000" />
          {'  '}Email
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
