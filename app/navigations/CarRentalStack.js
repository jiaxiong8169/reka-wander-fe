import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {CarRentalListScreen} from '../containers/carRental/CarRentalListScreen';
import { CarRentalDetailsScreen } from '../containers/carRental/CarRentalDetailsScreen';

//Screen names
const Stack = createStackNavigator();

export const CarRentalStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="CarRentalList"
          component={CarRentalListScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="CarRentalDetails"
          component={CarRentalDetailsScreen}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};
