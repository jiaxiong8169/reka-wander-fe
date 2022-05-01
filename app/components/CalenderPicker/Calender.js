import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';

export const CalendarCar = props => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [displayDate, setDisplayDate] = useState('');

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
    }
    if (mode === 'time') {
      const formattedTime = selectedDate
        ? moment(selectedDate).format('h:mm a')
        : '';
      setDisplayDate(formattedTime);
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
      <Text style={{fontSize: 15, color: '#000'}}>Choose a {props.type} {props.mode}:</Text>
      <View style={{flexDirection: 'row', margin: 5}}>
        <Image
          style={{flex: 1, height: undefined, resizeMode: 'contain'}}
          source={props.url}
          // source={require('../../assets/clock_icon.png')}
        />
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
              <Text style={{fontSize: 14, color: '#000'}}>
                {displayDate}
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
