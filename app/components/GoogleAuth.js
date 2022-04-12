import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../hooks/useAuth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {FIREBASE_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: FIREBASE_CLIENT_ID,
  scopes: [
    'https://www.googleapis.com/auth/user.phonenumbers.read',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  forceConsentPrompt: true,
});
const GoogleAuth = ({navigation, setEmail}) => {
  const {signInWithGoogle, setAuthError} = useAuth();

  const handleGoogleAuth = async () => {
    await GoogleSignin.hasPlayServices();
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential);
      auth()
        .signInWithCredential(googleCredential)
        .then(data => {
          completeRegistration(data.user);
        });
    } catch (err) {
      setAuthError('You are not signed in. Please try again.');
    }
  };

  const completeRegistration = async currentUser => {
    console.log({currentUser});
    // this is to get the firebase id token, not the google id token
    const idToken = await auth().currentUser.getIdToken(
      /* forceRefresh */ true,
    );
    // uid is used as password
    const uid = await auth().currentUser.uid;
    const {email} = currentUser;
    signInWithGoogle(email, idToken)
      // sign out immmediately after sign in to remove the access on firebase
      .then(() => {
        console.log('sign out');
        return GoogleSignin.revokeAccess();
      })
      .then(() => {
        return GoogleSignin.signOut();
      })
      .then(() => {
        navigation.navigate({name: 'SignInScreen'});
      })
      .catch(err => {
        navigation.navigate('ConfirmPhone', {email, password: uid});
      });
  };

  return (
    <TouchableOpacity style={styles.otherMethod} onPress={handleGoogleAuth}>
      <FontAwesomeIcon icon={faGoogle} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  otherMethod: {
    padding: 3,
  },
});

export default GoogleAuth;
