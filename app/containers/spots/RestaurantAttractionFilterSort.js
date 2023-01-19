import React, {useEffect, useState, useRef} from 'react';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import Card from '../../components/Card';
import moment from 'moment';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import {RefreshControl, View, TouchableOpacity} from 'react-native';
import {HomestayCardItem} from '../../components/HomestayCardItem';
import {useDispatch, useSelector} from 'react-redux';
import {setTripPlanbyFieldName} from '../../redux/Planner/actions';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {CustomText} from '../../components/texts/custom-text';
import Collapsible from 'react-native-collapsible';
import {Sort} from '../../components/Sorting/Sort';
import {Filter} from '../../components/ExpandableListView/Filter';
import CardItem from '../../components/CardItem';

export const RestaurantAttractionFilterSort = ({
  navigation,
  setReload,
  search,
  sorting,
  setSorting,
  setSearch,
  items,
  type,
}) => {
  const dispatch = useDispatch();
  const [expandFilter, setExpandFilter] = useState(true);
  const [expandSort, setExpandSort] = useState(true);
  const [guests, setGuests] = useState(2);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState([]);
  const [full, setFull] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [roomNum, setRoomNum] = useState(0);
  const [propertyType, setPropertyType] = useState('Landed House');
  const {tripPlan} = useSelector(state => state.plannerReducer);
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [priceRange, setPriceRange] = useState([5, 500]);
  const [priceValueRange, setPriceValueRange] = useState([20, 300]);
  const [roomTag, setRoomTag] = useState([]);
  const [initial, setInitial] = useState(0);

  const sortingdata = [
    {label: 'Price', value: 'price'},
    {label: 'Rating', value: '-avgRating'},
    {label: 'Popularity', value: '-rateCount'},
  ];

  return (
    <View style={{flexDirection: 'column', width: '100%'}}>
      <CustomTextInput
        placeholder="Search Here..."
        value={search}
        onChangeText={t => setSearch(t)}
        startAdornment={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#23297a"
            name="magnify"
          />
        }
        endAdornment={
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{marginRight: 0}}
              onPress={() => {
                setExpandFilter(current => !current);
              }}>
              <Icon
                style={{marginRight: 13}}
                size={23}
                color="#23297a"
                name="filter-variant"
              />
            </TouchableOpacity>
          </View>
        }
      />

      <Collapsible collapsed={expandFilter}>
        <Filter
          screen="Restaurant"
          //selectPriceRange
          minPriceValue={priceRange[0]}
          maxPriceValue={priceRange[1]}
          defaultMinValue={priceValueRange[0]}
          defaultMaxValue={priceValueRange[1]}
          setPriceValueRange={setPriceValueRange}
          //search
          setReload={setReload}
        />
      </Collapsible>

      {expandFilter && (
        <Sort
          setSorting={setSorting}
          data={sortingdata}
          sorting={sorting}
          setInitial={setInitial}
          initial={initial}
        />
      )}

      <Card
        style={{
          marginBottom: 10,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          shadowOpacity: 0,
          shadowColor: 'white',
          elevation: 0,
          alignItems: 'center',
          width: '100%',
        }}>
        {items.map(item => {
          if (
            item.price >= priceValueRange[0] &&
            item.price <= priceValueRange[1]
          ) {
            return (
              <CardItem
                key={item.id}
                id={item.id}
                item={item}
                type={type}
                marginBottom={10}
                onPress={() => {
                  navigation.navigate('SpotDetails', {
                    items: item,
                    type: type,
                    id: item.id,
                  });
                  console.log(item.id);
                  console.log('123123');
                }}
                //   withEdit={!!fieldName && !!fieldNameObj}
                //   selected={tripPlan[fieldName]}
                //   toggleItemSelection={toggleItemSelection}
              />
            );
          }
        })}
        {/* <LoadMore getData={getData} full={full} loading={loading} /> */}
      </Card>
    </View>
  );
};
