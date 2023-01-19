import React, {useEffect, useState} from 'react';
import BlueSubtitle from '../../components/texts/BlueSubtitle';
import GradientBackground from '../../components/GradientBackground';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHttpCall} from '../../hooks/useHttpCall';
import {LoadMore} from '../../components/LoadMore';
import {BackButton} from '../../components/BackButton';
import Card from '../../components/Card';
import moment from 'moment';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import {RefreshControl, View, TouchableOpacity, Text} from 'react-native';
import {HomestayCardItem} from '../../components/HomestayCardItem';
import {useDispatch, useSelector} from 'react-redux';
import {setTripPlanbyFieldName} from '../../redux/Planner/actions';
import {SimpleCalendar} from '../../components/CalenderPicker/SimpleCalendar';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {CustomText} from '../../components/texts/custom-text';
import Collapsible from 'react-native-collapsible';
import Counter from 'react-native-counters';

export const SelectLocation = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  setTotalDays,
}) => {
  const [expandLocation, setExpandLocation] = useState(true);
  const [expandDates, setExpandDates] = useState(true);
  const [expandGuests, setExpandGuests] = useState(true);
  const [guests, setGuests] = useState(2);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const plusIcon = isPlusDisabled => {
    return <Icon name="add" size={20} color={'#27AAE1'} />;
  };

  const minusIcon = isDisabled => {
    return <Icon name="remove" size={20} color={'#27AAE1'} />;
  };

  useEffect(() => {
    if (moment(checkInDate).isAfter(checkOutDate)) setTotalDays(0);
    else {
      const diff =
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
      setTotalDays(diff);
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    setGuests(adults + children);
  }, [adults, children]);

  const onPressExpandLocation = () => {
    setExpandLocation(current => !current);
  };

  const onPressExpandDates = () => {
    setExpandDates(current => !current);
  };

  const onPressExpandGuests = () => {
    setExpandGuests(current => !current);
  };

  return (
    <View>
      <TouchableOpacity onPress={onPressExpandDates}>
        <Card
          style={{
            backgroundColor: 'aliceblue',
            shadowColor: 'white',
            marginTop: 10,
          }}>
          <Text style={{fontWeight: '400', fontSize: 12}}>
            Select Your Check-in/out Dates
          </Text>
          <Text style={{fontWeight: '600', color: 'black', fontSize: 14}}>
            {dayjs(checkInDate).format('DD/MM/YYYY')} -{' '}
            {dayjs(checkOutDate).format('DD/MM/YYYY')}
          </Text>
        </Card>
      </TouchableOpacity>
      <Collapsible collapsed={expandDates}>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 10,
            justifyContent: 'center',
          }}>
          <SimpleCalendar
            value={checkInDate}
            setValue={setCheckInDate}
            label="Check In Date"
          />
          <SimpleCalendar
            value={checkOutDate}
            setValue={setCheckOutDate}
            label="Check Out Date"
          />
        </View>
      </Collapsible>
    </View>
  );
};
