import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from '../redux/store';
import {GuideListScreen} from '../containers/guides/GuideListScreen';
import {GuideDetailsScreen} from '../containers/guides/GuideDetailsScreen';
import {PackageListScreen} from '../containers/guides/PackageListScreen';
import SpotsCommentScreen from '../containers/spots/SpotsCommentScreen';

//Screen names
const Stack = createStackNavigator();

export const GuideStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="GuideList"
          component={GuideListScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="GuideDetails"
          component={GuideDetailsScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="SpotsComment"
          component={SpotsCommentScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="PackageList"
          component={PackageListScreen}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
};
