import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const GuidePackagesSelected = ({style, id, name, price, hours}) => {
  return (
    <View
      key={id}
      style={[
        {
          flexDirection: 'column',
          paddingBottom: 10,
          paddingTop: 10,
        },
        style,
      ]}>
      <View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 3,
            // paddingLeft: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{marginRight: 5, marginTop: 3}}
              name="location"
              size={15}></Icon>
            <Text style={{flex: 7, fontSize: 16}}>Trip Name: </Text>
            <Text style={{fontSize: 16, marginRight: 3}}>{name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{marginRight: 5, marginTop: 3}}
              name="pricetag"
              size={15}></Icon>
            <Text style={{flex: 7, fontSize: 16}}>Price: </Text>
            <Text style={{fontSize: 16, marginRight: 3}}>{price}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{marginRight: 5, marginTop: 3}}
              name="time"
              size={15}></Icon>
            <Text style={{flex: 7, fontSize: 16}}>Hours: </Text>
            <Text style={{fontSize: 16, marginRight: 3}}>{hours}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
