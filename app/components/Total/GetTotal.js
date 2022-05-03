import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {setCarPrice} from '../../redux/CarRental/actions';
import {useSelector, useDispatch} from 'react-redux';

export const GetTotal = ({diff, price}) => {
  const dispatch = useDispatch();
  const {carPrice} = useSelector(state => state.carReducer);

  // on diff or price change, set new car price
  React.useEffect(() => {
    dispatch(setCarPrice(price * diff));
  }, [diff, price]);

  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon style={{marginRight: 5}} name="pricetag" size={15}></Icon>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginRight: 10,
          }}>
          RM
        </Text>
        <Text
          style={{
            textAlign: 'right',
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          {carPrice ? carPrice : 0}
        </Text>
      </View>
    </View>
  );
};
