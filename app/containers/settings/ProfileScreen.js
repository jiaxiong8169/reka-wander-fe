import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Button, View, Text, TextField, Avatar, ScrollView} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import {preventBack} from '../../utils/navigation-utils';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useAuth} from '../../hooks/useAuth';
import {LoadingOverlay} from '../../components/LoadingOverlay';
import {BackButton} from '../../components/BackButton';

export const ProfileScreen = ({navigation}) => {
  const {getWithAuth, putWithAuth} = useHttpCall();
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
    <GradientBackground>
      {loading && <LoadingOverlay />}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <BackButton navigation={navigation} />
      </View>
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
          <CustomButton onPress={() => setIsEditMode(true)}>Edit</CustomButton>
        ) : (
          <CustomButton onPress={handleSaveProfile}>Save</CustomButton>
        )}
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
    marginTop: 4,
  },
});
