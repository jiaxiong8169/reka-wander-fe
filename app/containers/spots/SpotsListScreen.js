import React, {useEffect, useState} from 'react';
import CardItem from '../../components/CardItem';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import {getLocationPermissionAndExecute} from '../../utils/location-utils';
import {RefreshControl, View, TouchableOpacity} from 'react-native';
import {HotelFilterSort} from './HotelFilterSort';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {CustomText} from '../../components/texts/custom-text';
import Collapsible from 'react-native-collapsible';
import {Sort} from '../../components/Sorting/Sort';
import {Filter} from '../../components/ExpandableListView/Filter';
import {RestaurantAttractionFilterSort} from './RestaurantAttractionFilterSort';

export const SpotsListScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [full, setFull] = useState(false);
  const [reload, setReload] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const {type, isNearby} = route.params;
  const [search, setSearch] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [roomNum, setRoomNum] = useState(0);
  // const [priceRange, setPriceRange] = useState([50, 3000]);
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [sorting, setSorting] = useState((type === 'restaurants' || type === 'attractions') ? 'price': 'minPrice');
  // const [priceValueRange, setPriceValueRange] = useState([100, 1500]);
  const [roomTag, setRoomTag] = useState([]);

  // const facilities = {
  //   outdoors: ['Swimming pool', 'Badminton court', 'Garden', 'BBQ facilities'],
  //   services: ['Room Service', 'CCTV outside property'],
  //   general: ['Air Conditioning', 'Fan', 'Safe'],
  //   bathroom: ['Shampoo', 'Hot water', 'Hair Dryer', 'Towels', 'Toilet paper'],
  //   bedroom: ['Extra pillows and blankets', 'Linens', 'Hangers', 'Iron'],
  //   kitchen: ['Electric kettle', 'Refrigerator', 'Stove'],
  //   internet: ['WIFI'],
  //   media: ['TV'],
  // };

  // on load, fetch new 10 records
  useEffect(() => {
    console.log(type);
    setLoading(true);
    setFull(false);
    if (isNearby) {
      getLocationPermissionAndExecute(
        position => {
          let query = `${type}/nearby?long=${position.coords.longitude}&lat=${position.coords.latitude}&distance=300000&sort=${sorting}&limit=10`;
          console.log(query);
          getWithoutAuth(query).then(({data}) => {
            if (data.length === 0) setFull(true);
            setItems(data);
            setLoading(false);
          });
        },
        () => {
          setLoading(false);
          setItems([]);
          if (data.length === 0) setFull(true);
        },
      );
    } else {
      let query = `${type}?sort=${sorting}&limit=10&filter[q]=${search}`;
      getWithoutAuth(query).then(({data}) => {
        setItems(data);
        // console.log(data);
        setLoading(false);
      });
    }
  }, [reload, sorting, search]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);

    if (isNearby) {
      getLocationPermissionAndExecute(
        position => {
          let query = `${type}/nearby?long=${position.coords.longitude}&lat=${position.coords.latitude}&distance=300000&sort=-${sorting}&limit=10&offset=${items.length}`;
          console.log(query);
          getWithoutAuth(query).then(({data}) => {
            let tmp = JSON.parse(JSON.stringify(items));
            Array.prototype.push.apply(tmp, data);
            if (tmp.length === items.length) setFull(true);
            else setFull(false);
            setItems(tmp);
            setLoading(false);
          });
        },
        () => {
          setLoading(false);
          setItems([]);
        },
      );
    } else {
      let query = `${type}?sort=${sorting}&limit=10&offset=${items.length}&filter[q]=${search}`;
      getWithoutAuth(query).then(({data}) => {
        let tmp = JSON.parse(JSON.stringify(items));
        Array.prototype.push.apply(tmp, data);
        if (tmp.length === items.length) setFull(true);
        else setFull(false);
        setItems(tmp);
        setLoading(false);
      });
    }
  };


  return (
    <GradientBackground
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => setReload(!reload)}
        />
      }
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      stickyHeader={true}>
      <BackButton navigation={navigation} style={{width: '20%'}} />
      <BlueSubtitle
        text1={type[0].toUpperCase() + type.substring(1)}
        style={{width: '80%', marginBottom: 10}}
      />
      <View style={{flexDirection: 'column', marginBottom: 10, width: '100%'}}>
        {(type === 'hotels' || type === 'nearbyHotels') ? (
          <View>
            <HotelFilterSort
              setReload={setReload}
              type={type}
              search={search}
              setSearch={setSearch}
              setSorting={setSorting}
              sorting={sorting}
              items={items}
              facilities={items.facilities}
              navigation={navigation}></HotelFilterSort>
          </View>
        ) : (
          <RestaurantAttractionFilterSort
            setReload={setReload}
            type={type}
            navigation={navigation}
            search={search}
            setSearch={setSearch}
            setSorting={setSorting}
            sorting={sorting}
            items={items}></RestaurantAttractionFilterSort>
        )}

        {/* {items.map(item => (
          
          <CardItem
            item={item}
            key={item.id}
            id={item.id}z
            type={type}
            marginBottom={10}
          />
        ))} */}
        <LoadMore getData={getData} full={full} loading={loading} />
      </View>
    </GradientBackground>
  );
};
