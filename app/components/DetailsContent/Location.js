import React, {useState, useEffect} from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocationMap} from '../../components/Location/LocationMap';
import {Navigation} from '../../components/Location/Navigation';
import {CustomText} from '../texts/custom-text';

export const Location = ({lat, long, locationName}) => {
  const [isModelPopUp, setIsModelPopUp] = useState(false);

  return (
    <View
      style={{
        borderColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 24,
        paddingTop: 25,
      }}>
      <View
        style={{
          borderLeftColor: '#0099FF',
          borderLeftWidth: 5,
          borderRadius: 4,
        }}>
        <CustomText fontSize="2xl" style={{lineHeight: 35, paddingLeft: 15}}>
          Location
        </CustomText>
      </View>

      <LocationMap
        lat={lat}
        long={long}
        viewStyle={{
          alignItems: 'center',
          paddingTop: 18,
        }}
      />
      <CustomText
        fontSize="md"
        style={{lineHeight: 35, paddingTop: 8, paddingBottom: 8}}>
        {locationName}
      </CustomText>
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
          setIsModelPopUp(current => !current);
        }}>
        <CustomText style={{
          // color: 'white', 
        fontWeight: '400'}}>
          <Icon name="navigate-outline" size={14} />
          {'  '}Show me the way
        </CustomText>
        <Navigation
          lat={lat}
          long={long}
          value={locationName}
          isModelPopUp={isModelPopUp}
          setIsModelPopUp={setIsModelPopUp}
        />
      </TouchableOpacity>
    </View>
  );
};
