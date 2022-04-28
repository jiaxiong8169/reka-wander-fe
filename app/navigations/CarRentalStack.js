import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {CarRentalListScreen} from '../containers/carRental/CarRentalListScreen';

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
      </Stack.Navigator>
    </Provider>
  );
};
