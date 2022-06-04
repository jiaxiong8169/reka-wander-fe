import React, {useEffect, useState} from 'react';
import {View, Avatar} from 'native-base';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {useAuth} from '../../hooks/useAuth';
import {CustomButton} from '../../components/CustomButton';
import {BackButton} from '../../components/BackButton';

export const ProfileScreen = ({navigation, route}) => {
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

  useEffect(() => {
    if (route?.params?.phoneNumber) setPhoneNumber(route.params.phoneNumber);
  }, [route?.params?.phoneNumber]);

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
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
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
      .finally(() => {
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
      <View style={{flexDirection: 'row', padding: '3%'}}>
        <BackButton navigation={navigation} />
      </View>
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: '10%',
          paddingVertical: '5%',
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
          defaultValue={phoneNumber}
          editable={false}
          endAdornment={
            isEditMode && (
              <CustomButton
                onPress={() => {
                  navigation.navigate('ConfirmPhone', {
                    action: 'update',
                    id: authData.id,
                  });
                }}>
                Change
              </CustomButton>
            )
          }></CustomTextInput>
        <CustomTextInput
          fieldLabel={'Password'}
          defaultValue={'********'}
          editable={false}
          endAdornment={
            isEditMode && (
              <CustomButton
                onPress={() => {
                  navigation.navigate('ChangePassword');
                }}>
                Change
              </CustomButton>
            )
          }></CustomTextInput>
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
          <CustomButton
            style={{width: '100%', maxWidth: 200}}
            onPress={handleSaveProfile}>
            Save
          </CustomButton>
        )}
      </View>
    </GradientBackground>
  );
};
