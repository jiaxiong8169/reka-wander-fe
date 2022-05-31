import React, {useEffect, useState} from 'react';
import {View, Text, Linking, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText} from '../texts/custom-text';

export const Mail = props => {
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
    <View style={[props.firstColumn, {marginTop: 5}]}>
      <CustomText>{props.type} Email</CustomText>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Icon name="mail-outline" size={23} color="#000" />
        <View style={{flex: 2, marginLeft: 10}}>
          <CustomText>{props.vendorEmail}</CustomText>
        </View>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#00CCD2',
              padding: 4,
              paddingLeft: 9,
              width: '50%',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}
            onPress={mail}>
            <View>
              <Icon name="send-sharp" size={18} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
