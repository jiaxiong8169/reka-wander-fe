import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import auth from '@react-native-firebase/auth';
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

GoogleSignin.configure({
    webClientId: '397979276552-mo6gk7r4n54k8tr5hglolld9eo6n8peb.apps.googleusercontent.com',
    scopes: ["https://www.googleapis.com/auth/user.phonenumbers.read", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"]
})
const GoogleAuth = ({ navigation, setEmail }) => {

    const { signInWithGoogle, setAuthError } = useAuth();

    const handleGoogleAuth = async () => {
        await GoogleSignin.hasPlayServices();
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            console.log(googleCredential);
            auth().signInWithCredential(googleCredential).then(data => {
                completeRegistration(data.user);
            });
        } catch (err) {
            setAuthError("You are not signed in. Please try again.")
        }
    }

    const completeRegistration = async (currentUser) => {
        console.log({ currentUser })
        // this is to get the firebase id token, not the google id token
        const idToken = await auth().currentUser.getIdToken(/* forceRefresh */ true);
        // uid is used as password
        const uid = await (auth().currentUser).uid
        const { email } = currentUser;
        signInWithGoogle(email, idToken).then(() => {
            console.log("go back first")
        })
            // sign out immmediately after sign in to remove the access on firebase
            // by doing this, in the next google login, user is able to choose which account to login with
            // otherwise the user will be automatically log into the previous gmail in the second login
            .then(() => {
                console.log("sign out");
                return GoogleSignin.revokeAccess();
            }).then(() => {
                return GoogleSignin.signOut();
            }).then(async () => {
                navigation.goBack();
            })
            .catch((err) => {
                navigation.navigate("Confirm Phone", { email, password: uid })
            })
    }

    return <TouchableOpacity style={styles.otherMethod} onPress={handleGoogleAuth}>
        <FontAwesomeIcon icon={faGoogle} size={20} />
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    otherMethod: {
        padding: 3,
    }
})

export default GoogleAuth;