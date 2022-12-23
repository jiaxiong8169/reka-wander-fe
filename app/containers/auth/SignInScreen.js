import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import GoogleAuth from '../../components/GoogleAuth';
import {SafeAreaView} from 'react-native-safe-area-context';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import {useIsFocused} from '@react-navigation/native';
import {LoadingOverlay} from '../../components/LoadingOverlay';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {CustomButton} from '../../components/CustomButton';
import {preventBack} from '../../utils/navigation-utils';
import AppleAuth from '../../components/AppleAuth';
import {Image, Box, VStack, Flex, PresenceTransition} from 'native-base';

const SignInScreen = ({navigation, route}) => {
  const {loading, authData, signIn, setAuthError} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const isFocused = useIsFocused();
  const [isOpen, setIsOpen] = useState(false);
  // isRegisterSlow is needed so that the content changes only
  const [isRegisterSlow, setIsRegisterSlow] = useState(isRegister);
  const initial = useMemo(() => {
    if (isRegisterSlow)
      return {
        translateX: 10,
        opacity: 0,
      };
    else
      return {
        translateX: -10,
        opacity: 0,
      };
  }, [isRegisterSlow]);

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
    setIsOpen(false);
    // isOpen is set twice (second time in a timeout) in order to toggle the transition
    // since some of the element is similar for both login and sign up
    setTimeout(() => {
      setIsOpen(true);
      setIsRegisterSlow(isRegister);
    }, 250);
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
      navigation.navigate('ConfirmPhone', {action: 'create', email, password}),
    );
  };

  return (
    <SafeAreaView>
      {loading && <LoadingOverlay />}
      <View style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
        <ImageBackground
          source={require('../../assets/signin-background.webp')}
          alt="background"
          style={{
            width: undefined,
            height: undefined,
            flex: 1,
          }}
          imageStyle={{opacity: 0.4}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              alignItems: 'center',
              paddingVertical: 40,
              paddingHorizontal: 20,
            }}>
            <Image
              source={require('../../assets/white-logo.png')}
              alt="background"
              size="xl"
              style={{marginBottom: 40, resizeMode: "contain"}}
            />
            <Box border="0" borderRadius="md" width="100%">
              <VStack space="0">
                <Flex
                  direction="row"
                  w="100%"
                  style={{
                    textAlign: 'center',
                  }}
                  m={0}>
                  <Pressable
                    onPress={() => setIsRegister(false)}
                    style={[
                      {width: '50%'},
                      !isRegister && {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderTopRightRadius: 30,
                      },
                    ]}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 24,
                        textAlign: 'center',
                        padding: 10,
                      }}>
                      LOGIN
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setIsRegister(true)}
                    style={[
                      {width: '50%'},
                      isRegister && {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderTopLeftRadius: 30,
                      },
                    ]}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 24,
                        textAlign: 'center',
                        padding: 10,
                      }}>
                      SIGN UP
                    </Text>
                  </Pressable>
                </Flex>
                <Box
                  px="4"
                  py="10"
                  style={[
                    {
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      alignItems: 'center',
                      borderBottomLeftRadius: 30,
                      borderBottomRightRadius: 30,
                      bottom: 0.5,
                    },
                    isRegister
                      ? {borderTopLeftRadius: 30}
                      : {borderTopRightRadius: 30},
                  ]}>
                  <PresenceTransition
                    visible={isOpen}
                    initial={initial}
                    animate={{
                      translateX: 0,
                      opacity: 1,
                      transition: {
                        duration: 250,
                      },
                    }}
                    style={{width: '100%', alignItems: 'center'}}>
                    <CustomTextInput
                    
                      placeholder={'Email'}
                      value={email}
                      onChangeText={setEmail}
                      style={{}}
                    />
                    <PasswordInput
                      password={password}
                      setPassword={setPassword}
                    />
                    <Box
                      style={{
                        width: '100%',
                        alignItems: 'flex-end',
                        marginBottom: 8,
                      }}>
                      {!isRegisterSlow && (
                        <Pressable
                          onPress={() => navigation.navigate('ForgetPassword')}>
                          <Text
                            style={{
                              marginHorizontal: 5,
                              color: 'white',
                              // textAlign: 'right',
                            }}>
                            Forgot password
                          </Text>
                        </Pressable>
                      )}
                    </Box>
                    {isRegisterSlow ? (
                      <CustomButton
                        onPress={handleRegisterButtonPress}
                        style={{backgroundColor: 'white', width: '50%'}}>
                        <Text style={{color: '#056794'}}>SIGN UP</Text>
                      </CustomButton>
                    ) : (
                      <CustomButton
                        onPress={handleLoginButtonPress}
                        style={{backgroundColor: 'white', width: '50%'}}>
                        <Text style={{color: '#056794'}}>LOGIN</Text>
                      </CustomButton>
                    )}
                    <Box style={[styles.otherMethod, {marginTop: 20}]}>
                      <Text style={[styles.continueWithText, {color: 'white'}]}>
                        or {isRegisterSlow ? 'Sign Up' : 'Login'} with
                      </Text>
                    </Box>
                    <Flex direction="row" mb={4}>
                      <GoogleAuth navigation={navigation} />
                      <AppleAuth navigation={navigation} />
                    </Flex>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate({name: 'MainScreen'});
                      }}>
                      <Text style={{color: 'white'}}>
                        Continue as{' '}
                        <Text style={{fontWeight: 'bold'}}>VISITOR</Text>
                      </Text>
                    </TouchableOpacity>
                  </PresenceTransition>
                </Box>
              </VStack>
            </Box>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  continueWithText: {
    marginBottom: 10,
  },
  otherMethod: {
    padding: 3,
    alignItems: 'center',
  },
});

export default SignInScreen;
