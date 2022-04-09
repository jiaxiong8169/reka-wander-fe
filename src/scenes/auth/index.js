import { TestScheduler } from 'jest';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import GoogleAuth from './google-auth';

const SignInScreen = ({ navigation, route }) => {

    const { signIn, setAuthError } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const checkBeforeRun = (func) => {
        if (!/^\S+@\S+.com$/.test(email)) {
            setAuthError("Make sure that email is in correct format");
        } else if (!/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)) {
            setAuthError("Your password should contain at least 1 upper case letter, 1 lower case letter and 1 number or special character")
        } else {
            func();
        }
    }

    const handleLoginButtonPress = () => {
        checkBeforeRun(() => signIn(email, password));
    }

    const handleRegisterButtonPress = () => {
        checkBeforeRun(() => navigation.navigate("Confirm Phone", { email, password }))
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.titleStyle}>
                    Hello Traveller!
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.subtitleStyle}>
                    {"Welcome back.\nYou've been missed."}
                </Text>
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <View style={styles.inputField}>
                    <View style={{
                        backgroundColor: "rgba(255,255,255,0.3)",
                        padding: 5,
                        fontSize: 40
                    }}>
                        <View>
                            <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} placeholderTextColor="white" selectionColor={"white"} style={{ color: "white" }} />
                        </View>
                    </View>
                </View>
                <View style={styles.inputField}>
                    <View style={{
                        backgroundColor: "rgba(255,255,255,0.3)",
                        padding: 5,
                        color: "white"
                    }}>
                        <TextInput textContentType='password' secureTextEntry={true} placeholder="Password" value={password} onChangeText={setPassword} placeholderTextColor="white" style={{ color: "white" }} />
                    </View>
                </View>
            </View>
            <View styles={{ flex: 1 }}>
                <View style={[styles.buttonContainer]}>
                    <TouchableOpacity style={styles.button} onPress={handleLoginButtonPress}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleRegisterButtonPress}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                    <View style={[styles.otherMethod, { marginTop: 20 }]}>
                        <View style={styles.continueWithText}>
                            <Text>
                                Continue with
                            </Text>
                        </View>
                        <View>
                            <GoogleAuth navigation={navigation} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Text>
                        Continue as Visitor
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: { fontSize: 40, color: "white", fontWeight: 'bold' },
    subtitleStyle: { fontSize: 30, color: "white" },
    shape: {
        height: 140,
        width: "100%",
        backgroundColor: "white",
        borderBottomRightRadius: 400,
        borderBottomLeftRadius: 400,
        alignSelf: "center",
    },
    continueWithText: {
        marginBottom: 10
    },
    container: {
        flex: 1,
        padding: 30,
        paddingTop: 0,
        flexDirection: "column",
        backgroundColor: "#3986d4",
        justifyContent: "center",
        alignItems: "stretch",
    },
    inputField: {
        borderColor: "white",
        borderWidth: 4,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        textDecorationColor: "white",
    },
    buttonContainer: {
        // alignSelf: "center",
        margin: 2,
    },
    button: {
        borderRadius: 10,
        backgroundColor: "#F5362E",
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: "center",
        margin: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        shadowColor: "black",
        fontSize: 15
    },
    otherMethod: {
        padding: 3,
        alignItems: "center",
    },
    placeholder: { color: "white" },
})

export default SignInScreen;