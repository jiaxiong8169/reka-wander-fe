import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, PermissionsAndroid, Alert} from 'react-native';
import Card from '../../components/card/card';
import Indicator from '../../components/Indicator/Indicator';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/BlueSubtitle';
// import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
import Geolocation from '@react-native-community/geolocation';
import {position} from 'native-base/lib/typescript/theme/styled-system';
import {setTripId} from '../../redux/Planner/actions';
import {setLatitude} from '../../redux/Planner/actions';
import {setLongitude} from '../../redux/Planner/actions';
// import {LogBox} from 'react-native';
// LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function LoadingScreen({navigation}) {
  const {tripId} = useSelector(state => state.plannerReducer);
  const dispatch = useDispatch();

  const {authData} = useAuth();
  const {postWithAuth, getWithoutAuth} = useHttpCall();
  const {tripName} = useSelector(state => state.plannerReducer);
  const {startDate} = useSelector(state => state.plannerReducer);
  const {endDate} = useSelector(state => state.plannerReducer);
  const {pax} = useSelector(state => state.plannerReducer);
  const {budget} = useSelector(state => state.plannerReducer);
  const {interest} = useSelector(state => state.plannerReducer);
  const {kids} = useSelector(state => state.plannerReducer);
  const {rentCar} = useSelector(state => state.plannerReducer);
  const {rentHomeStay} = useSelector(state => state.plannerReducer);
  const {longitude} = useSelector(state => state.plannerReducer);
  const {latitude} = useSelector(state => state.plannerReducer);
  // const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
  // const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
  // const kid = kids == true ? 'Yes' : 'No';

  const [Loading, setLoading] = useState(false);
  const [interestID, setInterestID] = useState([]);
  const [currentLatitude, setcurrentLatitude] = useState(0);
  const [currentLongitude, setcurrentLongitude] = useState(0);
  const [lastPosition, setlastPosition] = useState(0.0);
  const [WatchID, setWatchID] = useState(null | 0);

  const getAPI = () => {
    getWithoutAuth('interests?sort=name').then(({data}) => {
      if (!!data) {
        interest.forEach(i => {
          data.forEach(d => {
            if (d.name === i) {
              console.log(d.name);
              console.log(i);
              setInterestID(d.id);
            }
            console.log(interestID);
          });
        });
      }
    });
  };

  const postAPI = () => {
    postWithAuth('trips/recommend', {
      userId: authData && authData.id ? authData.id : 'temporaryDeviceId',
      name: tripName,
      startDate: startDate,
      endDate: endDate,
      pax: pax,
      budget: budget,
      // interests: "62562fb0ff4dde5c4a386a07",
      interests: interestID,
      kids: kids,
      rentCar: rentCar,
      rentHomeStay: rentHomeStay,
      long: longitude,
      lat: latitude,
    })
      .then(({data}) => {
        console.log(data.id);
        dispatch(setTripId(data.id));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setcurrentLongitude(position.coords.longitude);
        dispatch(setLongitude(currentLongitude));
        console.log(longitude);
        console.log('currentLongitude');
        setcurrentLatitude(position.coords.latitude);
        dispatch(setLatitude(currentLatitude));
        console.log(latitude);
        console.log('currentLatitude');
      },
      error => {
        console.log('Error1');
        Alert.alert('Error}1', JSON.stringify(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    let Loading = true;

    // Geolocation.watchPosition(position => {
    //   setlastPosition(position);
    //   console.log('lastPos');
    //   console.log(lastPosition);
    // }, error => console.log('Error3', JSON.stringify(error))
    // );
    // setWatchID(lastPosition);
    getLocation();
    getAPI();
    postAPI();
    if (Loading == true) {
      navigation.navigate('Recommended');
    } else {
      // navigation.navigate('Recommended');
      console.log('Loading true');
    }

    return () => {
      Geolocation.clearWatch(WatchID);
    };

    // setTimeout(() => {
    //   navigation.navigate('Recommended');
    // }, 2000);
  }, []);

  return (
    <GradientBackground>
      <BlueSubtitle text1="Hi" text2="Melvin,"></BlueSubtitle>
      <Text style={styles.subtitle}>Create your destiny</Text>
      <View style={styles.body}>
        <Card>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.title}>We are preparing your holiday</Text>
            <Text style={styles.content}>Please wait</Text>
            <Indicator />
          </View>
        </Card>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  body: {
    // flex: 1,
    height: '60%',
    marginTop: '20%',
    alignItems: 'center',
    // marginHorizontal: '8%',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500',
    // marginBottom: 40,
    // padding: 20,
    textAlign: 'center',
  },
  content: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 23,
    // marginBottom: 30,
  },
  subtitle: {
    fontSize: 15,
    color: `#4169E1`,
  },
});
