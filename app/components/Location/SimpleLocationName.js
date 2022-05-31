import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, TouchableOpacity} from 'react-native';
import {Popup} from 'react-native-map-link';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';
import {CustomText} from '../texts/custom-text';

export const SimpleLocationName = ({lat, long, value, setValue, title}) => {
  const [currentLong, setCurrentLong] = useState();
  const [currentLat, setCurrentLat] = useState();
  const [isModelPopUp, setIsModelPopUp] = useState(false);

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  const options = {
    latitude: lat,
    longitude: long,
    sourceLatitude: currentLat,
    sourceLongitude: currentLong,
    title: title,
    dialogTitle: '',
    dialogMessage: '',
    cancelText: 'Cancel',
  };

  const onPressHandler = () => {
    setIsModelPopUp(true);
  };

  const getLocation = () => {
    getLocationPermissionAndExecute(position => {
      setCurrentLong(position.coords.longitude);
      setCurrentLat(position.coords.latitude);
    });
  };

  useEffect(() => {
    // do nothing if lat and long are nothing
    if (!lat || !long) return;
    getAddressFromCoordinates(lat, long);
    getLocation();
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
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Icon name="location-outline" size={23} color="#000"></Icon>
        <View style={{flex: 2, marginLeft: 10}}>
          <CustomText>{value}</CustomText>
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
            onPress={onPressHandler}>
            <View>
              <Icon
                name="navigate-circle-outline"
                size={26}
                color="white"></Icon>
            </View>
            <Popup
              isVisible={isModelPopUp}
              onCancelPressed={closeModel}
              onAppPressed={closeModel}
              onBackButtonPressed={closeModel}
              options={options}
              style={{
                titleText: {fontSize: 20, color: '#000'},
                subtitleText: {fontSize: 17, color: '#4169E1'},
                cancelButtonText: {fontSize: 18, color: '#00A099'},
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
