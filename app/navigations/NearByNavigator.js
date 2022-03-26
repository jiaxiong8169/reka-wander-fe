
import React from "react";
import { createStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';

import NearByCategoryScreen from '../containers/NearByCategoryScreen';
import NearBySearchScreen from '../containers/NearBySearchScreen';
import NearByDetailsScreen from "../containers/NearByDetailsScreen";

const Stack = createStackNavigator();

export const NearByNavigator = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen name="NearByCategory" component={NearByCategoryScreen} />
          <Stack.Screen name="NearByDetails" component={NearByDetailsScreen} />
        </Stack.Navigator>
      );
  };