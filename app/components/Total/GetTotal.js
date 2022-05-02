import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  setCarPrice,
  setPickupTime,
  setReturnDate,
  setReturnTime,
} from '../../redux/CarRental/actions';
import {useSelector, useDispatch} from 'react-redux';

export const GetTotal = props => {
  const dispatch = useDispatch();
  const {carPrice} = useSelector(state => state.carReducer);
  const diff = props.diff;
  const price = props.price;

  React.useEffect(() => {
    updateTotalPrice(price, diff);
  }, [diff, carPrice]);

  const updateTotalPrice = (price, difference) => {
    const total = price * difference;
    dispatch(setCarPrice(total));
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <Icon name="pricetag" size={25} color="#000"></Icon>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#000',
            }}>
            RM
          </Text>
        </View>
        <View style={{flex: 3, marginRight: 10}}>
          {!!carPrice && (
            <Text
              style={{
                textAlign: 'right',
                fontSize: 40,
                fontWeight: 'bold',
                color: '#FF0000',
              }}>
              {props.carPrice}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
