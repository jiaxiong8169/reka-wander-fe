import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';
import {LoadingOverlay} from '../../components/LoadingOverlay';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import OTPInput from './OTPInput';

export const ConfirmPhoneScreen = ({navigation, route}) => {
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(undefined);
  const [phoneNumberPrefix, setPhoneNumberPrefix] = useState('60');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberEditable, setPhoneNumberEditable] = useState(true);
  const [otpModalVisible, setOTPModalVisible] = useState(false);

  const authProvider = useAuth();

  const {email, password} = route.params;

  const handlePhoneNumberButtonPress = async () => {
    setPhoneNumberEditable(false);
    signInWithPhoneNumber(`+${phoneNumberPrefix}${phoneNumber}`);
  };

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setOTPModalVisible(true);
    } catch (err) {
      console.log(err);
      authProvider.setAuthError(
        'The format of the phone number provided is incorrect.',
      );
      setPhoneNumberEditable(true);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      const regInfo = {
        email,
        password,
        phoneNumber,
      };
      authProvider.signUp(regInfo).then(success => {
        if (success)
          authProvider
            .signIn(email, password)
            .then(() => {
              return auth().signOut();
            })
            .then(() => {
              navigation.navigate({name: 'MainScreen'});
            });
        // it is not necessary to use `signInWithGoogle`
        // because we use the same email and password to sign up and sign in
        // user sign up with any method should be able to sign in
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const resetState = () => {
      setConfirm(undefined);
      setCode('');
      setPhoneNumber('');
      setPhoneNumberEditable(true);
      setOTPModalVisible(false);
    };
    if (!otpModalVisible) resetState();
  }, [otpModalVisible]);

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#CFDDFC', 'white']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.5}}
        style={{height: '100%', width: '100%'}}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{flex: 1}}>
            <Image
              source={require('../../assets/paper_plane_2.png')}
              style={[styles.img, {flex: 3}]}
              resizeMode={'contain'}></Image>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.title}>OTP Verification</Text>
              <Text style={styles.caption}>Let's see if it's your phone!</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <CustomTextInput
                  placeholder="60"
                  value={phoneNumberPrefix}
                  onChangeText={setPhoneNumberPrefix}
                  editable={phoneNumberEditable}
                  maxLength={3}
                  startAdornment={'+'}
                />
              </View>
              <View style={{flex: 2}}>
                <CustomTextInput
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={phoneNumberEditable}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={
                  phoneNumberEditable
                    ? styles.enabledButton
                    : styles.disabledButton
                }
                onPress={handlePhoneNumberButtonPress}
                disabled={!phoneNumberEditable}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
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
                <View style={{flex: 4}}>
                  <OTPInput setCode={setCode} editable={!!confirm}></OTPInput>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => confirmCode()}
                    disabled={!!!confirm}
                    style={
                      !!confirm ? styles.enabledButton : styles.disabledButton
                    }>
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
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
    backgroundColor: '#F5362E',
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
  buttonText: {
    color: 'white',
    textAlign: 'center',
    shadowColor: 'black',
    fontSize: 15,
  },
  img: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  caption: {
    textAlign: 'center',
  },
  inputAddOn: {
    backgroundColor: '#aeb3bd',
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
});
