import React, {useEffect, useState} from 'react';
import Card from '../../components/Card';
import moment from 'moment';
import dayjs from 'dayjs';
import {View, TouchableOpacity, Text} from 'react-native';
import {SimpleCalendar} from '../../components/CalenderPicker/SimpleCalendar';
import Collapsible from 'react-native-collapsible';

export const SelectDates = ({
  title,
  labelStart,
  labelEnd,
  startDate,
  setStartDate,
  EndDate,
  setEndDate,
  setTotalDays,
}) => {
  const [expandDates, setExpandDates] = useState(true);

  useEffect(() => {
    if (moment(startDate).isAfter(EndDate)) setTotalDays(0);
    else {
      const date1 = dayjs(EndDate);
      const diff =
        (EndDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
      setTotalDays(diff);
    }
  }, [startDate, EndDate]);

  const onPressExpandDates = () => {
    setExpandDates(current => !current);
  };

  return (
    <View>
      <TouchableOpacity onPress={onPressExpandDates}>
        <Card
          style={{
            backgroundColor: 'aliceblue',
            shadowColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 2,
            }}>
            <Text style={{fontWeight: '400', fontSize: 11, color: 'black'}}>{title}</Text>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 12}}>
              {dayjs(startDate).format('DD/MM/YYYY')} -{' '}
              {dayjs(EndDate).format('DD/MM/YYYY')}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
      <Collapsible collapsed={expandDates}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <SimpleCalendar
            value={startDate}
            setValue={setStartDate}
            label={labelStart}
          />
          <SimpleCalendar
            value={EndDate}
            setValue={setEndDate}
            label={labelEnd}
          />
        </View>
      </Collapsible>
    </View>
  );
};
