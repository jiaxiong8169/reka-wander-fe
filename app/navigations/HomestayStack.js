import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {HomestaySearchScreen} from '../containers/homestays/HomestaySearchScreen';

//Screen names
const Stack = createStackNavigator();

export const HomestayStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomestaySearch"
          component={HomestaySearchScreen}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};
