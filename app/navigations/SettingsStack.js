import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {SettingsScreen} from '../containers/settings/SettingsScreen';
import {ProfileScreen} from '../containers/settings/ProfileScreen';

//Screen names
const Stack = createStackNavigator();

export const SettingsStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={SettingsScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};
