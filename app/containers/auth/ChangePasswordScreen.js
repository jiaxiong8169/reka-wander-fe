import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {CustomButton} from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import GradientBackground from '../../components/GradientBackground';
import {useHttpCall} from '../../hooks/useHttpCall';
import {BackButton} from '../../components/BackButton';

export const ChangePasswordScreen = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);

  const {putWithAuth} = useHttpCall();

  const handleChangePassword = () => {
    putWithAuth('auth/changepassword', {oldPassword, newPassword})
      .then(() => {
        console.log('ok now');
        navigation.navigate('Profile');
      })
      .catch(err => {
        console.log(JSON.stringify({err}));
      });
  };

  useEffect(() => {
    if (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0
    ) {
      if (newPassword !== confirmPassword) {
        setPasswordNotMatch(true);
        setDisableButton(true);
      } else {
        setPasswordNotMatch(false);
        setDisableButton(false);
      }
    } else {
      setDisableButton(true);
    }
  }, [oldPassword, newPassword, confirmPassword]);

  return (
    <GradientBackground stickyHeader={true}>
      <View style={{alignItems: 'flex-start'}}>
        <BackButton navigation={navigation} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: '10%',
          alignItems: 'center',
        }}>
        <CustomTextInput
          fieldLabel="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
          type="password"></CustomTextInput>
        <CustomTextInput
          fieldLabel="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          type="password"></CustomTextInput>
        <CustomTextInput
          fieldLabel="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          type="password"></CustomTextInput>
        {passwordNotMatch && (
          <Text style={{color: 'red'}}>Password does not match.</Text>
        )}
        <CustomButton onPress={handleChangePassword} isDisabled={disableButton}>
          Change password
        </CustomButton>
      </View>
    </GradientBackground>
  );
};
