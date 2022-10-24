import React, {useState, useEffect} from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText} from '../texts/custom-text';
import {ContactModal} from '../../components/Contact/ContactModal';

export const VendorDetails = ({vendorName, vendorEmail, vendorPhoneNumber}) => {
  const [isContactModelPopUp, setIsContactModelPopUp] = useState(false);

  return (
    <View
      style={{
        borderColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 25,
        paddingTop: 25,
      }}>
      <View
        style={{
          borderLeftColor: '#0099FF',
          borderLeftWidth: 5,
          borderRadius: 4,
        }}>
        <CustomText fontSize="2xl" style={{lineHeight: 35, paddingLeft: 13}}>
          Vendor Details
        </CustomText>
      </View>

      <View style={{flexDirection: 'column', paddingBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 18,
            paddingBottom: 5,
            alignItems: 'center',
          }}>
          <Icon name="person-outline" size={18} color="#000" />
          <CustomText
            style={{fontSize: 15, paddingHorizontal: 4, paddingRight: 7}}>
            Name:
          </CustomText>
          <CustomText style={{fontSize: 16, flex: 1, fontSize: 14}}>
            {vendorName}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 8,
            alignItems: 'center',
          }}>
          <Icon name="mail-outline" size={18} color="#000" />
          <CustomText
            style={{fontSize: 15, paddingHorizontal: 4, paddingRight: 7}}>
            Email:
          </CustomText>
          <CustomText style={{fontSize: 16, flex: 1, fontSize: 14}}>
            {vendorEmail}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 8,
            alignItems: 'center',
          }}>
          <Icon name="call-outline" size={18} color="#000" />
          <CustomText
            style={{fontSize: 15, paddingHorizontal: 4, paddingRight: 7}}>
            Phone Number:
          </CustomText>
          <CustomText style={{flex: 1, fontSize: 14}}>
            {vendorPhoneNumber}
          </CustomText>
        </View>
      </View>

      <TouchableOpacity
        style={{
          borderColor: '#0099FF',
          // backgroundColor:'#000',
          borderWidth: 2,
          height: 40,
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal:10,
        }}
        onPress={() => {
          setIsContactModelPopUp(current => !current);
        }}>
        <CustomText style={{color: 'black', fontWeight: '400'}}>
          Contact Vendor
        </CustomText>
        <ContactModal
          vendorEmail={vendorEmail}
          vendorPhoneNumber={vendorPhoneNumber}
          isContactModelPopUp={isContactModelPopUp}
          setIsContactModelPopUp={setIsContactModelPopUp}
        />
      </TouchableOpacity>
    </View>
  );
};
