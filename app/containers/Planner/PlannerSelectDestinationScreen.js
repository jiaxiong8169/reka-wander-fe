import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setUserLongLat} from '../../redux/Planner/actions';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';
import MapView, {Marker, Circle} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Input} from 'native-base';
import {CustomButton} from '../../components/CustomButton';

export const PlannerSelectDestinationScreen = () => {
  const {longitude, latitude} = useSelector(state => state.plannerReducer);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState({
    latitude: 5.5619733,
    longitude: 118.0034433,
    latitudeDelta: 5,
    longitudeDelta: 4,
  });
  const dispatch = useDispatch();

  // get location feature
  const getLocation = () => {
    getLocationPermissionAndExecute(
      position => {
        // set the longitude and longitude
        dispatch(
          setUserLongLat(position.coords.longitude, position.coords.latitude),
        );
        // update region
        setRegion(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      () => {
        // location failed, navigate to MyHome
        navigation.navigate('MyHome');
      },
    );
  };

  const geocodeByName = () => {
    //here api
    //api key belongs to nic0
    if (!search) return;
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${search}&limit=1&apiKey=xjMLk-nY3LGNoIEdTQnh53EMb5TbZVmo10tdpYNFVss`;
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.items.length > 0) {
          // update with the first item
          dispatch(
            setUserLongLat(
              resJson.items[0].position.lng,
              resJson.items[0].position.lat,
            ),
          );
          // update region
          setRegion(prev => ({
            ...prev,
            latitude: resJson.items[0].position.lat,
            longitude: resJson.items[0].position.lng,
          }));
        }
      })
      .catch(e => {
        console.log('Error in geocodeByName', e);
      });
  };

  // on enter the screen, set long lat to user's current location
  useEffect(() => {
    if (!longitude && !latitude) getLocation();
    else
      setRegion(prev => ({
        ...prev,
        latitude: latitude,
        longitude: longitude,
      }));
  }, [longitude, latitude]);

  return (
    <View style={styles.body_container}>
      <Text style={styles.question}>Select Your Destination!</Text>
      <Input
        onChangeText={v => setSearch(v)}
        placeholder="Search location..."
        value={search}
        InputLeftElement={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#BDBDBD"
            name="search"
          />
        }
      />
      <CustomButton size="xs" onPress={() => geocodeByName()}>
        Go To Location
      </CustomButton>

      <MapView
        region={region}
        style={{
          width: '100%',
          height: 200,
          marginTop: 10,
        }}>
        <Circle
          center={{latitude, longitude}}
          radius={300000}
          fillColor="rgba(25, 118, 210,0.3)"
        />
        <Marker
          draggable
          coordinate={{latitude, longitude}}
          title="Your Location"
          description="Drag the marker to change your location."
          onDragEnd={e => {
            // set the longitude and longitude
            dispatch(
              setUserLongLat(
                e.nativeEvent.coordinate.longitude,
                e.nativeEvent.coordinate.latitude,
              ),
            );
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  body: {
    marginBottom: 20,
    marginTop: 30,
    width: '100%',
  },
  body_container: {
    alignItems: 'center',
    width: '100%',
  },
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
