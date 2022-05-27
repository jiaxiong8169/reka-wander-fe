import React, {useState} from 'react';
import {Avatar} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {useAuth} from '../../hooks/useAuth';
import {CustomButton} from '../../components/CustomButton';

export const ProfileScreen = ({navigation}) => {
  const {putWithAuth} = useHttpCall();
  const {authData, setAuthData} = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState(authData.name);
  const [email, setEmail] = useState(authData.email);
  const [phoneNumber, setPhoneNumber] = useState(authData.phoneNumber);
  const [profileSrc, setProfileSrc] = useState(authData.profileSrc);

  const handleSaveProfile = () => {
    setIsEditMode(false);
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
    <GradientBackground
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: '10%',
      }}>
      <Avatar
        bg="amber.400"
        src={{uri: profileSrc}}
        size="2xl"
        marginBottom={5}>
        {username
          .split(' ')
          .slice(0, 2)
          .map(token => token.charAt(0))
          .join('')}
      </Avatar>
      <CustomTextInput
        fieldLabel={'Username'}
        value={username}
        editable={isEditMode}
        onChangeText={setUsername}
        style={{
          marginBottom: 5,
        }}
      />
      <CustomTextInput
        fieldLabel={'Email'}
        value={email}
        editable={isEditMode}
        onChangeText={setEmail}
        style={{
          marginBottom: 5,
        }}
      />
      <CustomTextInput
        fieldLabel={'Phone Number'}
        value={phoneNumber}
        editable={isEditMode}
        onChangeText={setPhoneNumber}
        style={{
          marginBottom: 20,
        }}
      />
      {!isEditMode ? (
        <CustomButton
          onPress={() => setIsEditMode(true)}
          style={{
            width: '100%',
            maxWidth: 200,
          }}>
          Edit
        </CustomButton>
      ) : (
        <>
          <CustomButton
            onPress={() => {}}
            colorScheme="secondary"
            style={{marginBottom: 20, width: '100%', maxWidth: 200}}>
            Change Password
          </CustomButton>
          <CustomButton
            style={{width: '100%', maxWidth: 200}}
            onPress={handleSaveProfile}>
            Save
          </CustomButton>
        </>
      )}
    </GradientBackground>
  );
};
