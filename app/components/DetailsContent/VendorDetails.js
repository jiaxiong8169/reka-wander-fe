import React, {useState, useEffect} from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText} from '../texts/custom-text';
import {Container} from './container';
import {ContactModal} from '../../components/Contact/ContactModal';

export const VendorDetails = ({
  titleStyle,
  iconColor,
  vendorName,
  vendorEmail,
  vendorPhoneNumber,
  subContainerView,
  modalButtonStyle,
  modalButtonTextStyle,
  nameTitleStyle,
  vendorNameStyle,
  emailTitleStyle,
  vendorEmailStyle,
  phoneNumTitleStyle,
  vendorPhoneNumStyle,
  styleContainer,
}) => {
  const [isContactModelPopUp, setIsContactModelPopUp] = useState(false);

  return (
    <Container
    styleContainer={styleContainer}
      subContainerView={subContainerView}
      titleStyle={titleStyle}
      title={'Vendor Details'}>
      <View style={{flexDirection: 'column', paddingBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 18,
            paddingBottom: 5,
            alignItems: 'center',
          }}>
          <Icon name="person-outline" size={18} color={iconColor} />
          <CustomText
            style={[
              {fontSize: 15, paddingHorizontal: 4, paddingRight: 7},
              nameTitleStyle,
            ]}>
            Name:
          </CustomText>
          <CustomText
            style={[{fontSize: 16, flex: 1, fontSize: 14}, vendorNameStyle]}>
            {vendorName}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 8,
            alignItems: 'center',
          }}>
          <Icon name="mail-outline" size={18} color={iconColor} />
          <CustomText
            style={[
              {fontSize: 15, paddingHorizontal: 4, paddingRight: 7},
              emailTitleStyle,
            ]}>
            Email:
          </CustomText>
          <CustomText
            style={[{fontSize: 16, flex: 1, fontSize: 14}, vendorEmailStyle]}>
            {vendorEmail}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 8,
            alignItems: 'center',
          }}>
          <Icon name="call-outline" size={18} color={iconColor} />
          <CustomText
            style={[
              {fontSize: 15, paddingHorizontal: 4, paddingRight: 7},
              phoneNumTitleStyle,
            ]}>
            Phone Number:
          </CustomText>
          <CustomText style={[{flex: 1, fontSize: 14}, vendorPhoneNumStyle]}>
            {vendorPhoneNumber}
          </CustomText>
        </View>
      </View>

      <TouchableOpacity
        style={[
          {
            borderColor: '#4169e1',
            borderWidth: 2,
            height: 40,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          },
          modalButtonStyle,
        ]}
        onPress={() => {
          setIsContactModelPopUp(current => !current);
        }}>
        <CustomText
          style={[{color: 'black', fontWeight: '400'}, modalButtonTextStyle]}>
          Contact Vendor
        </CustomText>
        <ContactModal
          vendorEmail={vendorEmail}
          vendorPhoneNumber={vendorPhoneNumber}
          isContactModelPopUp={isContactModelPopUp}
          setIsContactModelPopUp={setIsContactModelPopUp}
        />
      </TouchableOpacity>
    </Container>
  );
};
