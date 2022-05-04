import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Alert, Dimensions} from 'react-native';
import Card from '../../components/card/card';
import Indicator from '../../components/Indicator/Indicator';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/BlueSubtitle';
import {useSelector, useDispatch} from 'react-redux';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
import {setTripId, setTripPlan} from '../../redux/Planner/actions';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';
import {preventBack} from '../../utils/navigation-utils';

const height = Dimensions.get('window').height;

export default function LoadingScreen({navigation}) {
  const dispatch = useDispatch();

  const {authData} = useAuth();
  const {postWithAuth} = useHttpCall();
  const {tripName} = useSelector(state => state.plannerReducer);
  const {startDate} = useSelector(state => state.plannerReducer);
  const {endDate} = useSelector(state => state.plannerReducer);
  const {pax} = useSelector(state => state.plannerReducer);
  const {budget} = useSelector(state => state.plannerReducer);
  const {interest} = useSelector(state => state.plannerReducer);
  const {kids} = useSelector(state => state.plannerReducer);
  const {rentCar} = useSelector(state => state.plannerReducer);
  const {rentHomeStay} = useSelector(state => state.plannerReducer);

  const postAPI = (long, lat) => {
    const tmp = {
      userId: authData && authData.id ? authData.id : '',
      name: tripName ? tripName : 'My Trip',
      startDate: startDate,
      endDate: endDate,
      pax: pax,
      budget: parseFloat(budget),
      interests: interest,
      kids: kids,
      rentCar: rentCar,
      rentHomestay: rentHomeStay,
      long: long,
      lat: lat,
    };
    console.log(tmp);
    postWithAuth('trips/recommend', tmp)
      .then(({data}) => {
        dispatch(setTripPlan(data));
        dispatch(setTripId(data.id)); // set ID for updating later
        navigation.navigate('Recommended'); // navigate to Recommend page
      })
      .catch(err => {
        Alert.alert('Error', JSON.stringify(err));
        navigation.navigate('MyHome');
      });
  };

  const getLocation = () => {
    getLocationPermissionAndExecute(
      position => {
        postAPI(position.coords.longitude, position.coords.latitude);
      },
      () => {
        navigation.navigate('MyHome');
      },
    );
  };

  useEffect(() => {
    preventBack(navigation, 'Loading');
    getLocation();
  }, []);

  return (
    <GradientBackground>
      <BlueSubtitle text1="Hi" text2="Welcome,"></BlueSubtitle>
      <Text style={styles.subtitle}>Create your destiny</Text>
      <Card
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          minHeight: height * 0.4,
          marginTop: '20%',
          margin: 10,
          marginBottom: 20,
        }}>
        <Text style={styles.title}>We are preparing your holiday</Text>
        <Text style={styles.content}>Please wait</Text>
        <Indicator />
      </Card>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  content: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 23,
  },
  subtitle: {
    fontSize: 15,
    color: `#4169E1`,
  },
});
