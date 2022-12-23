import React, {useEffect, useState} from 'react';
import GradientBackground from '../../components/GradientBackground';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import {View, RefreshControl, TouchableOpacity} from 'react-native';
import {BackButton} from '../../components/BackButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../components/Card';
import moment from 'moment';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import {LoadMore} from '../../components/LoadMore';
import CarCardItem from '../../components/CarCardItem';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useDispatch, useSelector} from 'react-redux';
import {setTripPlanbyFieldName} from '../../redux/Planner/actions';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {CustomText} from '../../components/texts/custom-text';
import {Sort} from '../../components/Sorting/Sort';
import {Filter} from '../../components/ExpandableListView/Filter';
import Collapsible from 'react-native-collapsible';

export const CarRentalListScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const fieldName = route?.params?.fieldName;
  const fieldNameObj = route?.params?.fieldNameObj;
  const planner = route?.params?.planner;
  const {tripPlan} = useSelector(state => state.plannerReducer);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const [reload, setReload] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const [expandFilter, setExpandFilter] = useState(true);
  const [expandSort, setExpandSort] = useState(true);
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 1000]);
  const [priceValueRange, setPriceValueRange] = useState([100, 500]);
  const [seats, setSeats] = useState(4);
  const [children, setChildren] = useState([]);
  const [transmissionTag, setTransmissionTag] = useState([]);
  const [transmission, setTransmission] = useState('Auto');
  const [carTypeTag, setCarTypeTag] = useState([]);
  const [carType, setCarType] = useState('Economy Car');
  const [sorting, setSorting] = useState('minPrice');
  const [initial, setInitial] = useState(0);

  const filterTransmission = [
    {id: 1, label: 'Auto', key: 1},
    {id: 2, label: 'Manual', key: 2},
  ];

  const filtertype = [
    {id: 1, label: 'Economy Car', key: 1},
    {id: 2, label: 'SUV', key: 2},
    {id: 3, label: 'MPV', key: 3},
    {id: 4, label: 'Sedan', key: 4},
    {id: 5, label: 'Hatchbacks', key: 5},
  ];

  const CarSortdata = [
    {label: 'Lower Price', value: 'price'},
    {label: 'Higher Price', value: '-price'},
  ];

  // const transmission = 'Manual';
  // const seatNumber = 4;
  // const type = 'economy car';
  const additionalRules = ['Security deposit', "Driver's license requirements"];

  const closeModel = () => {
    setIsModelPopUp(false);
  };
  // on load and on search, fetch new 10 records
  useEffect(() => {
    // setItems([]);
    setLoading(true);
    setFull(false);
    getWithoutAuth(
      `vehicles?sort=${sorting}&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      setItems(data);
      setLoading(false);
      if (data.length === 0) setFull(true);
    });
  }, [search, reload, sorting]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    getWithoutAuth(
      `vehicles?sort=${sorting}&offset=${items.length}&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      let tmp = JSON.parse(JSON.stringify(items));
      Array.prototype.push.apply(tmp, data);
      if (tmp.length === items.length) setFull(true);
      else setFull(false);
      setItems(tmp);
      setLoading(false);
    });
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
        text2={`Rent Your Car`}
        style={{width: '80%', marginBottom: 10}}
      />
      <View style={{width: '100%'}}>
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
            screen="Car"
            //selectDates
            dateTitle={'Pickup/Return Dates'}
            dateLabelStart={'Pickup Date'}
            dateLabelEnd={'Return Date'}
            startDate={pickUpDate}
            setStartDate={setPickUpDate}
            EndDate={returnDate}
            setEndDate={setReturnDate}
            setTotalDays={setTotalDays}
            //selectPriceRange
            setPriceValueRange={setPriceValueRange}
            minPriceValue={priceRange[0]}
            maxPriceValue={priceRange[1]}
            defaultMinValue={priceValueRange[0]}
            defaultMaxValue={priceValueRange[1]}
            //selectGuest
            guestTitle={'How many seats'}
            adults={seats}
            setAdults={setSeats}
            min={4}
            max={7}
            guestFirstSuffix={'seats'}
            children={children}
            //selectTagTransmission
            transmissionData={filterTransmission}
            transmissionTag={transmissionTag}
            settransmissionTag={setTransmissionTag}
            transmission={transmission}
            setTransmission={setTransmission}
            //selectTagCarType
            carTypeData={filtertype}
            carTypeTag={carTypeTag}
            setCarTypeTag={setCarTypeTag}
            carType={carType}
            setCarType={setCarType}
            //search
            setReload={setReload}
          />
        </Collapsible>
        {expandFilter && (
          <Sort
            setSorting={setSorting}
            data={CarSortdata}
            sorting={sorting}
            setInitial={setInitial}
            initial={initial}
          />
        )}
      </View>

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
        {items.map((item, index) => {
          if (
            item.price >= priceValueRange[0] &&
            item.price <= priceValueRange[1] &&
            item.transmission === transmission &&
            item.type === carType
          )
            return (
              <View key={index}>
                <CarCardItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  thumbnailSrc={item.thumbnailSrc}
                  item={item}
                  onPress={() => {
                    if (moment(pickUpDate).isAfter(returnDate)) {
                      setIsModelPopUp(true);
                    } else {
                      navigation.navigate('CarRentalDetails', {
                        item,
                        planner: planner,
                        pickUpDate: pickUpDate,
                        returnDate: returnDate,
                        totalDays,
                      });
                    }
                  }}
                  withEdit={!!fieldName && !!fieldNameObj}
                  selected={tripPlan[fieldName]}
                  toggleItemSelection={toggleItemSelection}
                />
              </View>
            );
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
              Your pickup and return dates are invalid. Please make sure that
              the return date is not before pickup date.
            </CustomText>
            <CustomText style={{paddingTop: 10}}>
              To edit your pickup and return date, please tap on the
              <CustomText style={{fontWeight: 'bold', fontSize: 15}}>
                {' '}
                FILTER <Icon size={16} color="#23297a" name="filter-variant" />
              </CustomText>{' '}
              button beside the search bar.
            </CustomText>
          </ModelContent>
        </Modal>
        <LoadMore getData={getData} full={full} loading={loading} />
      </Card>
    </GradientBackground>
  );
};
