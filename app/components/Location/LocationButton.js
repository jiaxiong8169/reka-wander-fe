import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Popup} from 'react-native-map-link';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';
import RoundButton from '../RoundButton';

export const LocationButton = ({targetLat, targetLong}) => {
  const [currentLong, setCurrentLong] = useState();
  const [currentLat, setCurrentLat] = useState();
  const [isModelPopUp, setIsModelPopUp] = useState(false);

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  const options = {
    latitude: targetLat,
    longitude: targetLong,
    sourceLatitude: currentLat,
    sourceLongitude: currentLong,
    dialogTitle: '',
    dialogMessage: '',
    cancelText: 'Cancel',
  };

  const onPressHandler = () => {
    // do nothing if location not found
    if (!currentLat || !currentLong) return;
    setIsModelPopUp(true);
  };

  useEffect(() => {
    // do nothing if lat and long are nothing
    if (!targetLat || !targetLong) return;
    getLocationPermissionAndExecute(position => {
      setCurrentLong(position.coords.longitude);
      setCurrentLat(position.coords.latitude);
    });
  }, [targetLat, targetLong]);

  return (
    <View>
      <RoundButton
        title="Direction"
        backgroundColor="#dc2626"
        onPress={onPressHandler}
      />
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
    </View>
  );
};
