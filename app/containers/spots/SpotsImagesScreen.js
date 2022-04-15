import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {SearchIcon, Text, ChevronLeftIcon} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import FastImage from 'react-native-fast-image';
import BlueSubtitle from '../../components/BlueSubtitle';
import {useSelector, useDispatch} from 'react-redux';
import {
  setRestaurants,
  setAttractions,
  setHotels,
  setNearbyAttractions,
  setNearbyRestaurants,
  setNearbyHotels,
} from '../../redux/Nearby/actions';

const {width} = Dimensions.get('window');
//you need to preview n items.
const previewCount = 3;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = width / (previewCount + 0.5);
const startScroll = 0;

export default function SpotsImagesScreen({navigation, route}) {
  const {
    hotels,
    restaurants,
    attractions,
    nearbyHotels,
    nearbyRestaurants,
    nearbyAttractions,
  } = useSelector(state => state.nearbyReducer);
  const dispatch = useDispatch();
  const flatlistRef = React.useRef();
  const {getWithoutAuth} = useHttpCall();
  const [reload, setReload] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const isNearby = route.params ? route.params.isNearby : false;
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
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
      setFirstLoad(false);
      return;
    }
    // else, trigger reload
    setReload(true);
    setFirstLoad(false);
  }, [firstLoad]);

  useEffect(() => {
    if (!reload) return;
    setLoading1(true);
    setLoading2(true);
    setLoading3(true);
    // TODO: Implement pagination
    if (!isNearby) {
      getWithoutAuth('restaurants?sort=-avgRating').then(({data}) => {
        if (!!data) {
          dispatch(setRestaurants(data));
        }
        setLoading1(false);
        setReload(false);
      });
      getWithoutAuth('attractions?sort=-avgRating').then(({data}) => {
        if (!!data) {
          dispatch(setAttractions(data));
        }
        setLoading2(false);
        setReload(false);
      });
      getWithoutAuth('hotels?sort=-avgRating').then(({data}) => {
        if (!!data) {
          dispatch(setHotels(data));
        }
        setLoading3(false);
        setReload(false);
      });
    } else {
      getWithoutAuth(
        'restaurants/nearby?long=101.825410&lat=2.699420&distance=300000&sort=-avgRating',
      ).then(({data}) => {
        if (!!data) {
          dispatch(setNearbyRestaurants(data));
        }
        setLoading1(false);
        setReload(false);
      });
      getWithoutAuth(
        'attractions/nearby?long=101.825410&lat=2.699420&distance=300000&sort=-avgRating',
      ).then(({data}) => {
        if (!!data) {
          dispatch(setNearbyAttractions(data));
        }
        setLoading2(false);
        setReload(false);
      });
      getWithoutAuth(
        'hotels/nearby?long=101.825410&lat=2.699420&distance=300000&sort=-avgRating',
      ).then(({data}) => {
        if (!!data) {
          dispatch(setNearbyHotels(data));
        }
        setLoading3(false);
        setReload(false);
      });
    }
  }, [reload]);

  React.useEffect(() => {
    if (flatlistRef.current)
      flatlistRef.current.scrollToOffset({
        offset: startScroll,
        animated: false,
      });
  }, [flatlistRef]);

  return (
    <GradientBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading1 || loading2 || loading3}
            onRefresh={() => setReload(true)}
          />
        }>
        {!isNearby && (
          <SearchIcon
            size="6"
            mx={2}
            style={{alignSelf: 'flex-end'}}
            onPress={() => navigation.navigate('NearBySearch')}
          />
        )}
        {isNearby && (
          <View style={{flexDirection: 'row'}}>
            <ChevronLeftIcon
              color="gray.500"
              size="xl"
              mt="1"
              marginRight="2"
              onPress={() => navigation.goBack()}></ChevronLeftIcon>
            <BlueSubtitle
              text1={isNearby ? 'Nearby Spots' : ''}
              text2={''}
              style={{marginBottom: 20}}></BlueSubtitle>
          </View>
        )}
        <View style={{marginBottom: 10}}>
          <Text bold fontSize={18} marginLeft={2}>
            {isNearby ? 'Nearby ' : ''} Restaurants {'  '}
            <Text
              underline
              mt="2"
              fontSize={15}
              color="blue.600"
              onPress={() =>
                navigation.navigate('SpotsList', {
                  type: 'restaurants',
                  isNearby: isNearby,
                })
              }>
              {'View More'}
            </Text>
          </Text>
          <FlatList
            ref={flatlistRef}
            horizontal={true}
            decelerationRate={0}
            snapToOffsets={(isNearby ? nearbyRestaurants : restaurants).map(
              (x, i) => i * itemWidth * startScroll,
            )}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={isNearby ? nearbyRestaurants : restaurants}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() =>
                  navigation.navigate('SpotDetails', {
                    type: isNearby ? 'nearbyRestaurants' : 'restaurants',
                    id: item.id,
                  })
                }>
                <FastImage
                  source={{uri: item.thumbnailSrc}}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{marginBottom: 10}}>
          <Text bold fontSize={18} marginLeft={2}>
            {isNearby ? 'Nearby ' : ''}Attractions {'  '}
            <Text
              underline
              mt="2"
              fontSize={15}
              color="blue.600"
              onPress={() =>
                navigation.navigate('SpotsList', {
                  type: 'attractions',
                  isNearby: isNearby,
                })
              }>
              {'View More'}
            </Text>
          </Text>
          <FlatList
            ref={flatlistRef}
            horizontal={true}
            decelerationRate={0}
            snapToOffsets={(isNearby ? nearbyAttractions : attractions).map(
              (x, i) => i * itemWidth * startScroll,
            )}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={isNearby ? nearbyAttractions : attractions}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() =>
                  navigation.navigate('SpotDetails', {
                    type: isNearby ? 'nearbyAttractions' : 'attractions',
                    id: item.id,
                  })
                }>
                <FastImage
                  source={{uri: item.thumbnailSrc}}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{marginBottom: 20}}>
          <Text bold fontSize={18} marginLeft={2}>
            {isNearby ? 'Nearby ' : ''}Hotels {'  '}
            <Text
              underline
              mt="2"
              fontSize={15}
              color="blue.600"
              onPress={() =>
                navigation.navigate('SpotsList', {
                  type: 'hotels',
                  isNearby: isNearby,
                })
              }>
              {'View More'}
            </Text>
          </Text>
          <FlatList
            ref={flatlistRef}
            horizontal={true}
            decelerationRate={0}
            snapToOffsets={(isNearby ? nearbyHotels : hotels).map(
              (x, i) => i * itemWidth * startScroll,
            )}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={isNearby ? nearbyHotels : hotels}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() =>
                  navigation.navigate('SpotDetails', {
                    type: isNearby ? 'nearbyHotels' : 'hotels',
                    id: item.id,
                  })
                }>
                <FastImage
                  source={{uri: item.thumbnailSrc}}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
const styles = StyleSheet.create({
  view: {
    backgroundColor: '#eee',
    width: itemWidth - 20, //20 is margin left and right
    margin: 10,
    height: 140,
    borderRadius: 10,
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#aaa',
  },
});
