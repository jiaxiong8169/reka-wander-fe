import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Card from '../../components/card/card';
import moment from 'moment';

export default function RecommendedCard({
  navigation,
  title,
  children,
  styles,
  type,
  fieldName,
  fieldNameObj,
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
    <View>
      <Text
        style={{
          margin: 5,
          fontSize: 20,
          color: `#6A5ACD`,
          fontWeight: '600',
          fontFamily: 'sans-serif-light',
        }}>
        Recommended {title}
      </Text>
      <Card style={{marginVertical: 10}}>
        <View style={styles}>{children}</View>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={{marginTop: 4}}
            onPress={() => {
              // handle homestay separately
              if (type === 'homestays') {
                navigation.navigate('HomestayEdit', {
                  fieldName,
                  fieldNameObj,
                  planner: true,
                  plannercheckInDate: new Date(startDate),
                  plannercheckOutDate: new Date(endDate),
                  // plannercheckInDate: moment(startDate).format('DD/MM/YYYY'),
                  // plannercheckOutDate: moment(endDate).format('DD/MM/YYYY'),
                  plannertotalDays: getTotalDays(),
                });
              } else if (type === 'vehicles') {
                navigation.navigate('CarRentalList', {
                  fieldName,
                  fieldNameObj,
                  planner: true,
                });
              } else
                navigation.navigate('Edit', {
                  planner: true,
                  type: type,
                  fieldName,
                  fieldNameObj,
                });
            }}>
            <Text style={{fontSize: 14, color: '#6A5ACD'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}
