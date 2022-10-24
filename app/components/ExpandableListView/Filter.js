import React, {useEffect, useState, useRef} from 'react';
import Card from '../../components/Card';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SelectDates} from '../../components/Filter/SelectDates';
import {SelectGuests} from '../../components/Filter/SelectGuests';
export const Filter = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  setTotalDays,
  adults,
  setAdults,
  children,
  setChildren,
  setGuests,
}) => {
  const onPressExpandLocation = () => {
    setExpandLocation(current => !current);
  };

  return (
    <Card style={{marginBottom: 10, padding: 15}}>
      <View>
        {/* <TouchableOpacity onPress={onPressExpandLocation}>
          <Card
            style={{
              backgroundColor: 'aliceblue',
              shadowColor: 'white',
            }}>
            <Text style={{fontWeight: '400', fontSize: 12}}>Where to?</Text>
            <Text style={{fontWeight: '600', color: 'black', fontSize: 14}}>
              Select A City
            </Text>
          </Card>
        </TouchableOpacity> */}

        <SelectDates
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          setTotalDays={setTotalDays}
        />

        <SelectGuests
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          setGuests={setGuests}
        />
      </View>
    </Card>
  );
};
