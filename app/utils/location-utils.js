import {Alert, Platform} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const getLocationPermissionAndExecute = async (
  successCallback,
  errorCallback,
) => {
  try {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then(res => {
      if (res == RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            if (!!successCallback) successCallback(position);
          },
          () => {
            Alert.alert(
              'Error',
              'You need to grant the location permission to use this feature!',
            );
            if (!!errorCallback) errorCallback();
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          },
        );
      } else {
        console.log('Location is not enabled');
        Alert.alert(
          'Error',
          'You need to grant the location permission to use this feature!',
        );
        if (!!errorCallback) errorCallback();
      }
    });
  } catch (errorCallback) {
    console.log('location set error:', error);
    Alert.alert(
      'Error',
      'You need to grant the location permission to use this feature!',
    );
    if (!!errorCallback) errorCallback(error);
  }
};
