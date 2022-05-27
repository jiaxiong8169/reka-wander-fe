import React, {useEffect} from 'react';
import {StyleSheet, Text, Alert, Dimensions} from 'react-native';
import Card from '../../components/card/card';
import Indicator from '../../components/Indicator/Indicator';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/BlueSubtitle';
import {useSelector, useDispatch} from 'react-redux';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
import {setTripId, setTripPlan} from '../../redux/Planner/actions';
import {preventBack} from '../../utils/navigation-utils';

const height = Dimensions.get('window').height;

export default function LoadingScreen({navigation}) {
  const dispatch = useDispatch();

  const {authData} = useAuth();
  const {postWithAuth} = useHttpCall();
  const {
    tripName,
    startDate,
    endDate,
    pax,
    budget,
    interest,
    kids,
    rentCar,
    rentHomeStay,
    longitude,
    latitude,
  } = useSelector(state => state.plannerReducer);

  const postAPI = () => {
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
      long: longitude,
      lat: latitude,
    };
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

  useEffect(() => {
    preventBack(navigation, 'Loading');
    postAPI();
  }, []);

  return (
    <GradientBackground>
      <BlueSubtitle text1="Hi Welcome," text2="Create Your Destiny" />
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
