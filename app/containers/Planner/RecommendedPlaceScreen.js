import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
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

export default function Recommended({navigation}) {
  const dispatch = useDispatch();
  const {tripName} = useSelector(state => state.plannerReducer);
  const {startDate} = useSelector(state => state.plannerReducer);
  const {endDate} = useSelector(state => state.plannerReducer);
  const {pax} = useSelector(state => state.plannerReducer);
  const {budget} = useSelector(state => state.plannerReducer);
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
  const {putWithAuth} = useHttpCall();

  // add navigation listener to prevent back
  useEffect(() => {
    preventBack(navigation, 'Recommend');
  }, [navigation]);

  useEffect(() => {}, [tripPlan]);

  const updateAPI = () => {
    console.log(tripPlan['attractions']);
    const tmp = {
      name: tripName ? tripName : 'My Trip',
      startDate: startDate,
      endDate: endDate,
      pax: pax,
      previousBudget: parseFloat(!!budget ? budget : 0),
      interests: interest,
      kids: kids,
      rentCar: rentCar,
      rentHomestay: rentHomeStay,
      attractions: tripPlan['attractions'],
      restaurants: tripPlan['restaurants'],
      hotels: tripPlan['hotels'],
      vehicles: tripPlan['vihicles'],
      homestays: tripPlan['homestays'],
    };
    putWithAuth(`trips/${tripId}`, tmp)
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
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                    RM {!!budget ? budget : 0}
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
              fieldNameObj={'hotelObjects'}>
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
              fieldNameObj={'hotelObjects'}>
              {tripPlan.hotelObjects.map(item => (
                <RecommendedCardDetails
                  item={item}
                  perks={item.perks}
                  type={'hotels'}
                  url={item.thumbnailSrc}
                  id={item.id}
                  key={item.id}
                  navigation={navigation}
                  styles={{paddingTop: 10}}
                  name={item.name}>
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
              fieldNameObj={'homestayObjects'}>
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
                  styles={{paddingTop: 10}}
                  name={item.name}>
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
              fieldNameObj={'vehicleObjects'}>
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
              fieldNameObj={'vehicleObjects'}>
              {tripPlan.vehicleObjects.map(item => (
                <RecommendedCardDetails
                  item={item}
                  key={item.id}
                  perks={item.perks}
                  type={'vehicles'}
                  url={item.thumbnailSrc}
                  id={item.id}
                  navigation={navigation}
                  styles={{paddingTop: 10}}
                  name={item.name}>
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
              fieldNameObj={'attractionObjects'}>
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
                  styles={{paddingTop: 10}}
                  name={item.name}>
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
                  styles={{paddingTop: 10}}
                  name={item.name}>
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
