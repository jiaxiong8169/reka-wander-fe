import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {ToWords} from 'to-words';

import {CustomText} from '../texts/custom-text';

export const CheckInOut = ({
  checkInTime,
  checkOutTime,
  additionalRules,
  iconColor,
  checkInTitleStyle,
  checkOutTitleStyle,
  additionalRulesTitleStyle,
  additionalRulesStyle,
}) => {
  const checkInHour = checkInTime.split(':')[0];
  const checkInMins = checkInTime.split(':')[1];
  const formattedCheckIntime = dayjs().hour(checkInHour).minute(checkInMins);

  const checkOutHour = checkOutTime.split(':')[0];
  const checkOutMins = checkOutTime.split(':')[1];
  const formattedCheckOuttime = dayjs().hour(checkOutHour).minute(checkOutMins);

  return (
    <View
      style={{
        paddingTop: 15,
      }}>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 4,
            marginLeft: 12,
          }}>
          <Icon name="clock-outline" size={23} color={iconColor} />
          <CustomText ml="3" fontSize="14" style={checkInTitleStyle}>
            Check-in: {dayjs(formattedCheckIntime).format('hh:mm a')}
          </CustomText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 30,
            alignItems: 'center',
            marginLeft: 12,
          }}>
          <Icon name="clock-outline" size={23} color={iconColor}/>
          <CustomText ml="3" fontSize="14" style={checkOutTitleStyle}>
            Checkout: {dayjs(formattedCheckOuttime).format('hh:mm a')}
          </CustomText>
        </View>
        <Text
          style={[{
            fontSize: 18,
            color: 'black',
            paddingBottom: 7,
            fontWeight: '500',
            marginLeft: 18,
          },additionalRulesTitleStyle]}>
          Additional Rules
        </Text>
        {additionalRules.map((value,index) => (
          <View key={index}>
            <CustomText style={[{marginLeft: 35,},additionalRulesStyle]}>- {value}</CustomText>
          </View>
        ))}
      </View>
    </View>
  );
};
