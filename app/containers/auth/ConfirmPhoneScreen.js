import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import OTPInput from './OTPInput';
import {CustomButton} from '../../components/CustomButton';
import {LoadingOverlay} from '../../components/LoadingOverlay';
import {useHttpCall} from '../../hooks/useHttpCall';
import Icon from 'react-native-vector-icons/AntDesign';

const OTP_TIMEOUT_SECONDS = 90;

export const ConfirmPhoneScreen = ({route}) => {
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(undefined);
  const [phoneNumberPrefix, setPhoneNumberPrefix] = useState('60');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberEditable, setPhoneNumberEditable] = useState(true);
  const [otpModalVisible, setOTPModalVisible] = useState(false);
  const [otpResendTimer, setOtpResendTimer] = useState(undefined);
  const [resendTimeLeft, setResendTimeLeft] = useState(0);
  const [otpResendLimit, setOtpResendLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState(undefined);

  const authProvider = useAuth();
  const httpProvider = useHttpCall();

  const {action} = route.params;

  const handlePhoneNumberButtonPress = async () => {
    setPhoneNumberEditable(false);
    console.log(`+${phoneNumberPrefix}${phoneNumber}`);
    signInWithPhoneNumber(`+${phoneNumberPrefix}${phoneNumber}`);
  };

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setLoading(false);
      setResendTimeLeft(OTP_TIMEOUT_SECONDS);
      setConfirm(confirmation);
      setOTPModalVisible(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
      authProvider.setAuthError(
        'The format of the phone number provided is incorrect.',
      );
      setPhoneNumberEditable(true);
    }
  }

  async function confirmCode() {
    try {
      console.log('confirm');
      await confirm.confirm(code); // this will trigger the onAuthStateChanged listener
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log({authUser});
    if (authUser) {
      switch (action) {
        case 'update':
          const {id} = route.params;
          setLoading(true);
          httpProvider
            .putWithAuth(
              `users/${id}`,
              {
                phoneNumber: `${phoneNumberPrefix}${phoneNumber}`,
              },
              () => navigation.navigate('SignInScreen'),
            )
            .then(data => {
              const {data: userData} = data;
              authProvider.setAuthData(({token}) => ({...userData, token}));
            })
            .then(() => {
              setOTPModalVisible(false);
              setLoading(false);
            });
          break;
        case 'create':
          const {email, password} = route.params;
          const regInfo = {
            email,
            password,
            phoneNumber: `${phoneNumberPrefix}${phoneNumber}`,
          };
          authProvider
            .signUp(regInfo)
            .then(() => {
              setOTPModalVisible(false);
            })
            .catch(err => {
              console.log({err});
            })
            .finally(() => {
              console.log('sign out');
              auth().signOut();
            });
          break;
        default:
          break;
      }
    }
  }, [authUser]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        console.log({user});
        setAuthUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const resetState = () => {
      setConfirm(undefined);
      setCode('');
      setPhoneNumber('');
      setPhoneNumberEditable(true);
      setOTPModalVisible(false);
      console.log('reset');
    };
    if (!otpModalVisible) resetState();
  }, [otpModalVisible]);

  useEffect(() => {
    if (resendTimeLeft === OTP_TIMEOUT_SECONDS) {
      let interval;
      console.log('set interval');
      setOtpResendLimit(otpResendLimit => otpResendLimit - 1);
      interval = setInterval(() => {
        setResendTimeLeft(resendTimeLeft => resendTimeLeft - 1);
      }, 1000);
      setOtpResendTimer(interval);
    }
    if (resendTimeLeft === 0) {
      console.log('clear interval ' + otpResendTimer);
      clearInterval(otpResendTimer);
    }
  }, [resendTimeLeft]);

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
            <View style={{flex: 3}}>
              <Image
                source={require('../../assets/paper_plane_2.png')}
                style={[styles.img]}
                resizeMode={'contain'}></Image>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Text style={styles.title}>OTP Verification</Text>
              <Text style={styles.caption}>Let's see if it's your phone!</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <CustomTextInput
                placeholder="60"
                value={phoneNumberPrefix}
                onChangeText={setPhoneNumberPrefix}
                editable={phoneNumberEditable}
                maxLength={3}
                style={{
                  flex: 1,
                  marginRight: 10,
                }}
                startAdornment={<Icon name="plus" style={{marginLeft: 10}} />}
              />
              <CustomTextInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={phoneNumberEditable}
                autoFocus={true}
                style={{
                  flex: 2,
                }}
              />
            </View>
            <View>
              <CustomButton
                style={
                  phoneNumberEditable
                    ? styles.enabledButton
                    : styles.disabledButton
                }
                onPress={handlePhoneNumberButtonPress}
                disabled={!phoneNumberEditable}>
                Send OTP
              </CustomButton>
            </View>
          </ScrollView>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={otpModalVisible}
          onRequestClose={() => {
            setOTPModalVisible(false);
          }}>
          <LinearGradient
            colors={['#CFDDFC', 'white']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.5}}
            style={{height: '100%', width: '100%'}}>
            <ScrollView contentContainerStyle={{flex: 1}}>
              <View style={styles.container}>
                <View
                  style={{
                    flex: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>Verifying your number!</Text>
                  <Text>We have sent an OTP on your number</Text>
                  <Text>{`+${phoneNumberPrefix}${phoneNumber}`}</Text>
                </View>
                <View style={{flex: 4, alignItems: 'center'}}>
                  <OTPInput setCode={setCode} editable={!!confirm}></OTPInput>
                  {resendTimeLeft !== 0 ? (
                    <Text>Resend in {resendTimeLeft} seconds</Text>
                  ) : otpResendLimit > 0 ? (
                    <Pressable onPress={handlePhoneNumberButtonPress}>
                      <Text>Resend OTP password</Text>
                    </Pressable>
                  ) : (
                    <Text>
                      Resent limit reached. Please enter a new phone number.
                    </Text>
                  )}
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                  <CustomButton
                    onPress={() => confirmCode()}
                    disabled={!!!confirm}
                    style={
                      !!confirm ? styles.enabledButton : styles.disabledButton
                    }>
                    Confirm
                  </CustomButton>
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </Modal>
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
  enabledButton: {
    borderRadius: 10,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    margin: 10,
  },
  disabledButton: {
    borderRadius: 10,
    backgroundColor: '#8f9294',
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
  inputAddOn: {
    backgroundColor: '#aeb3bd',
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
});
