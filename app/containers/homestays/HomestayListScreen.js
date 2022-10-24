import React, {useEffect, useState, useRef} from 'react';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import Icon from 'react-native-vector-icons/Ionicons';
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
  const [loading, setLoading] = useState(true);
  const [expandFilter, setExpandFilter] = useState(true);
  const [expandSort, setExpandSort] = useState(true);
  const [guests, setGuests] = useState(2);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState([]);
  const [sortRoom, setSortRoom] = useState([]);
  const [reload, setReload] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [roomNum, setRoomNum] = useState(2);
  const {tripPlan} = useSelector(state => state.plannerReducer);
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [prizeRange, setPrizeRange] = useState([50, 1000]);

  useEffect(() => {
    setGuests(adults + children);
  }, [adults, children]);

  // on load and on search, fetch new 10 records
  useEffect(() => {
    setItems([]);
    setLoading(true);
    setFull(false);
    getWithoutAuth(
      `homestays?sort=-avgRating&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
      if (data.length === 0) setFull(true);
      setItems(data);
      setLoading(false);
    });
  }, [search, reload]);

  // getData fetch more data and append to the items array
  const getData = () => {
    if (full) return;
    setLoading(true);
    getWithoutAuth(
      `homestays?sort=-avgRating&offset=${items.length}&limit=10&filter[q]=${search}`,
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
      <View style={{flexDirection: 'column', width: '100%'}}>
        <CustomTextInput
          placeholder="Search Here..."
          value={search}
          onChangeText={t => setSearch(t)}
          startAdornment={
            <Icon
              style={{marginLeft: 10}}
              size={20}
              color="#BDBDBD"
              name="search"
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
                  style={{marginLeft: 10}}
                  size={20}
                  color="#23297a"
                  name="funnel-outline"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: 10}}
                onPress={() => {
                  setExpandSort(current => !current);
                }}>
                <Icon
                  style={{marginLeft: 10}}
                  size={20}
                  color="#23297a"
                  name="options"
                />
              </TouchableOpacity>
            </View>
          }
        />

        <Collapsible collapsed={expandFilter}>
          <Filter
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            setTotalDays={setTotalDays}
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            setGuests={setGuests}
          />
        </Collapsible>

        <Collapsible collapsed={expandSort}>
          <Sort
            sortRoom={sortRoom}
            setSortRoom={setSortRoom}
            setPrizeRange={setPrizeRange}
            setReload={setReload}
            minPriceValue={50}
            maxPriceValue={3000}
            roomNum={roomNum}
            setRoomNum={setRoomNum}
            defaultMinValue={100}
            defaultMaxValue={1500}
          />
        </Collapsible>

        <Card
          style={{
            marginBottom: 10,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            shadowOpacity: 0,
            shadowColor: 'white',
            elevation: 0,
            alignItems: 'center',
          }}>
          {items.map(item => {

            if (
              item.minPrice >= prizeRange[0] &&
              item.minPrice <= prizeRange[1]
            ) {
              if (roomNum == 0)
                return (
                  <HomestayCardItem
                    key={item.id}
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
                          checkInDate: dayjs(checkInDate).format('DD/MM/YYYY'),
                          checkOutDate:
                            dayjs(checkOutDate).format('DD/MM/YYYY'),
                          totalDays,
                          adults: adults,
                          children: children,
                          guests: guests,
                        });
                        console.log(guests, totalDays);
                        console.log(children);
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
                    key={item.id}
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
                          checkInDate: dayjs(checkInDate).format('DD/MM/YYYY'),
                          checkOutDate:
                            dayjs(checkOutDate).format('DD/MM/YYYY'),
                          totalDays,
                          adults: adults,
                          children: children,
                          guests: guests,
                        });
                        console.log(guests, totalDays);
                        console.log(children);
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
            <ModelContent onPress={closeModel} buttonTitle={'Close'}>
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
