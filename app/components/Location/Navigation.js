import React, {useEffect, useState} from 'react';
import {Popup} from 'react-native-map-link';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';

export const Navigation = ({lat, long, value, isModelPopUp, setIsModelPopUp}) => {
  const [currentLong, setCurrentLong] = useState();
  const [currentLat, setCurrentLat] = useState();

  const closeModel = () => {
    setIsModelPopUp(false);
  };
  
  const options = {
    latitude: lat,
    longitude: long,
    sourceLatitude: currentLat,
    sourceLongitude: currentLong,
    title: value,
    dialogTitle: '',
    dialogMessage: '',
    cancelText: 'Cancel',
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
    getLocation();
  }, [lat, long]);

  return (
    <Popup
      isVisible={isModelPopUp}
      onCancelPressed={closeModel}
      onAppPressed={closeModel}
      onBackButtonPressed={closeModel}
      options={options}
      style={{
        titleText: {fontSize: 20, color: '#000'},
        subtitleText: {fontSize: 17, color: '#4169E1'},
        cancelButtonText: {fontSize: 18, color: '#4169E1'},
      }}
    />
  );
};
