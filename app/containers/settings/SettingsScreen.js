import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button, View, Text} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useAuth} from '../../hooks/useAuth';
import {useHttpCall} from '../../hooks/useHttpCall';
import {preventBack} from '../../utils/navigation-utils';

export const SettingsScreen = ({navigation}) => {
  const {authData, signOut} = useAuth();
  const {getWithAuth} = useHttpCall();

  useEffect(() => {
    preventBack(navigation, 'Settings');
  }, [navigation]);

  const getProfile = () => {
    return getWithAuth('profile', () =>
      navigation.navigate({name: 'SignInScreen'}),
    ).then(data => {
      // TODO: Implement Profile Container
      console.log(data);
    });
  };

  return (
    <GradientBackground>
      <View>
        {!authData && (
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('SignInScreen')}>
            Login
          </Button>
        )}
        {!!authData && (
          <>
            <View>
              <Text>Name: {authData?.name ?? ''}</Text>
              <Text>Email: {authData?.email ?? ''}</Text>
            </View>
            <Button style={styles.button} onPress={() => getProfile()}>
              Profile
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                signOut();
                navigation.navigate('SignInScreen');
              }}>
              Logout
            </Button>
          </>
        )}
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
    marginTop: 4,
  },
});

export default SettingsScreen;
