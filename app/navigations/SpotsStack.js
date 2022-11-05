import * as React from 'react';
import SpotsCommentScreen from '../containers/spots/SpotsCommentScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpotsHomeScreen from '../containers/spots/SpotsHomeScreen';
import {SpotsListScreen} from '../containers/spots/SpotsListScreen';
import NearBySearchScreen from '../containers/spots/NearBySearchScreen';
import SpotDetailsScreen from '../containers/spots/SpotDetailsScreen';
import SpotsImagesScreen from '../containers/spots/SpotsImagesScreen';
import {SearchScreen} from '../containers/spots/SearchScreen';
import {SelectRoomScreen} from '../containers/spots/SelectRoomScreen';
import {HotelConfirmationScreen} from '../containers/spots/HotelConfirmationScreen';
import { HotelRoomDetailsScreen } from '../containers/spots/HotelRoomDetailsScreen';

//Screen names
const Stack = createNativeStackNavigator();

export const SpotsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpotsHome"
        component={SpotsHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpotsList"
        component={SpotsListScreen}
        options={{
          headerShown: false,
        }}
        style={{height: 200}}
      />
      <Stack.Screen
        name="NearBySearch"
        component={NearBySearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpotDetails"
        component={SpotDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpotsImages"
        component={SpotsImagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpotsSearchManually"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpotsComment"
        component={SpotsCommentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SelectRoom"
        component={SelectRoomScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HotelRoomDetails"
        component={HotelRoomDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HotelConfirmation"
        component={HotelConfirmationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
