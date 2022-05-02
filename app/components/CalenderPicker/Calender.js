import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';

import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import {
  setPickupDate,
  setPickupTime,
  setReturnDate,
  setReturnTime,
} from '../../redux/CarRental/actions';

export const CalendarCar = props => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const {pickUpDate} = useSelector(state => state.carReducer);
  const {pickUpTime} = useSelector(state => state.carReducer);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    //set show false first to avoid double model popup
    setShow(false);
    //set date first to avoid bug
    setDate(currentDate);

    if (mode === 'date') {
      const formattedDate = selectedDate
        ? moment(selectedDate).format('dddd, MMMM Do YYYY')
        : '';
      setDisplayDate(formattedDate);
      if (props.type === 'Pickup') {
        dispatch(setPickupDate(currentDate));
      } 
      if (props.type === 'Return') {
        dispatch(setReturnDate(currentDate));
      }
    }
    if (mode === 'time') {
      const formattedTime = selectedDate
        ? moment(selectedDate).format('h:mm a')
        : '';
      setDisplayDate(formattedTime);
      if (props.type === 'Pickup') {
        dispatch(setPickupTime(currentDate));
      }
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  const showPicker = () => {
    let modes = props.mode;
    showMode(modes);
  };

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        props.styles,
      ]}>
      <Text style={{fontSize: 15, color: '#000'}}>
        Choose a {props.type} {props.mode}:
      </Text>
      <View style={{flexDirection: 'row', margin: 5}}>
        {props.mode === 'date' && (
          <Icon name="calendar-sharp" size={28} color="#000"></Icon>
        )}
        {props.mode === 'time' && (
          <Icon name="time-outline" size={28} color="#000"></Icon>
        )}

        <TouchableOpacity onPress={showPicker} style={{flex: 5}}>
          {/* <TouchableOpacity onPress={showDatepicker} style={{flex: 5}}> */}
          <View
            style={{
              borderColor: 'rgba(69, 69 , 69, 0.7)',
              borderWidth: 1,
              marginRight: 10,
              marginHorizontal: 5,
              padding: 3,
              flexDirection: 'row',
            }}>
            <View style={{flex: 4}}>
              <Text style={{fontSize: 14, color: '#000', textAlign: 'center'}}>
                {displayDate}
                {/* {pickUpDate} */}
                {/* {date.toLocaleString()} */}
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Text>
                <Icon name="caret-down-outline" size={20}></Icon>
              </Text>
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              // mode={props.mode}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
