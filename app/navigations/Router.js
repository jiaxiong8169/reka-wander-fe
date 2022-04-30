import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useAuth} from '../hooks/useAuth';
import {Alert, useColorScheme} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../containers/auth/SignInScreen';
import {ConfirmPhoneScreen} from '../containers/auth/ConfirmPhoneScreen';
import MainContainer from './MainContainer';
import HomePage from '../containers/Planner/PlannerHomeScreen';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const {authError, setAuthError} = useAuth();
  const scheme = useColorScheme();

  useEffect(() => {
    if (authError) {
      Alert.alert(
        'Warning',
        authError,
        [
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => setAuthError(''),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => setAuthError(''),
        },
      );
    }
  }, [authError]);

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? DefaultTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            options={{headerShown: false}}
            name="HomePage"
            component={HomePage}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="SignInScreen"
            component={SignInScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ConfirmPhone"
            component={ConfirmPhoneScreen}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            options={{headerShown: false}}
            name="MainScreen"
            component={MainContainer}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
