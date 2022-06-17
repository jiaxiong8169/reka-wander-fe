import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import moment from 'moment';
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
import UserDetails from './PlannerUserDetails';
import {useHttpCall} from '../../hooks/useHttpCall';
import {BackButton} from '../../components/BackButton';
import BlueSubtitle from '../../components/texts/BlueSubtitle';

export const TripHistoryDetails = ({navigation, route}) => {
  const {getWithAuth} = useHttpCall();
  const {id} = route.params;
  const [trip, setTrip] = useState({});

  // on load, fetch item
  useEffect(() => {
    if (!id) return;
    getWithAuth(`trips/${id}`)
      .then(({data}) => {
        setTrip(data);
      })
      .catch(() => {
        // TODO: add error handling
      });
  }, [id]);

  return (
    <GradientBackground
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      stickyHeader={true}>
      <BackButton navigation={navigation} style={{width: '20%'}} />
      <BlueSubtitle
        text1={trip?.name}
        text2={``}
        style={{width: '80%', marginBottom: 10}}
      />
      <View style={{flexDirection: 'column', marginBottom: 10, width: '100%'}}>
        <Card style={{marginVertical: 10}}>
          <View>
            <View style={{flexDirection: 'column', borderBottomColor: '#000'}}>
              <UserDetails
                noEdit
                title={'Trip Name'}
                url={require('../../assets/kid_icon.png')}
                editPage={<TripName />}>
                <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                  {trip?.name}
                </Text>
              </UserDetails>
            </View>

            <View style={{flexDirection: 'column', borderBottomColor: '#000'}}>
              <UserDetails
                noEdit
                title={'Pax'}
                styles={{paddingTop: 10}}
                url={require('../../assets/pax_icon.png')}
                editPage={<PaxPage />}>
                <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                  {trip?.pax}
                </Text>
              </UserDetails>
            </View>

            <View style={{flexDirection: 'column', borderBottomColor: '#000'}}>
              <UserDetails
                noEdit
                title={'Date'}
                styles={{paddingTop: 10}}
                url={require('../../assets/calendar_icon.png')}
                editPage={<ChooseDays />}>
                <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                  {moment(trip?.startDate).format('YYYY-MM-DD')} -{' '}
                  {moment(trip?.endDate).format('YYYY-MM-DD')}
                </Text>
              </UserDetails>
            </View>

            <View style={{flexDirection: 'column', borderBottomColor: '#000'}}>
              <UserDetails
                noEdit
                title={'Travel Interests'}
                styles={{paddingTop: 10}}
                url={require('../../assets/travelInterest_icon.jpg')}
                editPage={<TravelInterest />}>
                <View style={{flex: 3, paddingLeft: 5}}>
                  {!trip?.interests || trip?.interests.length === 0 ? (
                    <View key={'Everything'}>
                      <Text style={{fontSize: 14}}>- Everything</Text>
                    </View>
                  ) : (
                    trip?.interests.map(e => (
                      <View key={e}>
                        <Text style={{fontSize: 14}}>- {e}</Text>
                      </View>
                    ))
                  )}
                </View>
              </UserDetails>
            </View>

            <View style={{flexDirection: 'column'}}>
              <UserDetails
                noEdit
                title={'Kids'}
                styles={{paddingTop: 10}}
                url={require('../../assets/child_icon.jpg')}
                editPage={<Withkids />}>
                <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                  {trip?.kids ? 'Yes' : 'No'}
                </Text>
              </UserDetails>
            </View>

            <View style={{flexDirection: 'column'}}>
              <UserDetails
                noEdit
                title={'Homestay'}
                types={'Homestay'}
                styles={{paddingTop: 10}}
                url={require('../../assets/Home.png')}
                editPage={<RentHomeStay />}>
                <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                  {trip?.rentHomeStay ? 'Yes' : 'No'}
                </Text>
              </UserDetails>
            </View>

            <View style={{flexDirection: 'column', borderBottomColor: '#000'}}>
              <UserDetails
                noEdit
                title={'Car'}
                styles={{paddingTop: 10}}
                url={require('../../assets/car_icon.png')}
                imageStyle={{margin: 2}}
                editPage={<RentCar />}>
                <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                  {trip?.rentCar ? 'Yes' : 'No'}
                </Text>
              </UserDetails>
            </View>

            <View style={{flexDirection: 'column', borderBottomColor: '#000'}}>
              <UserDetails
                noEdit
                title={'Budget'}
                styles={{paddingTop: 10}}
                url={require('../../assets/dollar_icon.png')}
                editPage={<TravelBudget />}>
                <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                  RM{trip?.budget}
                </Text>
              </UserDetails>
            </View>
          </View>
        </Card>
        {/* {trip?.hotelObjects && trip.hotelObjects.length > 0 && (
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
          {trip?.homestayObjects && trip.homestayObjects.length > 0 && (
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
          {trip?.vehicleObjects && trip.vehicleObjects.length > 0 && (
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
          {trip?.attractionObjects && trip.attractionObjects.length > 0 && (
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
          {trip?.restaurantObjects && trip.restaurantObjects.length > 0 && (
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
          )} */}
      </View>
    </GradientBackground>
  );
};
