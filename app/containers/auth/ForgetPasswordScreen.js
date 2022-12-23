import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {CustomButton} from '../../components/CustomButton';
import {LoadingOverlay} from '../../components/LoadingOverlay';
import {useHttpCall} from '../../hooks/useHttpCall';

export const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [errorText, setErrorText] = useState('');

  const {getWithoutAuth} = useHttpCall();

  const handleSendResetPasswordMail = () => {
    setLoading(true);
    getWithoutAuth(`auth/requestresetpassword?email=${email}`, {})
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        err.response.json().then(data => {
          setErrorText(data.message);
        });
      })
      .finally(() => {
        setLoading(false);
        setSnackbarVisible(true);
      });
  };

  const handleRetryLogin = () => {
    navigation.navigate('SignInScreen');
  };

  useEffect(() => {
    const resetState = () => {
      setEmail('');
      setLoading(false);
    };
    resetState();
  }, []);

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#CFDDFC', 'white']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={{height: '100%', width: '100%'}}>
        {loading && <LoadingOverlay />}
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={{flex: 3}}>
              <Image
                source={require('../../assets/forgot-password.png')}
                style={[styles.img]}
                resizeMode={'contain'}
                alt="Forgot Password"
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Text style={styles.title}>Forgot your password? </Text>
              <Text style={styles.caption}>
                Give us your email and we will guide you through.
              </Text>
            </View>
            <View style={{flex: 1}}>
              <CustomTextInput
              
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              {!snackbarVisible ? (
                <CustomButton
                  style={styles.button}
                  onPress={handleSendResetPasswordMail}>
                  Send Email
                </CustomButton>
              ) : (
                <CustomButton style={styles.button} onPress={handleRetryLogin}>
                  Retry login
                </CustomButton>
              )}
            </View>
          </ScrollView>
        </View>
        {snackbarVisible && (
          <View
            style={[
              styles.snackbar,
              errorText && {backgroundColor: '#f29696'},
            ]}>
            <Text style={styles.snackbarText}>
              {errorText ||
                `Email sent to ${email}. Click the link in the email to continue.`}
            </Text>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    margin: 10,
  },
  img: {
    width: '100%',
    height: 400,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  caption: {
    textAlign: 'center',
    marginBottom: 10,
  },
  snackbar: {
    backgroundColor: '#8aeba2',
    padding: 20,
  },
  snackbarText: {
    fontWeight: 'bold',
  },
});
