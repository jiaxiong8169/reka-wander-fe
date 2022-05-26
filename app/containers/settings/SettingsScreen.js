import React, {useEffect} from 'react';
import {View, Text, Avatar} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useAuth} from '../../hooks/useAuth';
import {preventBack} from '../../utils/navigation-utils';
import {CustomButton} from '../../components/CustomButton';

export const MenuScreen = ({navigation}) => {
  const {authData, signOut} = useAuth();

  useEffect(() => {
    preventBack(navigation, 'Menu');
  }, [navigation]);

  return (
    <GradientBackground>
      <View>
        {!authData ? (
          <CustomButton onPress={() => navigation.navigate('SignInScreen')}>
            Login
          </CustomButton>
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
            <CustomButton
              onPress={() => navigation.navigate('Profile')}
              style={{marginBottom: 20}}>
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
