import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import auth from '@react-native-firebase/auth';

const GoogleAuth = () => {
    GoogleSignin.configure({
        webClientId: '763154048934-hllj3vukdo3jfr3qge5j4nivpo07mr9n.apps.googleusercontent.com',
    })

    const handleGoogleAuth = async () => {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        console.log(googleCredential);
        // return auth().signInWithCredential(googleCredential);
    }

    return <Text style={styles.otherMethod} onPress={handleGoogleAuth}>
        {"Google"}
    </Text>
}

const styles = StyleSheet.create({
    otherMethod: {
        padding: 3,
    }
})

export default GoogleAuth;