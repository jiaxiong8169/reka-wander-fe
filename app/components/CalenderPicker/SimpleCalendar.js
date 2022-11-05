import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, TouchableOpacity} from 'react-native';
import {CustomText} from '../texts/custom-text';

export const SimpleCalendar = ({value, setValue, label}) => {
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');

  // change display date whenever the value has changed
  useEffect(() => {
    const formattedDate = value ? moment(value).format('DD/MM/YYYY') : '';
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
        justifyContent: 'center',

      }}>
      <CustomText style={{fontSize: 12}}>
        {label}
      </CustomText>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          // marginHorizontal: 5,
          alignItems: 'center',
        }}>
        <Icon name="calendar-sharp" size={23} />
        <TouchableOpacity
          onPress={() => {
            setShow(true);
          }} style={{paddingLeft: 5}}>
          <View
            style={{
              borderWidth: 0.5,
              // marginRight: 10,
              // marginHorizontal: 5,
              padding: 2,
              flexDirection: 'row',
              alignItems: 'center',
              // display: 'flex',
            }}>
            <CustomText
              color="gray.500"
              style={{fontSize: 12, paddingRight: 3}}>
              {displayDate}
            </CustomText>
            <Icon name="caret-down-outline" size={13} />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              disabled
              value={value}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
