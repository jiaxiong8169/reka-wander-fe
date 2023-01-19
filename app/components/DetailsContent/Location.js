import React, {useState, useEffect} from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocationMap} from '../../components/Location/LocationMap';
import {Navigation} from '../../components/Location/Navigation';
import {CustomText} from '../texts/custom-text';
import {Container} from './container';

export const Location = ({
  lat,
  long,
  locationName,
  subContainerView,
  titleStyle,
  locationNameStyle,
  navigationButtonStyle,
  navigationButtonTextStyle,
  iconColor,
  styleContainer,
}) => {
  const [isModelPopUp, setIsModelPopUp] = useState(false);
const lati = lat;
const longi = long;
  return (
    <Container
    styleContainer={styleContainer}
      subContainerView={subContainerView}
      titleStyle={titleStyle}
      title={'Location'}>
      <LocationMap
        lat={lati}
        long={longi}
        viewStyle={{
          alignItems: 'center',
          paddingTop: 18,
        }}
      />
      <CustomText
        fontSize="md"
        style={[
          {lineHeight: 35, paddingTop: 8, paddingBottom: 8},
          locationNameStyle,
        ]}>
        {locationName}
      </CustomText>
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
          navigationButtonStyle,
        ]}
        onPress={() => {
          setIsModelPopUp(current => !current);
        }}>
        <CustomText
          style={[
            {
              fontWeight: '400',
            },
            navigationButtonTextStyle,
          ]}>
          <Icon name="navigate-outline" size={14} color={iconColor} />
          {'  '}Show me the way
        </CustomText>
        <Navigation
          lat={lati}
          long={longi}
          value={locationName}
          isModelPopUp={isModelPopUp}
          setIsModelPopUp={setIsModelPopUp}
        />
      </TouchableOpacity>
    </Container>
  );
};
