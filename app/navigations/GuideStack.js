import * as React from 'react';
import {GuideListScreen} from '../containers/guides/GuideListScreen';
import {GuideDetailsScreen} from '../containers/guides/GuideDetailsScreen';
import {PackageListScreen} from '../containers/guides/PackageListScreen';
import SpotsCommentScreen from '../containers/spots/SpotsCommentScreen';
import {GuideConfirmationScreen} from '../containers/guides/GuideConfirmationScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const GuideStack = () => {
  return (
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
      <Stack.Screen
        name="Confirmation"
        component={GuideConfirmationScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
