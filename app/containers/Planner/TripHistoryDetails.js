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
import RecommendedCard from './PlannerRecommendCard';
import RecommendedCardDetails from './PlannerRecommendationCardDetails';
import {RecommendedCardWithData} from '../../components/card/recommended-card-with-data';

export const TripHistoryDetails = ({navigation, route}) => {
  const {getWithAuth} = useHttpCall();
  const {id} = route.params;
  const [trip, setTrip] = useState({});
  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [homestays, setHomestays] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const fetchDataList = (type, values, setResults) => {
    const promises = values.map(id => getWithAuth(`${type}/${id}`));
    Promise.all(promises).then(val => {
      let tmp = val.map(v => v.data);
      setResults(tmp);
    });
  };

  // on load, fetch item
  useEffect(() => {
    if (!id) return;
    getWithAuth(`trips/${id}`)
      .then(({data}) => {
        setTrip(data);
        fetchDataList('restaurants', data.restaurants, setRestaurants);
        fetchDataList('attractions', data.attractions, setAttractions);
        fetchDataList('homestays', data.homestays, setHomestays);
        fetchDataList('hotels', data.hotels, setHotels);
        fetchDataList('vehicles', data.vehicles, setVehicles);
      })
      .catch(e => {
        console.log(e);
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
                  RM{trip?.previousBudget}
                </Text>
              </UserDetails>
            </View>
          </View>
        </Card>
        <RecommendedCardWithData
          navigation={navigation}
          title="Hotel"
          type="hotels"
          data={hotels}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />
        <RecommendedCardWithData
          navigation={navigation}
          title="Homestay"
          type="homestays"
          data={homestays}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />
        <RecommendedCardWithData
          navigation={navigation}
          title="Cars"
          type="vehicles"
          data={vehicles}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />
        <RecommendedCardWithData
          navigation={navigation}
          title="Attractions"
          type="attractions"
          data={attractions}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />
        <RecommendedCardWithData
          navigation={navigation}
          title="Restaurants"
          type="restaurants"
          data={restaurants}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />
      </View>
    </GradientBackground>
  );
};
