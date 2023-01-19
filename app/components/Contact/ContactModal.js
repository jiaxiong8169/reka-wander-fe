import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {CustomText} from '../texts/custom-text';
import ModelContent from '../../components/Modal/ModalContent';
import {Email} from './Email';
import {Call} from './Call';

export const ContactModal = ({
  vendorEmail,
  vendorPhoneNumber,
  isContactModelPopUp,
  setIsContactModelPopUp,
}) => {
  const closeModel = () => {
    setIsContactModelPopUp(false);
  };

  return (
    <Modal
      isVisible={isContactModelPopUp}
      onBackdropPress={closeModel}
      onSwipeComplete={closeModel}
      useNativeDriverForBackdrop
      swipeDirection={['left', 'right', 'up', 'down']}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={700}
      animationOutTiming={700}
      backdropTransitionInTiming={700}
      backdropTransitionOutTiming={700}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 4,
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 12,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomText
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#0047ab',
            }}>
            Contact Vendor
          </CustomText>
          <TouchableOpacity onPress={closeModel}>
            <Icon name="close" size={23} color={'#0047ab'} />
          </TouchableOpacity>
        </View>

        <View style={{}}>
          <CustomText style={{marginBottom: 25}}>
            How do you want to contact the vendor?
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent:'space-between',
            }}>
            <Email vendorEmail={vendorEmail} />
            <Call vendorPhoneNumber={vendorPhoneNumber} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
