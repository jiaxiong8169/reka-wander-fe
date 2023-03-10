import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../../components/card/card';
import GradientBackground from '../../components/GradientBackground';
import TripName from './PlannerTripNameScreen';
import PaxPage from './PlannerPaxScreen';
import ChooseDays from './PlannerCalendarScreen';
import TravelBudget from './PlannertravelBudgetScreen';
import TravelInterest from './PlannerTravelinterestScreen';
import Withkids from './PlannerWithkidsScreen';
import RentHomeStay from './PlannerRentHomeStayScreen';
import RentCar from './PlannerRentCarScreen';
import PlannerSelectDestinationScreen from './PlannerSelectDestinationScreen';
import {resetTrip} from '../../redux/Planner/actions';
import UserDetails from './PlannerUserDetails';
import RecommendedCardDetails from './PlannerRecommendationCardDetails';
import RecommendedCard from './PlannerRecommendCard';
import {useHttpCall} from '../../hooks/useHttpCall';
import {preventBack} from '../../utils/navigation-utils';
import {useAuth} from '../../hooks/useAuth';

export default function Recommended({navigation}) {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(true);
  const {tripName} = useSelector(state => state.plannerReducer);
  const {startDate} = useSelector(state => state.plannerReducer);
  const {endDate} = useSelector(state => state.plannerReducer);
  const {pax} = useSelector(state => state.plannerReducer);
  const {
    accommodationBudget,
    restaurantBudget,
    vehicleBudget,
    attractionBudget,
    estimatedBudget,
    maxDistance,
  } = useSelector(state => state.plannerReducer);
  const {interest} = useSelector(state => state.plannerReducer);
  const {kids} = useSelector(state => state.plannerReducer);
  const {rentHomeStay} = useSelector(state => state.plannerReducer);
  const {destination} = useSelector(state => state.plannerReducer);
  const {rentCar} = useSelector(state => state.plannerReducer);
  const {tripId} = useSelector(state => state.plannerReducer);
  const {tripPlan} = useSelector(state => state.plannerReducer);
  const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
  // end date is start date if empty
  const formattedEndDate = moment(endDate ? endDate : startDate).format(
    'YYYY-MM-DD',
  );
  const kid = kids == true ? 'Yes' : 'No';
  const rentHomeStays = rentHomeStay == true ? 'Yes' : 'No';
  const rentCars = rentCar == true ? 'Yes' : 'No';
  const {postWithAuth} = useHttpCall();
  const {authData} = useAuth();

  // add navigation listener to prevent back
  useEffect(() => {
    preventBack(navigation, 'Recommend');
  }, [navigation]);

  useEffect(() => {}, [tripPlan]);

  // useEffect(() => {
  //   navigation.replace('Loading');
  // }, [reload]);

  const updateAPI = () => {
    // if visitor, straight navigate to home page
    if (!authData?.id) {
      dispatch(resetTrip());
      navigation.navigate('Success');
      return;
    }
    // console.log(tripPlan['attractions']);
    const tmp = {
      name: tripName ? tripName : 'My Trip',
      userId: authData && authData.id ? authData.id : '',
      startDate: startDate,
      endDate: endDate,
      pax: pax,
      accommodationBudget: parseFloat(accommodationBudget),
      restaurantBudget: parseFloat(restaurantBudget),
      vehicleBudget: parseFloat(vehicleBudget),
      attractionBudget: parseFloat(attractionBudget),
      estimatedBudget: parseFloat(accommodationBudget)+parseFloat(restaurantBudget)+parseFloat(vehicleBudget)+parseFloat(attractionBudget),
      // previousBudget: parseFloat(!!budget ? budget : 0),
      interests: interest,
      kids: kids,
      rentCar: rentCar,
      rentHomestay: rentHomeStay,
      attractions: tripPlan['attractions'],
      restaurants: tripPlan['restaurants'],
      hotels: tripPlan['hotels'],
      vehicles: tripPlan['vehicles'],
      homestays: tripPlan['homestays'],
      maxDistance: maxDistance,
      destination: destination,
    };
    postWithAuth(`trips`, tmp)
      .then(({data}) => {
        console.log(data);
        dispatch(resetTrip());
        navigation.navigate('Success');
      })
      .catch(err => {
        // TODO: check if this will be redundant
        Alert.alert('Error', JSON.stringify(err));
        navigation.navigate('MyHome');
      });
  };

  return (
    <GradientBackground
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => navigation.replace('Loading')}
        />
      }>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View>
          <Text style={{fontWeight: '300', fontSize: 40, color: `#4169E1`}}>
            Hi{' '}
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'sans-serif-light',
              }}>
              Welcome,
            </Text>
          </Text>
          <Text
            style={{
              margin: 5,
              fontSize: 20,
              color: `#6A5ACD`,
              fontWeight: '700',
              fontFamily: 'sans-serif-light',
              textAlign: 'center',
            }}>
            Your Searching Details
          </Text>
          <Card style={{marginVertical: 10}}>
            <View>
              <Text
                style={{
                  marginBottom: 15,
                  fontSize: 15,
                  fontWeight: '500',
                  textAlign: 'center',
                  color: `#000080`,
                }}>
                Please pull down to{' '}
                <Text style={{color: `#ff4500`}}>REFRESH</Text> the page after
                you edit your trip details
              </Text>
              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <UserDetails
                  title={'Trip Name'}
                  url={require('../../assets/kid_icon.png')}
                  editPage={<TripName />}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {tripName ? tripName : 'My Trip'}
                  </Text>
                </UserDetails>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <UserDetails
                  title={'Destination'}
                  styles={{paddingTop: 10}}
                  url={require('../../assets/pin.png')}
                  editPage={<PlannerSelectDestinationScreen />}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {destination}
                  </Text>
                </UserDetails>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <UserDetails
                  title={'Pax'}
                  styles={{paddingTop: 10}}
                  url={require('../../assets/pax_icon.png')}
                  editPage={<PaxPage />}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {pax}
                  </Text>
                </UserDetails>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <UserDetails
                  title={'Date'}
                  styles={{paddingTop: 10}}
                  url={require('../../assets/calendar_icon.png')}
                  editPage={<ChooseDays />}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {formattedStartDate} - {formattedEndDate}
                  </Text>
                </UserDetails>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <UserDetails
                  title={'Travel Interests'}
                  styles={{paddingTop: 10}}
                  url={require('../../assets/travelInterest_icon.jpg')}
                  editPage={<TravelInterest />}>
                  <View style={{flex: 3, paddingLeft: 5}}>
                    {(!interest || interest.length === 0) && (
                      <View key={'Everything'}>
                        <Text style={{fontSize: 14}}>- Everything</Text>
                      </View>
                    )}
                    {interest.map(e => {
                      return (
                        <View key={e}>
                          <Text style={{fontSize: 14}}>- {e}</Text>
                        </View>
                      );
                    })}
                  </View>
                </UserDetails>
              </View>

              <View style={{flexDirection: 'column'}}>
                <UserDetails
                  title={'Kids'}
                  styles={{paddingTop: 10}}
                  url={require('../../assets/child_icon.jpg')}
                  editPage={<Withkids />}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {kid}
                  </Text>
                </UserDetails>
              </View>

              <View style={{flexDirection: 'column'}}>
                <UserDetails
                  title={'Homestay'}
                  types={'Homestay'}
                  styles={{paddingTop: 10}}
                  url={require('../../assets/Home.png')}
                  editPage={<RentHomeStay />}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {rentHomeStays}
                  </Text>
                </UserDetails>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <UserDetails
                  title={'Car'}
                  styles={{paddingTop: 10}}
                  url={require('../../assets/car_icon.png')}
                  imageStyle={{margin: 2}}
                  editPage={<RentCar />}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {rentCars}
                  </Text>
                </UserDetails>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <UserDetails
                  title={'Budget'}
                  styles={{paddingTop: 10}}
                  url={require('../../assets/dollar_icon.png')}
                  editPage={<TravelBudget />}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    Total RM {parseFloat(accommodationBudget) + parseFloat(restaurantBudget) + parseFloat(vehicleBudget) + parseFloat(attractionBudget)}
                  </Text>
                </UserDetails>
              </View>
            </View>
          </Card>
          {tripPlan.hotelObjects.length <= 0 && (
            <RecommendedCard
              title={'Hotel'}
              styles={{marginVertical: 10}}
              type={'hotels'}
              navigation={navigation}
              fieldName={'hotels'}
              fieldNameObj={'hotelObjects'}
              startDate={startDate}
              endDate={endDate}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'sans-serif-light',
                  textAlign: 'center',
                }}>
                None is Selected. Click edit to browse more.
              </Text>
            </RecommendedCard>
          )}
          {tripPlan.hotelObjects.length > 0 && (
            <RecommendedCard
              title={'Hotel'}
              styles={{flexDirection: 'column'}}
              type={'hotels'}
              navigation={navigation}
              fieldName={'hotels'}
              fieldNameObj={'hotelObjects'}
              startDate={startDate}
              endDate={endDate}>
              {tripPlan.hotelObjects.map(item => (
                <RecommendedCardDetails
                  item={item}
                  perks={item.perks}
                  type={'hotels'}
                  url={item.thumbnailSrc}
                  id={item.id}
                  key={item.id}
                  navigation={navigation}
                  name={item.name}
                  startDate={startDate}
                  endDate={endDate}>
                  {item.description.substring(0, 100) + '...'}
                </RecommendedCardDetails>
              ))}
            </RecommendedCard>
          )}
          {tripPlan.homestayObjects.length <= 0 && (
            <RecommendedCard
              title={'Homestay'}
              styles={{marginVertical: 10}}
              type={'homestays'}
              navigation={navigation}
              fieldName={'homestays'}
              fieldNameObj={'homestayObjects'}
              startDate={startDate}
              endDate={endDate}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'sans-serif-light',
                  textAlign: 'center',
                }}>
                None is Selected. Click edit to browse more.
              </Text>
            </RecommendedCard>
          )}
          {tripPlan.homestayObjects.length > 0 && (
            <RecommendedCard
              title={'Homestay'}
              styles={{flexDirection: 'column'}}
              type={'homestays'}
              navigation={navigation}
              fieldName={'homestays'}
              startDate={startDate}
              endDate={endDate}
              fieldNameObj={'homestayObjects'}>
              {tripPlan.homestayObjects.map(item => (
                <RecommendedCardDetails
                  item={item}
                  key={item.id}
                  perks={item.perks}
                  type={'homestays'}
                  url={item.thumbnailSrc}
                  id={item.id}
                  navigation={navigation}
                  name={item.name}
                  startDate={startDate}
                  endDate={endDate}>
                  {item.description.substring(0, 100) + '...'}
                </RecommendedCardDetails>
              ))}
            </RecommendedCard>
          )}
          {tripPlan.vehicleObjects.length <= 0 && (
            <RecommendedCard
              title={'Car'}
              styles={{marginVertical: 10}}
              type={'vehicles'}
              navigation={navigation}
              fieldName={'vehicles'}
              fieldNameObj={'vehicleObjects'}
              startDate={startDate}
              endDate={endDate}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'sans-serif-light',
                  textAlign: 'center',
                }}>
                None is Selected. Click edit to browse more.
              </Text>
            </RecommendedCard>
          )}
          {tripPlan.vehicleObjects.length > 0 && (
            <RecommendedCard
              title={'Car'}
              styles={{flexDirection: 'column'}}
              type={'vehicles'}
              navigation={navigation}
              fieldName={'vehicles'}
              fieldNameObj={'vehicleObjects'}
              startDate={startDate}
              endDate={endDate}>
              {tripPlan.vehicleObjects.map(item => (
                <RecommendedCardDetails
                  item={item}
                  key={item.id}
                  perks={item.perks}
                  type={'vehicles'}
                  url={item.thumbnailSrc}
                  id={item.id}
                  navigation={navigation}
                  name={item.name}
                  startDate={startDate}
                  endDate={endDate}>
                  {item.description.substring(0, 100) + '...'}
                </RecommendedCardDetails>
              ))}
            </RecommendedCard>
          )}
          {tripPlan.attractionObjects.length <= 0 && (
            <RecommendedCard
              title={'Attractions'}
              styles={{marginVertical: 10}}
              type={'attractions'}
              navigation={navigation}
              fieldName={'attractions'}
              fieldNameObj={'attractionObjects'}
              startDate={startDate}
              endDate={endDate}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'sans-serif-light',
                  textAlign: 'center',
                }}>
                None is Selected. Click edit to browse more.
              </Text>
            </RecommendedCard>
          )}

          {tripPlan.attractionObjects.length > 0 && (
            <RecommendedCard
              title={'Attractions'}
              styles={{flexDirection: 'column'}}
              type={'attractions'}
              navigation={navigation}
              fieldName={'attractions'}
              fieldNameObj={'attractionObjects'}>
              {tripPlan.attractionObjects.map(item => (
                <RecommendedCardDetails
                  item={item}
                  key={item.id}
                  perks={item.perks}
                  type={'attractions'}
                  url={item.thumbnailSrc}
                  id={item.id}
                  navigation={navigation}
                  name={item.name}
                  startDate={startDate}
                  endDate={endDate}>
                  {item.description.substring(0, 100) + '...'}
                </RecommendedCardDetails>
              ))}
            </RecommendedCard>
          )}
          {tripPlan.restaurantObjects.length <= 0 && (
            <RecommendedCard
              title={'Restaurants'}
              styles={{marginVertical: 10}}
              type={'restaurants'}
              navigation={navigation}
              fieldName={'restaurants'}
              fieldNameObj={'restaurantObjects'}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontFamily: 'sans-serif-light',
                  textAlign: 'center',
                }}>
                None is Selected. Click edit to browse more.
              </Text>
            </RecommendedCard>
          )}
          {tripPlan.restaurantObjects.length > 0 && (
            <RecommendedCard
              title={'Restaurants'}
              styles={{flexDirection: 'column'}}
              type={'restaurants'}
              navigation={navigation}
              fieldName={'restaurants'}
              fieldNameObj={'restaurantObjects'}>
              {tripPlan.restaurantObjects.map(item => (
                <RecommendedCardDetails
                  item={item}
                  perks={item.perks}
                  type={'restaurants'}
                  url={item.thumbnailSrc}
                  id={item.id}
                  key={item.id}
                  navigation={navigation}
                  name={item.name}
                  startDate={startDate}
                  endDate={endDate}>
                  {item.description.substring(0, 100) + '...'}
                </RecommendedCardDetails>
              ))}
            </RecommendedCard>
          )}
        </View>
        {/* <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              marginLeft: 50,
              color: '#000',
            }}>
            Total Estimated Costs
          </Text>
          <Text style={{flex: 1, fontSize: 18, color: '#000'}}>
            RM {tripPlan.previousBudget - tripPlan.budget}
          </Text>
        </View> */}
        <View style={{marginTop: 20, marginBottom: 40}}>
          <TouchableOpacity onPress={updateAPI}>
            <Text
              style={{
                color: 'white',
                padding: 12,
                backgroundColor: '#4169E1',
                borderRadius: 50,
                textAlign: 'center',
                marginHorizontal: 80,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
