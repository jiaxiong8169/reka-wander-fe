import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
      <ModelContent onPress={closeModel} buttonTitle={'Close'} style={{justifyContent: 'flex-start',alignItems: 'stretch',}}>
        <View style={{justifyContent: 'space-between',}}>
          <CustomText style={{fontSize: 20, marginBottom: 12}}>
            Contact Vendor
          </CustomText>
          <CustomText style={{marginBottom: 25}}>
            How do you want to contact the vendor?
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',     
            }}>
            <Email vendorEmail={vendorEmail} />
            <Call vendorPhoneNumber={vendorPhoneNumber} />
          </View>
        </View>
      </ModelContent>
    </Modal>
  );
};
