import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
import GoogleAuth from '../../components/GoogleAuth';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import {useIsFocused} from '@react-navigation/native';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';

const SignInScreen = ({navigation, route}) => {
  const {authData, signIn, setAuthError} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    // navigate users to main page if authenticated
    if (!!authData) navigation.navigate({name: 'MainScreen'});
  }, [authData]);

  useEffect(() => {
    // clear all fields when user is redirected to this page
    const clearLoginFields = () => {
      setEmail('');
      setPassword('');
    };
    if (isFocused) clearLoginFields();
  }, [isFocused]);

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
    signIn(email, password);
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
        <View style={styles.container}>
          <ScrollView>
            <View
              style={[
                styles.containerMargin,
                {flex: 1, justifyContent: 'center'},
              ]}>
              <Text style={styles.titleStyle}>Hello Traveller!</Text>
            </View>
            <View style={[styles.containerMargin, {flex: 1, marginBottom: 40}]}>
              <Text style={styles.subtitleStyle}>
                {"Welcome back.\nYou've been missed."}
              </Text>
            </View>
            <View style={{flex: 2, justifyContent: 'center'}}>
              <CustomTextInput
                placeholder={'Email'}
                value={email}
                onChangeText={setEmail}
              />
              <PasswordInput password={password} setPassword={setPassword} />
            </View>
            <View styles={{flex: 1, alignItems: 'center'}}>
              <View style={[styles.buttonContainer]}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLoginButtonPress}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRegisterButtonPress}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={[styles.otherMethod, {marginTop: 20}]}>
                  <View style={styles.continueWithText}>
                    <Text>Continue with</Text>
                  </View>
                  <View>
                    <GoogleAuth navigation={navigation} />
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 1, alignSelf: 'center', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate({name: 'MainScreen'});
                }}>
                <Text>Continue as Visitor</Text>
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
  button: {
    borderRadius: 10,
    backgroundColor: '#F5362E',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    shadowColor: 'black',
    fontSize: 15,
  },
  otherMethod: {
    padding: 3,
    alignItems: 'center',
  },
  placeholder: {color: 'black'},
  containerMargin: {
    marginBottom: 40,
  },
});

export default SignInScreen;
