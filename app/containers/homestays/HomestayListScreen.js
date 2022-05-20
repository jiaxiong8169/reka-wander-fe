import React, {useEffect, useState} from 'react';
import BlueSubtitle from '../../components/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import {Text, Input} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import Card from '../../components/Card';
import moment from 'moment';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import {RefreshControl, View} from 'react-native';
import {HomestayCardItem} from '../../components/HomestayCardItem';
import {useDispatch, useSelector} from 'react-redux';
import {setTripPlanbyFieldName} from '../../redux/Planner/actions';
import {CalendarHomestay} from '../../components/CalenderPicker/CalenderHomestay';

export const HomestayListScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const fieldName = route?.params?.fieldName;
  const fieldNameObj = route?.params?.fieldNameObj;
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [full, setFull] = useState(false);
  const {getWithoutAuth} = useHttpCall();
  const {checkInDate, checkOutDate} = useSelector(
    state => state.homestayReducer,
  );
  const {tripPlan} = useSelector(state => state.plannerReducer);
  const [diff, setDiff] = React.useState(0);
  const [isModelPopUp, setIsModelPopUp] = useState(false);

  // on load and on search, fetch new 10 records
  useEffect(() => {
    setItems([]);
    setLoading(true);
    setFull(false);
    getWithoutAuth(
      `homestays?sort=-avgRating&limit=10&filter[q]=${search}`,
    ).then(({data}) => {
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

  React.useEffect(() => {
    const a = moment(checkInDate);
    const b = moment(checkOutDate);
    const D = b.diff(a, 'days');
    setDiff(D + 1);
  }, [checkInDate, checkOutDate]);

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
      }>
      <View style={{flexDirection: 'column', marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <BackButton navigation={navigation} />
          <BlueSubtitle text1="Hi" text2={`Welcome,`} />
        </View>
        {!fieldName && (
          <Text fontSize={17} color="rgb(117,157,246)">
            Book a Homestay
          </Text>
        )}
      </View>

      <Input
        placeholder="Search Here..."
        width="100%"
        borderRadius="4"
        variant="filled"
        fontSize="14"
        value={search}
        onChangeText={t => setSearch(t)}
        shadow="5"
        marginBottom="3"
        InputLeftElement={
          <Icon
            style={{marginLeft: 10}}
            size={20}
            color="#BDBDBD"
            name="search"
          />
        }
      />
      <Card style={{marginBottom: 25}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 5,
              justifyContent: 'center',
            }}>
            <CalendarHomestay mode={'date'} type={'CheckIn'} />
            <CalendarHomestay mode={'date'} type={'CheckOut'} />
          </View>
        </View>
      </Card>
      <Card style={{marginBottom: 10}}>
        {items.map(item => (
          <HomestayCardItem
            key={item.id}
            item={item}
            name={item.name}
            price={item.minPrice}
            thumbnailSrc={item.thumbnailSrc}
            onPress={() => {
              if (moment(checkInDate).isAfter(checkOutDate)) {
                setIsModelPopUp(true);
              } else {
                navigation.navigate('HomestayDetails', {id: item.id});
              }
            }}
            withEdit={!!fieldName && !!fieldNameObj}
            selected={tripPlan[fieldName]}
            toggleItemSelection={toggleItemSelection}
          />
        ))}
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
            <Text style={{fontSize: 20, marginBottom: 12}}>Opps!</Text>
            <Text>
              Opps your date is invalid, please check your pickup and return
              date. Make sure your pickup date is always after return date.
            </Text>
          </ModelContent>
        </Modal>
        <LoadMore getData={getData} full={full} loading={loading} />
      </Card>
    </GradientBackground>
  );
};
