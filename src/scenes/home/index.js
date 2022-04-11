import React from 'react';
import {Text, Button, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import {useHttpCall} from '../../hooks/useHttpCall';

export const HomeScreen = ({navigation}) => {
  const {authData, setAuthError} = useAuth();
  const {getWithAuth} = useHttpCall();

  const getProfile = () => {
    console.log('profile again');
    return getWithAuth(
      '/profile',
      undefined,
      false,
      () => navigation.navigate({name: 'Sign In Screen'}),
      authData,
    )
      .then(data => {
        console.log({data});
      })
      .catch(err => {
        console.log({err});
        err.response.json().then(data => setAuthError(data.message));
      });
  };

  return (
    <View>
      <Text>Welcome, {authData?.name}</Text>
      <Button
        onPress={() => navigation.navigate({name: 'Spot Screen'})}
        title="Spots"
      />
      <Button onPress={getProfile} title="Profile" />
      <Button
        onPress={() => navigation.navigate({name: 'Sign In Screen'})}
        title="Login"
      />
    </View>
  );
};
