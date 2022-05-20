import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setCarLocation} from '../../redux/CarRental/actions';
import {setHomestayLocation} from '../../redux/Homestay/actions';
import {setGuideLocation} from '../../redux/Guides/actions';
import {Popup} from 'react-native-map-link';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';

export const LocationName = props => {
  const {carLocation} = useSelector(state => state.carReducer);
  const {homestayLocation} = useSelector(state => state.homestayReducer);
  const {guidesLocation} = useSelector(state => state.guidesReducer);
  const dispatch = useDispatch();
  const [currentLong, setCurrentLong] = useState();
  const [currentLat, setCurrentLat] = useState();
  const [Title, setTitle] = useState();
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const closeModel = () => {
    setIsModelPopUp(false);
  };

  const options = {
    latitude: props.lat,
    longitude: props.long,
    sourceLatitude: currentLat,
    sourceLongitude: currentLong,
    title:
      props.type === 'car'
        ? carLocation
        : props.type === 'homestay'
        ? homestayLocation
        : guidesLocation,
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
    if (!props.lat || !props.long) return;
    getAddressFromCoordinates(props.lat, props.long);
    getLocation();
  }, [props.lat, props.long]);

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
          if (props.type === 'car') {
            let result =
              resJson.Response.View[0].Result[0].Location.Address.Label;
            dispatch(
              setCarLocation(
                // resJson.Response.View[0].Result[0].Location.Address.Label,
                result
              ),
            );
          }
          if (props.type === 'homestay') {
            let result =
              resJson.Response.View[0].Result[0].Location.Address.Label;
            dispatch(
              setHomestayLocation(
                // resJson.Response.View[0].Result[0].Location.Address.Label,
                result
              ),
            );
          }
          if (props.type === 'guide') {
            let result =
              resJson.Response.View[0].Result[0].Location.Address.Label;
            dispatch(
              setGuideLocation(
                // resJson.Response.View[0].Result[0].Location.Address.Label
                result,
              ),
            );
          }
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
          {props.type === 'car' && (
            <Text style={{fontSize: 15, color: '#000'}}>{carLocation}</Text>
          )}
          {props.type === 'homestay' && (
            <Text style={{fontSize: 15, color: '#000'}}>
              {homestayLocation}
            </Text>
          )}
          {props.type === 'guide' && (
            <Text style={{fontSize: 15, color: '#000'}}>{guidesLocation}</Text>
          )}
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
