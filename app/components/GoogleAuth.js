import React from 'react';
import {StyleSheet, Image, Pressable} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../hooks/useAuth';
import {FIREBASE_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: FIREBASE_CLIENT_ID,
  scopes: [
    'https://www.googleapis.com/auth/user.phonenumbers.read',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
});
const GoogleAuth = ({navigation, setEmail}) => {
  const {setLoading, signInWithGoogle, setAuthError} = useAuth();

  const handleGoogleAuth = async () => {
    setLoading(true);
    await GoogleSignin.hasPlayServices();
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth()
        .signInWithCredential(googleCredential)
        .then(data => {
          completeRegistration(data.user);
        });
    } catch (err) {
      setAuthError('You are not signed in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completeRegistration = async currentUser => {
    // this is to get the firebase id token, not the google id token
    const idToken = await auth().currentUser.getIdToken(
      /* forceRefresh */ true,
    );
    // uid is used as password
    const uid = await auth().currentUser.uid;
    const {email} = currentUser;
    // sign out immmediately to remove the access on firebase
    auth()
      .signOut()
      .then(() => {
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
      })
      .then(() => signInWithGoogle(email, idToken))
      .then(() => {
        navigation.replace('MainScreen');
      })
      .catch(() => {
        // without signing out, the auth state listener will assume that the user is authenticated
        navigation.push('ConfirmPhone', {
          action: 'create',
          email,
          password: uid,
        });
      });
  };

  return (
    <Pressable
      style={({pressed}) => [styles.otherMethod, !pressed ? styles.shadow : []]}
      onPress={handleGoogleAuth}>
      <Image
        source={require('../assets/google-signin.png')}
        style={styles.image}
        alt="Google Sign In"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  otherMethod: {
    padding: 2,
    height: 40,
    width: 40,
    borderColor: '#e0eaff',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0eaff',
    marginHorizontal: 10,
  },
  shadow: {
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowColor: '#3c507d',
    shadowOpacity: 2,
    elevation: 4,
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});

export default GoogleAuth;
