import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {HomestayListScreen} from '../containers/homestays/HomestayListScreen';
import {HomestayDetailsScreen} from '../containers/homestays/HomestayDetailsScreen';
import {HomestaySelectRoomScreen} from '../containers/homestays/HomestaySelectRoomScreen';
import { HomestayRentScreen } from '../containers/homestays/HomestayRentScreen';
//Screen names
const Stack = createStackNavigator();

export const HomestayStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomestaySearch"
          component={HomestayListScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="HomestayDetails"
          component={HomestayDetailsScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="HomestaySelectRoom"
          component={HomestaySelectRoomScreen}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name="HomestayRent"
          component={HomestayRentScreen}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};
