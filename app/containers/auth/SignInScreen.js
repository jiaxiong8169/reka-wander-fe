import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import GoogleAuth from '../../components/GoogleAuth';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import {useIsFocused} from '@react-navigation/native';
import {LoadingOverlay} from '../../components/LoadingOverlay';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {preventBack} from '../../utils/navigation-utils';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import AppleAuth from '../../components/AppleAuth';

const SignInScreen = ({navigation, route}) => {
  const {loading, authData, signIn, setAuthError} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    preventBack(navigation, 'SignIn');
    // navigate users to main page if authenticated
    if (!!authData) navigation.replace('MainScreen');
  }, [authData]);

  // clear all fields when user is redirected to this page
  const clearLoginFields = () => {
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (isFocused) clearLoginFields();
  }, [isFocused]);

  useEffect(() => {
    clearLoginFields();
  }, [isRegister]);

  const checkBeforeRun = func => {
    if (!/^\S+@\S+.com$/.test(email)) {
      setAuthError('Make sure that email is in correct format');
    } else if (
      !/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)
    ) {
      setAuthError(
        'Your password should contain at least 1 upper case letter, 1 lower case letter and 1 number or special character',
      );
    } else {
      func();
    }
  };

  const handleLoginButtonPress = () => {
    signIn(email, password).catch(e => {
      console.log(e);
    });
  };

  const handleRegisterButtonPress = () => {
    checkBeforeRun(() =>
      navigation.navigate('ConfirmPhone', {email, password}),
    );
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#CFDDFC', 'white']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={{height: '100%', width: '100%'}}>
        {loading && <LoadingOverlay />}
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.containerMargin,
                {flex: 1, justifyContent: 'center'},
              ]}>
              <Text style={styles.titleStyle}>Hello Traveller!</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <Pressable
                onPress={() => setIsRegister(false)}
                style={[styles.toggleLeft]}>
                <View
                  style={[
                    isRegister
                      ? styles.toggleInactiveLeft
                      : styles.toggleActive,
                  ]}>
                  <Text
                    style={
                      isRegister
                        ? styles.toggleTextInactive
                        : styles.toggleTextActive
                    }>
                    Sign In
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setIsRegister(true)}
                style={[styles.toggleRight]}>
                <View
                  style={[
                    isRegister
                      ? styles.toggleActive
                      : styles.toggleInactiveRight,
                  ]}>
                  <Text
                    style={
                      isRegister
                        ? styles.toggleTextActive
                        : styles.toggleTextInactive
                    }>
                    Sign Up
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={{flex: 2, justifyContent: 'center'}}>
              <CustomTextInput
                placeholder={'Email'}
                value={email}
                onChangeText={setEmail}
              />
              <PasswordInput password={password} setPassword={setPassword} />
            </View>
            {!isRegister && (
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Pressable onPress={() => navigation.navigate('ResetPassword')}>
                  <Text style={{textAlign: 'right', marginHorizontal: 5}}>
                    Forgot password
                  </Text>
                </Pressable>
              </View>
            )}
            <View styles={{flex: 1, alignItems: 'center'}}>
              <View style={[styles.buttonContainer]}>
                {isRegister ? (
                  <CustomButton onPress={handleRegisterButtonPress}>
                    Register
                  </CustomButton>
                ) : (
                  <CustomButton onPress={handleLoginButtonPress}>
                    Login
                  </CustomButton>
                )}
                <View style={[styles.otherMethod, {marginTop: 20}]}>
                  <View style={styles.continueWithText}>
                    <Text>{isRegister ? 'Register' : 'Login'} with</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <GoogleAuth navigation={navigation} />
                    <AppleAuth navigation={navigation} />
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 1, alignSelf: 'center', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate({name: 'MainScreen'});
                }}>
                <Text>
                  Continue as <Text style={{fontWeight: 'bold'}}>VISITOR</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleStyle: {fontSize: 30, fontWeight: 'bold'},
  subtitleStyle: {fontSize: 20},
  continueWithText: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonContainer: {
    margin: 9,
    padding: 10,
  },
  otherMethod: {
    padding: 3,
    alignItems: 'center',
  },
  placeholder: {color: 'black'},
  containerMargin: {
    marginBottom: 40,
  },
  toggleLeft: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: '#94c9d6',
  },
  toggleRight: {
    backgroundColor: '#94c9d6',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    paddingRight: -4,
  },
  toggleActive: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 50,
    backgroundColor: '#0891B2',
    elevation: 10,
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowColor: '#3c507d',
    shadowOpacity: 2,
  },
  toggleInactiveLeft: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    paddingRight: 10,
  },
  toggleInactiveRight: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    paddingLeft: 10,
  },
  toggleTextActive: {
    fontSize: 18,
    color: '#94c9d6',
  },
  toggleTextInactive: {
    fontSize: 18,
    color: '#0891B2',
  },
});

export default SignInScreen;
