import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {ToWords} from 'to-words';

import {CustomText} from '../texts/custom-text';

export const Facilities = ({
  facilities,
  iconName,
  title,
  styleSubContent,
  titleStyle,
  iconColor,
  valueStyle,
}) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <View style={[styles.subcontent,styleSubContent]}>
        <Icon name={iconName} size={23} color={iconColor} />
        <CustomText style={[styles.subtitleText,titleStyle]}>{title}</CustomText>
      </View>
      <View style={{paddingLeft: 35}}>
        {facilities.map((value,index) => (
          <View style={{}} key={index}>
            <CustomText style={valueStyle}>{value}</CustomText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitleText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginLeft: 12,
  },
  subcontent: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 5,
    alignItems: 'center',
  },
});
