import {Image} from 'native-base';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

export default function RecommendedCardDetails({
  navigation,
  perks,
  url,
  id,
  name,
  type,
  children,
  item,
  startDate,
  endDate,
}) {
  const getTotalDays = () => {
    if (!startDate || !endDate) return 0;
    return (
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 3600 * 24)
    );
  };

  return (
    <TouchableOpacity
      style={{margin: 4}}
      onPress={() => {
        if (type === 'vehicles') {
          navigation.navigate('CarRentalDetails', {
            item,
            planner: true,
          });
          return;
        }
        if (type === 'homestays') {
          navigation.navigate('HomestayDetails', {
            item,
            planner: true,
            // checkInDate: moment(startDate).format('DD/MM/YYYY'),
            // checkOutDate: moment(endDate).format('DD/MM/YYYY'),
            totalDays: getTotalDays(),
          });
          return;
        }
        navigation.navigate('SpotDetails', {
          type: type,
          item: item,
          id: id,
          planner: true,
        });
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderColor: '#000',
          borderBottomWidth: 1,
          paddingBottom: 10,
          width: '100%',
        }}>
        <Image
          style={{
            flex: 1,
            width: undefined,
            resizeMode: 'contain',
            borderRadius: 5,
            paddingRight: 8,
          }}
          source={{uri: url}}
          alt="recommendation"
        />

        <View
          style={{
            flex: 3,
            flexDirection: 'column',
            marginLeft: 3,
            paddingLeft: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
            }}>
            {name}
          </Text>

          <Text
            style={{
              fontSize: 11,
              color: '#000',
            }}>
            {children}
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            {perks !== '' && (
              <Text
                style={{
                  fontSize: 11,
                  color: '#000',
                }}>
                {perks}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
