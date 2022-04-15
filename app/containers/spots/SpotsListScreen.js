import * as React from 'react';
import {View, Image, RefreshControl, ScrollView} from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import {Button, ChevronLeftIcon, Text} from 'native-base';
import BlueSubtitle from '../../components/BlueSubtitle';
import Card from '../../components/Card';
import {Rating} from 'react-native-ratings';
import {StyleSheet} from 'react-native';
import {useHttpCall} from '../../hooks/useHttpCall';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {
  setRestaurants,
  setAttractions,
  setHotels,
  setNearbyAttractions,
  setNearbyRestaurants,
  setNearbyHotels,
} from '../../redux/Nearby/actions';

export default function SpotsListScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {
    hotels,
    restaurants,
    attractions,
    nearbyHotels,
    nearbyRestaurants,
    nearbyAttractions,
  } = useSelector(state => state.nearbyReducer);
  const {type, isNearby} = route.params;
  const {getWithoutAuth} = useHttpCall();
  const [items, setItems] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [firstLoad, setFirstLoad] = React.useState(true);

  React.useEffect(() => {
    if (!firstLoad) return;
    // if first time loading, skip if cached data exists
    if (
      (!isNearby &&
        restaurants.length > 0 &&
        hotels.length > 0 &&
        attractions.length > 0) ||
      (isNearby &&
        nearbyRestaurants.length > 0 &&
        nearbyHotels.length > 0 &&
        nearbyAttractions.length > 0)
    ) {
      // set items
      if (!isNearby) {
        switch (type) {
          case 'restaurants':
            setItems(restaurants);
            break;
          case 'attractions':
            setItems(attractions);
            break;
          case 'hotels':
            setItems(hotels);
            break;
        }
      } else {
        switch (type) {
          case 'restaurants':
            setItems(nearbyRestaurants);
            break;
          case 'attractions':
            setItems(nearbyAttractions);
            break;
          case 'hotels':
            setItems(nearbyHotels);
            break;
        }
      }
      setFirstLoad(false);
      return;
    }
    // else, trigger reload
    setReload(true);
    setFirstLoad(false);
  }, [firstLoad]);

  React.useEffect(() => {
    if (!reload) return;
    setLoading(true);
    if (!isNearby) {
      getWithoutAuth(`${type}?sort=-avgRating`).then(({data}) => {
        if (!!data) {
          setItems(data);
          // set cache
          switch (type) {
            case 'restaurants':
              dispatch(setRestaurants(data));
              break;
            case 'attractions':
              dispatch(setAttractions(data));
              break;
            case 'hotels':
              dispatch(setHotels(data));
              break;
          }
        }
        setLoading(false);
        setReload(false);
      });
    } else {
      getWithoutAuth(
        `${type}/nearby?long=101.825410&lat=2.699420&distance=300000&sort=-avgRating`,
      ).then(({data}) => {
        if (!!data) {
          setItems(data);
          switch (type) {
            case 'restaurants':
              dispatch(setNearbyRestaurants(data));
              break;
            case 'attractions':
              dispatch(setNearbyAttractions(data));
              break;
            case 'hotels':
              dispatch(setNearbyHotels(data));
              break;
          }
        }
        setLoading(false);
        setReload(false);
      });
    }
  }, [type, reload]);

  return (
    <GradientBackground>
      <View style={{flexDirection: 'row'}}>
        <ChevronLeftIcon
          color="gray.500"
          size="xl"
          mt="1"
          marginRight="2"
          onPress={() => navigation.goBack()}></ChevronLeftIcon>
        <BlueSubtitle
          text1={isNearby ? 'Nearby' : ''}
          text2={type[0].toUpperCase() + type.substring(1)}
          small={isNearby}
          style={{marginBottom: 20}}></BlueSubtitle>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setReload(!reload);
            }}
          />
        }>
        {items.map((item, index) => (
          <Card
            style={{
              height: 150,
              flexDirection: 'row',
              margin: 10,
              marginBottom: index === items.length - 1 ? 80 : 10,
            }}
            key={item.id}>
            <FastImage
              style={{flex: 1, height: undefined, borderRadius: 5}}
              source={{uri: item.thumbnailSrc}}
            />
            <View style={{flex: 3, flexDirection: 'column', marginLeft: 10}}>
              <View style={{flexDirection: 'row', flex: 2}}>
                <View style={{flex: 1}}>
                  <Text bold fontSize={14} letterSpacing="sm" lineHeight="xs">
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: 'auto',
                      marginTop: 2,
                    }}>
                    <Rating
                      imageSize={15}
                      ratingCount={5}
                      startingValue={item.avgRating}
                      readonly
                    />
                  </View>
                  <View style={styles.lineStyle} />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 4,
                    }}>
                    <Image
                      style={{width: 15, height: 15}}
                      source={require('../../assets/pin.png')}
                      tintColor={'#52525b'}
                    />
                    <Text marginLeft="1" fontSize={10} color="gray.600">
                      {item.city}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 4,
                    }}>
                    <Text marginLeft="1" fontSize={8} color="gray.400">
                      {item.reviews.length} reviews
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#D0ECFA',
                    height: undefined,
                    margin: 5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 8,
                  }}>
                  <View>
                    <Text
                      fontSize="12"
                      color="blue.600"
                      style={{textAlign: 'right'}}>
                      {item.perks}
                    </Text>
                    <Text
                      bold
                      lineHeight="xs"
                      fontSize="25"
                      color="blue.600"
                      style={{textAlign: 'right'}}>
                      RM {item.price}
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                size="sm"
                padding="1"
                bg="blue.600"
                _pressed={{bg: 'blue.300', _text: {color: 'white'}}}
                onPress={() => {
                  navigation.navigate('SpotDetails', {
                    type: type,
                    id: item.id,
                  });
                }}>
                View Details
              </Button>
            </View>
          </Card>
        ))}
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.2,
    borderColor: '#rgb(204,204,204)',
  },
});
