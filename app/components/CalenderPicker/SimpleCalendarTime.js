import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, TouchableOpacity} from 'react-native';
import {CustomText} from '../texts/custom-text';

export const SimpleCalendarTime = ({value, setValue, label}) => {
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');

  // change display date whenever the value has changed
  useEffect(() => {
    const formattedDate = value ? moment(value).format('h:mm a') : '';
    setDisplayDate(formattedDate);
  }, [value]);

  const onChange = (event, selectedDate) => {
    // set show false first to avoid double model popup
    setShow(false);
    setValue(selectedDate);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <CustomText color="gray.500">{label}</CustomText>
      <View style={{flexDirection: 'row', margin: 5}}>
        <Icon name="time-outline" size={28} />
        <TouchableOpacity
          onPress={() => {
            setShow(true);
          }}>
          <View
            style={{
              borderWidth: 0.5,
              marginRight: 10,
              marginHorizontal: 5,
              padding: 3,
              flexDirection: 'row',
            }}>
            <CustomText color="gray.500">{displayDate}</CustomText>
            <Icon name="caret-down-outline" size={20} />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              disabled
              value={value}
              mode="time"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
