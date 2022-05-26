import React, {useEffect, useState} from 'react';
import {View, Avatar, ScrollView} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import {preventBack} from '../../utils/navigation-utils';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {useAuth} from '../../hooks/useAuth';
import {CustomButton} from '../../components/CustomButton';

export const ProfileScreen = ({navigation}) => {
  const {getWithAuth, putWithAuth} = useHttpCall();
  const {authData, setAuthData} = useAuth();

  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileSrc, setProfileSrc] = useState('');

  useEffect(() => {
    preventBack(navigation, 'Profile');
    getProfile();
  }, [navigation]);

  const getProfile = () => {
    return getWithAuth('profile', () =>
      navigation.navigate({name: 'SignInScreen'}),
    ).then(data => {
      // TODO: Implement Profile Container
      const {data: userData} = data;
      setUsername(userData.name ?? '');
      setEmail(userData.email ?? '');
      setPhoneNumber(userData.phoneNumber ?? '');
      setProfileSrc(userData.profileSrc ?? '');
    });
  };

  const handleSaveProfile = () => {
    setIsEditMode(false);
    console.log(authData);
    putWithAuth(
      `users/${authData.id}`,
      {
        name: username,
        email: email,
        phoneNumber: phoneNumber,
      },
      () => navigation.navigate('SignInScreen'),
    ).then(data => {
      setAuthData(data?.data);
    });
  };

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Avatar bg="amber.400" src={{uri: profileSrc}} size="2xl">
            {username
              .split(' ')
              .slice(0, 2)
              .map(token => token.charAt(0))
              .join('')}
          </Avatar>
        </View>
        <CustomTextInput
          fieldLabel={'Username'}
          value={username}
          editable={isEditMode}
          onChangeText={setUsername}></CustomTextInput>
        <CustomTextInput
          fieldLabel={'Email'}
          value={email}
          editable={isEditMode}
          onChangeText={setEmail}></CustomTextInput>
        <CustomTextInput
          fieldLabel={'Phone Number'}
          value={phoneNumber}
          editable={isEditMode}
          onChangeText={setPhoneNumber}></CustomTextInput>
        {!isEditMode ? (
          <CustomButton onPress={() => setIsEditMode(true)}>Edit</CustomButton>
        ) : (
          <>
            <CustomButton onPress={() => {}} style={{marginBottom: 20}}>
              Change Password
            </CustomButton>
            <CustomButton onPress={handleSaveProfile}>Save</CustomButton>
          </>
        )}
      </ScrollView>
    </GradientBackground>
  );
};
