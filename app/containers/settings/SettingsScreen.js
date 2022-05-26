import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button, View, Text, Avatar} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useAuth} from '../../hooks/useAuth';
import {useHttpCall} from '../../hooks/useHttpCall';
import {preventBack} from '../../utils/navigation-utils';
import {CustomButton} from '../../components/CustomButton';

export const MenuScreen = ({navigation}) => {
  const {authData, signOut} = useAuth();
  const {getWithAuth} = useHttpCall();

  useEffect(() => {
    preventBack(navigation, 'Menu');
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
        {!authData ? (
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('SignInScreen')}>
            Login
          </Button>
        ) : (
          <>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Avatar
                  bg="amber.400"
                  src={{uri: authData?.profileSrc}}
                  size="2xl">
                  {authData?.name
                    ?.split(' ')
                    ?.slice(0, 2)
                    ?.map(token => token.charAt(0))
                    ?.join('')}
                </Avatar>
              </View>
              <Text>Name: {authData?.name ?? ''}</Text>
              <Text>Email: {authData?.email ?? ''}</Text>
            </View>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate('Profile')}>
              Profile
            </CustomButton>
            <CustomButton
              onPress={() => {
                signOut();
                navigation.navigate('SignInScreen');
              }}
              colorScheme="secondary">
              Logout
            </CustomButton>
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
