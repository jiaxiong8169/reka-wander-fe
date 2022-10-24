import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {CustomText} from '../texts/custom-text';
import ReadMore from '@fawazahmed/react-native-read-more';

export const About = ({description}) => {
  return (
    <View
      style={{
        borderColor: 'grey',
        borderBottomWidth: 1,
        paddingBottom: 25,
      }}>
      <View style={{borderLeftColor: '#0099FF', borderLeftWidth: 5, borderRadius:4}}>
        <CustomText fontSize="2xl" style={{lineHeight: 35, paddingLeft: 13}}>
          About
        </CustomText>
      </View>
      <ReadMore
        numberOfLines={5}
        seeMoreStyle={{color: 'black'}}
        seeLessStyle={{color: 'black'}}
        style={{paddingTop: 10, paddingBottom: 3, fontSize: 14}}>
        {description}
      </ReadMore>
    </View>
  );
};
