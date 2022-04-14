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
  const flatlistRef = React.useRef();
  const {getWithoutAuth} = useHttpCall();
  const [restaurantData, setRestaurantData] = useState([]);
  const [attractionData, setAttractionData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const isNearby = route.params ? route.params.isNearby : false;

  useEffect(() => {
    setLoading1(true);
    setLoading2(true);
    setLoading3(true);
    if (!isNearby) {
      getWithoutAuth('restaurants?sort=-avgRating').then(({data}) => {
        if (!!data) setRestaurantData(data);
        setLoading1(false);
      });
      getWithoutAuth('attractions?sort=-avgRating').then(({data}) => {
        if (!!data) setAttractionData(data);
        setLoading2(false);
      });
      getWithoutAuth('hotels?sort=-avgRating').then(({data}) => {
        if (!!data) setHotelData(data);
        setLoading3(false);
      });
    } else {
      setLoading1(true);
      setLoading2(true);
      setLoading3(true);
      getWithoutAuth(
        'restaurants/nearby?long=101.825410&lat=2.699420&distance=300000&sort=-avgRating',
      ).then(({data}) => {
        if (!!data) setRestaurantData(data);
        setLoading1(false);
      });
      getWithoutAuth(
        'attractions/nearby?long=101.825410&lat=2.699420&distance=300000&sort=-avgRating',
      ).then(({data}) => {
        if (!!data) setAttractionData(data);
        setLoading2(false);
      });
      getWithoutAuth(
        'hotels/nearby?long=101.825410&lat=2.699420&distance=300000&sort=-avgRating',
      ).then(({data}) => {
        if (!!data) setHotelData(data);
        setLoading3(false);
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
            onRefresh={() => setReload(!reload)}
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
            snapToOffsets={restaurantData.map(
              (x, i) => i * itemWidth * startScroll,
            )}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={restaurantData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() =>
                  navigation.navigate('SpotDetails', {
                    type: 'restaurants',
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
            snapToOffsets={attractionData.map(
              (x, i) => i * itemWidth * startScroll,
            )}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={attractionData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() =>
                  navigation.navigate('SpotDetails', {
                    type: 'attractions',
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
            snapToOffsets={hotelData.map((x, i) => i * itemWidth * startScroll)}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={hotelData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() =>
                  navigation.navigate('SpotDetails', {
                    type: 'hotels',
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
