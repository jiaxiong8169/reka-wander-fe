import {
  View,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {SearchIcon, Text} from 'native-base';
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
import {BackButton} from '../../components/BackButton';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';
import {CustomButton} from '../../components/CustomButton';

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
  const [reload, setReload] = useState(true);
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

  const getLocation = () => {
    getLocationPermissionAndExecute(
      position => {
        getWithoutAuth(
          `restaurants/nearby?long=${position.coords.longitude}&lat=${position.coords.latitude}&distance=300000&sort=-avgRating&limit=10`,
        ).then(({data}) => {
          if (!!data) {
            dispatch(setNearbyRestaurants(data));
          }
          setLoading1(false);
          setReload(false);
        });
        getWithoutAuth(
          `attractions/nearby?long=${position.coords.longitude}&lat=${position.coords.latitude}&distance=300000&sort=-avgRating&limit=10`,
        ).then(({data}) => {
          if (!!data) {
            dispatch(setNearbyAttractions(data));
          }
          setLoading2(false);
          setReload(false);
        });
        getWithoutAuth(
          `hotels/nearby?long=${position.coords.longitude}&lat=${position.coords.latitude}&distance=300000&sort=-avgRating&limit=10`,
        ).then(({data}) => {
          if (!!data) {
            dispatch(setNearbyHotels(data));
          }
          setLoading3(false);
          setReload(false);
        });
      },
      () => {
        setLoading1(false);
        setLoading2(false);
        setLoading3(false);
        navigation.navigate('SpotsHome');
      },
    );
  };

  useEffect(() => {
    if (!reload) return;
    setLoading1(true);
    setLoading2(true);
    setLoading3(true);
    if (!isNearby) {
      getWithoutAuth('restaurants?sort=-avgRating&limit=10').then(({data}) => {
        if (!!data) {
          dispatch(setRestaurants(data));
        }
        setLoading1(false);
        setReload(false);
      });
      getWithoutAuth('attractions?sort=-avgRating&limit=10').then(({data}) => {
        if (!!data) {
          dispatch(setAttractions(data));
        }
        setLoading2(false);
        setReload(false);
      });
      getWithoutAuth('hotels?sort=-avgRating&limit=10').then(({data}) => {
        if (!!data) {
          dispatch(setHotels(data));
        }
        setLoading3(false);
        setReload(false);
      });
    } else {
      getLocation();
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
    <GradientBackground
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
        <View style={{flexDirection: 'column', marginBottom: 10}}>
          <View style={{flexDirection: 'row'}}>
            <BackButton navigation={navigation} />
            <BlueSubtitle text1={isNearby ? 'Nearby Spots' : ''} text2={''} />
          </View>
        </View>
      )}
      <View style={{marginBottom: 10}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text bold fontSize={18} marginLeft={2}>
            {isNearby ? 'Nearby ' : ''} Restaurants {'  '}
          </Text>
          <CustomButton
            variant="link"
            onPress={() =>
              navigation.navigate('SpotsList', {
                type: 'restaurants',
                isNearby: isNearby,
              })
            }>
            View More
          </CustomButton>
        </View>

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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text bold fontSize={18} marginLeft={2}>
            {isNearby ? 'Nearby ' : ''}Attractions {'  '}
          </Text>
          <CustomButton
            variant="link"
            onPress={() =>
              navigation.navigate('SpotsList', {
                type: 'attractions',
                isNearby: isNearby,
              })
            }>
            View More
          </CustomButton>
        </View>

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

      <View style={{marginBottom: 40}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text bold fontSize={18} marginLeft={2}>
            {isNearby ? 'Nearby ' : ''}Hotels {'  '}
          </Text>
          <CustomButton
            variant="link"
            onPress={() =>
              navigation.navigate('SpotsList', {
                type: 'hotels',
                isNearby: isNearby,
              })
            }>
            View More
          </CustomButton>
        </View>

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
              onPress={() => {
                navigation.navigate('SpotDetails', {
                  type: isNearby ? 'nearbyHotels' : 'hotels',
                  id: item.id,
                });
              }}>
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
