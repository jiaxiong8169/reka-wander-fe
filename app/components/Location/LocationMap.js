import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker, Circle} from 'react-native-maps';

export const LocationMap = ({lat, long, viewStyle}) => {
  const [region, setRegion] = useState({
    latitude: lat,
    longitude: long,
    latitudeDelta: 5,
    longitudeDelta: 4,
  });

  const LatLng = {
    latitude: lat,
    longitude: long,
  }

  return (
    <View style={viewStyle}>
      <MapView
        region={region}
        moveOnMarkerPress={false}
        // zoomEnabled={false}
        // scrollEnabled={false}
        // zoomTapEnabled={false}
        // zoomControlEnabled={false}
        scrollDuringRotateOrZoomEnabled={false}
        // pitchEnabled={false}
        style={{
          width: '100%',
          height: 150,
        }}>
        <Marker coordinate={LatLng} />
      </MapView>
    </View>
  );
};


