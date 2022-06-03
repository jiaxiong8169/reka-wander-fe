import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity} from 'react-native';
import {setCheckInDate, setCheckOutDate} from '../../redux/Homestay/actions';

export const CalendarHomestay = ({mode, type, styles}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const {checkInDate, checkOutDate} = useSelector(
    state => state.homestayReducer,
  );

  // whenever pickup or return date is updated, change display date
  useEffect(() => {
    const selectedDate = type === 'CheckIn' ? checkInDate : checkOutDate;
    if (mode === 'date') {
      const formattedDate = selectedDate
        ? moment(selectedDate).format('DD/MM/YYYY')
        : '';
      setDisplayDate(formattedDate);
    }
    if (mode === 'time') {
      const formattedTime = selectedDate
        ? moment(selectedDate).format('h:mm a')
        : '';
      setDisplayDate(formattedTime);
    }
  }, [checkInDate, checkOutDate]);

  const onChange = (event, selectedDate) => {
    // set show false first to avoid double model popup
    setShow(false);

    if (type === 'CheckIn') {
      let a = selectedDate;
      dispatch(setCheckInDate(a));
      console.log(checkInDate);
      console.log(selectedDate);
    }
    if (type === 'CheckOut') {
      dispatch(setCheckOutDate(selectedDate));
      console.log(checkOutDate);
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        styles,
      ]}>
      <Text style={{fontSize: 15, color: '#000080', fontWeight: '300'}}>
        {type} {mode}:
      </Text>
      <View style={{flexDirection: 'row', margin: 5}}>
        {mode === 'date' && <Icon name="calendar-sharp" size={28}></Icon>}
        {mode === 'time' && (
          <Icon name="time-outline" size={28} color="#000080"></Icon>
        )}

        <TouchableOpacity
          onPress={() => {
            setShow(true);
          }}
          style={{}}>
          <View
            style={{
              borderWidth: 0.5,
              marginRight: 10,
              marginHorizontal: 5,
              padding: 3,
              flexDirection: 'row',
            }}>
            <View>
              <Text style={{fontSize: 14, textAlign: 'center'}}>
                {displayDate}
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
              disabled
              value={type === 'CheckIn' ? checkInDate : checkOutDate}
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
