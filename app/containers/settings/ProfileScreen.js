import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Button, View, Text, TextField, Avatar, ScrollView} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {useAuth} from '../../hooks/useAuth';
import {LoadingOverlay} from '../../components/LoadingOverlay';
import {BackButton} from '../../components/BackButton';
import {CustomButton} from '../../components/CustomButton';

export const ProfileScreen = ({navigation}) => {
  const {putWithAuth} = useHttpCall();
  const {authData, setAuthData} = useAuth();

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileSrc, setProfileSrc] = useState('');

  useEffect(() => {
    getProfile();
  }, [navigation]);

  const getProfile = () => {
    setLoading(true);
    return getWithAuth('profile', () =>
      navigation.navigate({name: 'SignInScreen'}),
    )
      .then(data => {
        // TODO: Implement Profile Container
        const {data: userData} = data;
        setFields(userData);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleSaveProfile = () => {
    setIsEditMode(false);
    console.log(authData);
    setLoading(true);
    putWithAuth(
      `users/${authData.id}`,
      {
        name: username,
        email: email,
        phoneNumber: phoneNumber,
      },
      () => navigation.navigate('SignInScreen'),
    )
      .then(data => {
        const {data: userData} = data;
        setAuthData(({token}) => ({...userData, token}));
        setFields(userData);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const setFields = userData => {
    setUsername(userData.name ?? '');
    setEmail(userData.email ?? '');
    setPhoneNumber(userData.phoneNumber ?? '');
    setProfileSrc(userData.profileSrc ?? '');
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
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <CustomTextInput
            fieldLabel={'Phone Number'}
            defaultValue={phoneNumber}
            editable={false}></CustomTextInput>
        </View>
        {isEditMode && (
          <View style={{alignSelf: 'center'}}>
            <Button
              onPress={() => {
                navigation.navigate('ConfirmPhone', {
                  action: 'update',
                  id: authData.id,
                });
              }}>
              Change
            </Button>
          </View>
        )}
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <CustomTextInput
            fieldLabel={'Password'}
            defaultValue={'********'}
            editable={false}></CustomTextInput>
        </View>
        {isEditMode && (
          <View style={{alignSelf: 'center'}}>
            <Button>Change</Button>
          </View>
        )}
      </View>
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
