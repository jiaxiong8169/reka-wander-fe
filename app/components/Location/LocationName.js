import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {CustomText} from '../texts/custom-text';

export const LocationName = ({
  lat,
  long,
  value,
  setValue,
  textViewStyle,
  textStyle,
}) => {
  useEffect(() => {
    // do nothing if lat and long are nothing
    if (!lat || !long) return;
    getAddressFromCoordinates(lat, long);
  }, [lat, long]);

  const getAddressFromCoordinates = (lat, long) => {
    //here api
    //api key belongs to nic0
    const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${lat}%2C${long}&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=xjMLk-nY3LGNoIEdTQnh53EMb5TbZVmo10tdpYNFVss`;
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        if (
          resJson &&
          resJson.Response &&
          resJson.Response.View &&
          resJson.Response.View[0] &&
          resJson.Response.View[0].Result &&
          resJson.Response.View[0].Result[0]
        ) {
          setValue(resJson.Response.View[0].Result[0].Location.Address.Label);
        }
      })
      .catch(e => {
        console.log('Error in getAddressFromCoordinates', e);
      });
  };

  return (
      <View style={textViewStyle}>
        <CustomText style={textStyle}>{value}</CustomText>
      </View>
  );
};
