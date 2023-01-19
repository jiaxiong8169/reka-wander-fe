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

export const HomestayListScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const fieldName = route?.params?.fieldName;
  const fieldNameObj = route?.params?.fieldNameObj;
  const {planner, plannercheckInDate, plannercheckOutDate, plannertotalDays} =
    route?.params;
  const [loading, setLoading] = useState(true);
  const [expandFilter, setExpandFilter] = useState(true);
  const [expandSort, setExpandSort] = useState(true);
  const [guests, setGuests] = useState(2);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState([]);
  const [reload, setReload] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const [checkInDate, setCheckInDate] = useState(
    // plannercheckInDate ? plannercheckInDate :
    new Date(),
  );
  const [checkOutDate, setCheckOutDate] = useState(
    // plannercheckOutDate ? plannercheckOutDate :
    new Date(),
  );
  const [totalDays, setTotalDays] = useState(
    plannertotalDays ? plannertotalDays : 0,
  );
  const [roomNum, setRoomNum] = useState(0);
  const [propertyType, setPropertyType] = useState('Landed House');
  const {tripPlan} = useSelector(state => state.plannerReducer);
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 3050]);
  const [sorting, setSorting] = useState('minPrice');
  const [priceValueRange, setPriceValueRange] = useState([100, 1500]);
  const [roomTag, setRoomTag] = useState([]);
  const [propertyTag, setPropertyTag] = useState([]);
  const [initial, setInitial] = useState(0);

  const guestData = [
    {label: '1 years old', value: 1},
    {label: '2 years old', value: 2},
    {label: '3 years old', value: 3},
    {label: '4 years old', value: 4},
    {label: '5 years old', value: 5},
    {label: '6 years old', value: 6},
    {label: '7 years old', value: 7},
    {label: '8 years old', value: 8},
    {label: '9 years old', value: 9},
    {label: '10 years old', value: 10},
    {label: '11 years old', value: 11},
    {label: '12 years old', value: 12},
  ];

  const filterRoom = [
    {id: 1, label: 'Any'},
    {id: 2, label: '1'},
    {id: 3, label: '2'},
    {id: 4, label: '3'},
    {id: 5, label: '4'},
  ];

  const filterPropertyType = [
    {id: 1, label: 'Apartment'},
    {id: 2, label: 'Landed House'},
  ];

  const Homestaydata = [
    {label: 'Lower Price', value: 'minPrice'},
    {label: 'Higher Price', value: '-minPrice'},
  ];

  // on load and on search, fetch new 10 records
  useEffect(() => {
    // setItems([]);
    setLoading(true);
    setFull(false);
    getWithoutAuth(
      `homestays?sort=${sorting}&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      if (data.length === 0) setFull(true);
      // console.log(data);
      setItems(data);
      setLoading(false);
    });
  }, [search, reload, sorting]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    getWithoutAuth(
      `homestays?sort=${sorting}&offset=${items.length}&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      let tmp = JSON.parse(JSON.stringify(items));
      Array.prototype.push.apply(tmp, data);
      if (tmp.length === items.length) setFull(true);
      else setFull(false);
      setItems(tmp);
      setLoading(false);
    });
  };

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  const toggleItemSelection = (v, vObj) => {
    let tmp = JSON.parse(JSON.stringify(tripPlan[fieldName]));
    let tmpObj = JSON.parse(JSON.stringify(tripPlan[fieldNameObj]));
    if (tmp) {
      // for array
      const index = tmpObj.findIndex(x => x.id === v);
      if (index !== -1) {
        tmpObj.splice(index, 1);
      } else {
        tmpObj.push(vObj);
      }
      tmp = tmpObj.map(obj => obj.id);
    } else {
      // for undefined
      tmp = v;
      tmpObj = vObj;
    }
    dispatch(setTripPlanbyFieldName(fieldName, tmp));
    dispatch(setTripPlanbyFieldName(fieldNameObj, tmpObj));
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
      <BackButton
        navigation={navigation}
        style={{width: '20%', marginTop: 15}}
      />
      <BlueSubtitle
        text1="Hi Welcome,"
        text2={`Book a Homestay`}
        style={{width: '80%', marginBottom: 10}}
      />
      <View
        
        style={{flexDirection: 'column', width: '100%'}}>
        <CustomTextInput
        
          placeholder="Search Here..."
          value={search}
          onChangeText={t => setSearch(t)}
          padding={1}
          marginHorizontal={1}
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
            screen="Homestay"
            //selectDates
            dateTitle={'Check-in/out Dates'}
            dateLabelStart={'Check In Date'}
            dateLabelEnd={'Check Out Date'}
            startDate={plannercheckInDate ? plannercheckInDate : checkInDate}
            setStartDate={setCheckInDate}
            EndDate={plannercheckOutDate ? plannercheckOutDate : checkOutDate}
            setEndDate={setCheckOutDate}
            setTotalDays={setTotalDays}
            //selectGuests
            guestTitle={'How many guests'}
            guestData={guestData}
            adults={adults}
            setAdults={setAdults}
            min={1}
            max={12}
            guestFirstSuffix={'Adult(s)'}
            guestSecondSuffix={'Children'}
            children={children}
            setChildren={setChildren}
            minChild={0}
            maxChild={12}
            guestSubTitle={"Children's Ages"}
            guestSubContent={'Child'}
            setGuests={setGuests}
            //selectPriceRange
            minPriceValue={priceRange[0]}
            maxPriceValue={priceRange[1]}
            defaultMinValue={priceValueRange[0]}
            defaultMaxValue={priceValueRange[1]}
            setPriceValueRange={setPriceValueRange}
            //selectTagRoom
            roomData={filterRoom}
            roomTag={roomTag}
            setRoomTag={setRoomTag}
            roomNum={roomNum}
            setRoomNum={setRoomNum}
            //selectTagProperty
            propertyData={filterPropertyType}
            propertyTag={propertyTag}
            setPropertyTag={setPropertyTag}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            //search
            setReload={setReload}
          />
        </Collapsible>

        {expandFilter && (
          <Sort
            setSorting={setSorting}
            data={Homestaydata}
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
          }}>
          {items.map((item, i) => {
            if (
              item.minPrice >= priceValueRange[0] &&
              item.minPrice <= priceValueRange[1] &&
              item.propertyType === propertyType
            ) {
              if (roomNum == 0)
                return (
                  <HomestayCardItem
                    key={i}
                    id={item.id}
                    item={item}
                    name={item.name}
                    city={item.city}
                    price={item.minPrice}
                    thumbnailSrc={item.thumbnailSrc}
                    onPress={() => {
                      if (
                        moment(checkInDate).isSame(checkOutDate) ||
                        moment(checkInDate).isAfter(checkOutDate)
                      ) {
                        setIsModelPopUp(true);
                      } else {
                        navigation.navigate('HomestayDetails', {
                          item,
                          checkInDate,
                          checkOutDate,
                          totalDays,
                          adults: adults,
                          children: children,
                          guests: guests,
                          planner: planner,
                        });
                        console.log(checkInDate, totalDays);
                        console.log(checkOutDate);
                      }
                    }}
                    withEdit={!!fieldName && !!fieldNameObj}
                    selected={tripPlan[fieldName]}
                    toggleItemSelection={toggleItemSelection}
                  />
                );
              else if (item.rooms.length == roomNum) {
                return (
                  <HomestayCardItem
                    key={i}
                    id={item.id}
                    item={item}
                    name={item.name}
                    city={item.city}
                    price={item.minPrice}
                    thumbnailSrc={item.thumbnailSrc}
                    onPress={() => {
                      if (
                        moment(checkInDate).isSame(checkOutDate) ||
                        moment(checkInDate).isAfter(checkOutDate)
                      ) {
                        setIsModelPopUp(true);
                      } else {
                        navigation.navigate('HomestayDetails', {
                          item,
                          checkInDate,
                          checkOutDate,
                          totalDays,
                          adults: adults,
                          children: children,
                          guests: guests,
                          planner: planner,
                        });
                        console.log(guests, totalDays);
                        console.log(withEdit);
                      }
                    }}
                    withEdit={!!fieldName && !!fieldNameObj}
                    selected={tripPlan[fieldName]}
                    toggleItemSelection={toggleItemSelection}
                  />
                );
              }
            }
          })}
          <Modal
            isVisible={isModelPopUp}
            onBackdropPress={closeModel}
            onSwipeComplete={closeModel}
            useNativeDriverForBackdrop
            swipeDirection={['left', 'right', 'up', 'down']}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={700}
            animationOutTiming={700}
            backdropTransitionInTiming={700}
            backdropTransitionOutTiming={700}>
            <ModelContent onPress={closeModel} buttonTitle={'Close'} style={{alignItems: 'center'}}>
              <CustomText fontSize="lg" style={{marginBottom: 12}}>
                Invalid Date
              </CustomText>
              <CustomText>
                Your check in and check out dates are invalid. Please make sure
                that the check out date is after check in date.
              </CustomText>
              <CustomText style={{paddingTop: 10}}>
                To edit your check in and check out date, please tap on the
                <CustomText style={{fontWeight: 'bold', fontSize: 15}}>
                  {' '}
                  FILTER
                </CustomText>{' '}
                <Icon
                  style={{marginLeft: 10}}
                  size={15}
                  name="filter-variant"
                />{' '}
                button beside the search bar.
              </CustomText>
            </ModelContent>
          </Modal>
          <LoadMore getData={getData} full={full} loading={loading} />
        </Card>
      </View>
    </GradientBackground>
  );
};
