import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity} from 'react-native';
import {setGuideStartDate, setGuideEndDate} from '../../redux/Guides/actions';

export const CalendarGuide = ({mode, type, styles}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const {guideStartDate, guideEndDate} = useSelector(state => state.guidesReducer);

  // whenever pickup or return date is updated, change display date
  useEffect(() => { 
    const selectedDate = type === 'Start' ? guideStartDate : guideEndDate;
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
  }, [guideStartDate, guideEndDate]);

  const onChange = (event, selectedDate) => {
    // set show false first to avoid double model popup
    setShow(false);

    if (type === 'Start') {
      dispatch(setGuideStartDate(selectedDate));
    }
    if (type === 'End') {
      dispatch(setGuideEndDate(selectedDate));
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
      <Text style={{fontSize: 15, color: '#000'}}>
        Choose a {type} {mode}:
      </Text>
      <View style={{flexDirection: 'row', margin: 5}}>
        {mode === 'date' && (
          <Icon name="calendar-sharp" size={28} color="#000"></Icon>
        )}
        {mode === 'time' && (
          <Icon name="time-outline" size={28} color="#000"></Icon>
        )}

        <TouchableOpacity
          onPress={() => {
            setShow(true);
          }}
          style={{flex: 5}}>
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
              value={type === 'Start' ? guideStartDate : guideEndDate}
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
