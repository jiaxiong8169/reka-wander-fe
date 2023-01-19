import React, {useEffect} from 'react';
import {Avatar} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useAuth} from '../../hooks/useAuth';
import {preventBack} from '../../utils/navigation-utils';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';

export const SettingsScreen = ({navigation}) => {
  const {authData, signOut} = useAuth();

  useEffect(() => {
    preventBack(navigation, 'Menu');
  }, [navigation]);

  return (
    <GradientBackground
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      {!authData ? (
        <CustomButton onPress={() => navigation.navigate('SignInScreen')}>
          Login
        </CustomButton>
      ) : (
        <>
          <Avatar
            bg="amber.400"
            src={{uri: authData?.profileSrc}}
            size="2xl"
            marginBottom={5}>
            {authData?.name
              ?.split(' ')
              ?.slice(0, 2)
              ?.map(token => token.charAt(0))
              ?.join('')}
          </Avatar>
          <CustomText>{authData?.name ?? ''}</CustomText>
          <CustomText>{authData?.email ?? ''}</CustomText>
          <CustomButton
            onPress={() => navigation.navigate('Profile')}
            style={{
              marginTop: 20,
              marginBottom: 20,
              width: '100%',
              maxWidth: 200,
            }}>
            Profile
          </CustomButton>
          <CustomButton
            onPress={() => {
              signOut();
              navigation.navigate('SignInScreen');
            }}
            style={{width: '100%', maxWidth: 200}}
            colorScheme="secondary">
            Logout
          </CustomButton>
        </>
      )}
    </GradientBackground>
  );
};
