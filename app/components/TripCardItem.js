import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import Card from '../components/Card';
import moment from 'moment';
import {CustomButton} from './CustomButton';

export const TripCardItem = ({navigation, item, marginBottom}) => {
  return (
    <Card
      style={{
        margin: 10,
        marginBottom: marginBottom,
      }}>
      <View
        style={{
          marginBottom: 10,
        }}>
        <Text
          fontSize="xl"
          style={{
            color: 'rgb(117,157,246)',
          }}>
          {item.name}
        </Text>
        <Text fontSize="xs">
          {moment(item.timestamp).format('dddd, MMMM Do YYYY h:mm a')}
        </Text>
        <Text fontSize="xs">Est. Cost: RM {item.budget.toFixed(2)}</Text>
        <Text fontSize="xs">
          {moment(item.startDate).format('dddd, MMMM Do YYYY')} -{' '}
          {moment(item.endDate).format('dddd, MMMM Do YYYY')}
        </Text>
      </View>
      <CustomButton
        size="sm"
        onPress={() => {
          navigation.navigate('TripHistoryDetails', {
            id: item.id,
          });
        }}>
        View Details
      </CustomButton>
    </Card>
  );
};
