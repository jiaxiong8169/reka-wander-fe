import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../hooks/useAuth';
import {StyleSheet, Alert} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../containers/auth/SignInScreen';
import {ConfirmPhoneScreen} from '../containers/auth/ConfirmPhoneScreen';
import MainContainer from './MainContainer';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const {loading, authError, setAuthError} = useAuth();
  const [setModalVisible] = useState(false);

  // TODO: Implement Loading Screen / Overlay
  // if (loading) {
  //   return <Text>Loading</Text>;
  // }

  useEffect(() => {
    if (authError) {
      Alert.alert(
        '',
        authError,
        [
          {
            text: 'Cancel',
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'white',
  },
});
