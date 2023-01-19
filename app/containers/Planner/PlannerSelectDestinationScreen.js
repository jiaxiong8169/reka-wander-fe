import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  setUserLongLat,
  setUserDestination,
  setMaxDistance,
} from '../../redux/Planner/actions';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';
import MapView, {Marker, Circle} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CustomButton} from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

const PlannerSelectDestinationScreen = () => {
  const {longitude, latitude, maxDistance} = useSelector(
    state => state.plannerReducer,
  );
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
          dispatch(
            setUserDestination(
              resJson.Response.View[0].Result[0].Location.Address.Label,
            ),
          );
        }
      })
      .catch(e => {
        console.log('Error in getAddressFromCoordinates', e);
      });
  };

  // on enter the screen, set long lat to user's current location
  useEffect(() => {
    getAddressFromCoordinates(latitude, longitude);
    if (!longitude && !latitude) {
      getLocation();
      console.log(latitude, longitude)
      getAddressFromCoordinates(latitude, longitude);
    } else
      setRegion(prev => ({
        ...prev,
        latitude: latitude,
        longitude: longitude,
      }));
  }, [longitude, latitude]);

  return (
    <View style={styles.body_container}>
      <Text style={styles.question}>Select a Destination!</Text>
      <CustomTextInput
        onChangeText={v => setSearch(v)}
        placeholder="Search location..."
        value={search}
        // autoFocus={true}
        startAdornment={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#BDBDBD"
            name="search"
          />
        }
      />
      <View style={{marginTop: 10}}>
        <CustomButton size="xs" onPress={() => geocodeByName()}>
          Go To Location
        </CustomButton>
      </View>

      <MapView
        region={region}
        style={{
          width: '100%',
          height: 200,
          marginTop: 10,
        }}>
        <Circle
          center={{latitude, longitude}}
          radius={100000}
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
      <Text style={styles.subQuestion}>
        Please enter a radius distance from destination for recommendation
      </Text>
      {/* <Text style={styles.example}>If you do not get enough relevant recoomendation, please enter the larger distance</Text> */}
      <View
        style={{
          flex: 1,
          height: undefined,
          alignItems: 'center',

          // backgroundColor: 'blue',
          // alignSelf: 'center'
        }}>
        <CustomTextInput
          // autoFocus={true}
          mb={0}
          type="number"
          keyboardType={'number-pad'}
          onChangeText={v => {
            // dispatch(setBudget(prev => ({...prev, accommodation: v})));
            dispatch(setMaxDistance(v));
          }}
          placeholder="Kilometer..."
          value={maxDistance}
          paddingTop={1}
          endAdornment={<Text>Km </Text>}
          marginBottom={1}
          paddingBottom={1}
          textStyle={{paddingTop: 0}}
          style={{
            flex: 1,
            height: undefined,
            padding: 0,
            margin: 0,
            alignSelf: 'center',
          }}
        />
      </View>

      <Text style={styles.subexample}>
        If you do not get enough relevant recoomendation, please enter the
        larger distance
      </Text>
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
    // width: '100%',
  },
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Baloo2-Bold',
    lineHeight: 24 * 1.4,
    height: 24,
    // fontFamily: 'sans-serif-medium',
    // fontWeight: 'bold',
    marginBottom: 20,
  },
  subQuestion: {
    color: '#000000',
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Baloo2-Bold',
    lineHeight: 18 * 1.4,
    // height: 80,
  },
  example: {
    fontSize: 13,
    marginBottom: 15,
    color: '#000000',
    // textAlign: 'justify',
    // marginTop: 5,
    // alignSelf: 'flex-start',
  },
  subexample: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 15,
    textAlign: 'center',
    // alignSelf: 'flex-start',
    color: '#000000',
  },
});

export default PlannerSelectDestinationScreen;
