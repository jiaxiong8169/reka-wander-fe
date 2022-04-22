import {
  TextInput,
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {setStartDate} from '../../redux/Planner/actions';

export const ConfirmPhoneScreen = ({navigation, route}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [confirm, setConfirm] = useState(undefined);
  const [isFocus, setIsFocus] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberEditable, setPhoneNumberEditable] = useState(true);
  const [otpModalVisible, setOTPModalVisible] = useState(false);

  const refInput0 = useRef();
  const refInput1 = useRef();
  const refInput2 = useRef();
  const refInput3 = useRef();
  const refInput4 = useRef();
  const refInput5 = useRef();

  const authProvider = useAuth();

  const {email, password} = route.params;

  const handlePhoneNumberButtonPress = async () => {
    setPhoneNumberEditable(false);
    signInWithPhoneNumber(`+60${phoneNumber}`);
  };

  async function signInWithPhoneNumber(phoneNumber) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setOTPModalVisible(true);
    } catch (err) {
      authProvider.setAuthError(err.message);
      setPhoneNumberEditable(true);
    }
  }

  async function confirmCode() {
    try {
      const codeString = code.join('');
      console.log(codeString);
      await confirm.confirm(codeString);
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

  const codeOnChange = (text, index) => {
    const refArr = [
      refInput0,
      refInput1,
      refInput2,
      refInput3,
      refInput4,
      refInput5,
    ];
    setCode(code => {
      const newCode = [...code];
      newCode[index] = text;
      return newCode;
    });
    if (text !== '')
      if (index < refArr.length - 1) refArr[index + 1].current.focus();
      else refArr[index].current.blur();
    else if (index > 0) refArr[index - 1].current.focus();
  };
  const focusOnCodeField = index => {
    setIsFocus(isFocus => isFocus.map((_, idx) => idx === index));
  };

  useEffect(() => {
    const resetState = () => {
      setConfirm(undefined);
      setCode(['', '', '', '', '', '']);
      setIsFocus([false, false, false, false, false, false]);
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
          <Image
            source={require('../../assets/paper_plane_2.png')}
            style={[styles.img, {flex: 3}]}
            resizeMode={'contain'}></Image>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.title}>OTP Verification</Text>
            <Text style={styles.caption}>Let's see if it's your phone!</Text>
          </View>
          <View style={{flex: 1}}>
            <View style={[styles.inputField]}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  fontSize: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    styles.inputAddOn,
                    {
                      height: '100%',
                      justifyContent: 'center',
                      paddingHorizontal: 8,
                    },
                  ]}>
                  <Text>+60</Text>
                </View>
                <TextInput
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={phoneNumberEditable}
                  placeholderTextColor="black"
                  selectionColor="black"
                  style={{margin: 5}}
                />
              </View>
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
            <View style={styles.container}>
              <View style={{flex: 5, marginTop: 100}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={[
                      styles.inputField,
                      {borderColor: isFocus[0] ? '#CFDDFC' : 'black'},
                    ]}>
                    <View
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        padding: 5,
                        fontSize: 40,
                      }}>
                      <View>
                        <TextInput
                          value={code[0]}
                          textAlign="center"
                          onChangeText={e => codeOnChange(e, 0)}
                          placeholder="*"
                          editable={!!confirm}
                          placeholderTextColor="black"
                          selectionColor="black"
                          maxLength={1}
                          ref={refInput0}
                          keyboardType={'number-pad'}
                          caretHidden
                          onFocus={() => focusOnCodeField(0)}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.inputField,
                      {borderColor: isFocus[1] ? '#CFDDFC' : 'black'},
                    ]}>
                    <View
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        padding: 5,
                        fontSize: 40,
                      }}>
                      <View>
                        <TextInput
                          textAlign="center"
                          value={code[1]}
                          onChangeText={e => codeOnChange(e, 1)}
                          placeholder="*"
                          editable={!!confirm}
                          placeholderTextColor="black"
                          selectionColor="black"
                          maxLength={1}
                          ref={refInput1}
                          keyboardType={'number-pad'}
                          caretHidden
                          onFocus={() => focusOnCodeField(1)}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.inputField,
                      {borderColor: isFocus[2] ? '#CFDDFC' : 'black'},
                    ]}>
                    <View
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        padding: 5,
                        fontSize: 40,
                      }}>
                      <View>
                        <TextInput
                          value={code[2]}
                          textAlign="center"
                          onChangeText={e => codeOnChange(e, 2)}
                          placeholder="*"
                          editable={!!confirm}
                          placeholderTextColor="black"
                          selectionColor="black"
                          maxLength={1}
                          ref={refInput2}
                          keyboardType={'number-pad'}
                          caretHidden
                          onFocus={() => focusOnCodeField(2)}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.inputField,
                      {borderColor: isFocus[3] ? '#CFDDFC' : 'black'},
                    ]}>
                    <View
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        padding: 5,
                        fontSize: 40,
                      }}>
                      <View>
                        <TextInput
                          value={code[3]}
                          textAlign="center"
                          onChangeText={e => codeOnChange(e, 3)}
                          placeholder="*"
                          editable={!!confirm}
                          placeholderTextColor="black"
                          selectionColor="black"
                          maxLength={1}
                          ref={refInput3}
                          keyboardType={'number-pad'}
                          caretHidden
                          onFocus={() => focusOnCodeField(3)}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.inputField,
                      {borderColor: isFocus[4] ? '#CFDDFC' : 'black'},
                    ]}>
                    <View
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        padding: 5,
                        fontSize: 40,
                      }}>
                      <View>
                        <TextInput
                          value={code[4]}
                          onChangeText={e => codeOnChange(e, 4)}
                          textAlign="center"
                          placeholder="*"
                          editable={!!confirm}
                          placeholderTextColor="black"
                          selectionColor="black"
                          maxLength={1}
                          ref={refInput4}
                          keyboardType={'number-pad'}
                          caretHidden
                          onFocus={() => focusOnCodeField(4)}
                        />
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.inputField,
                      {borderColor: isFocus[5] ? '#CFDDFC' : 'black'},
                    ]}>
                    <View
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        padding: 5,
                        fontSize: 40,
                      }}>
                      <View>
                        <TextInput
                          value={code[5]}
                          textAlign="center"
                          onChangeText={e => codeOnChange(e, 5)}
                          placeholder="*"
                          editable={!!confirm}
                          placeholderTextColor="black"
                          selectionColor="black"
                          maxLength={1}
                          ref={refInput5}
                          keyboardType={'number-pad'}
                          caretHidden
                          onFocus={() => focusOnCodeField(5)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
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
    // justifyContent: 'center',
  },
  inputField: {
    borderWidth: 4,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
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
