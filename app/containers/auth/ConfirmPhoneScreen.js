import { TextInput, View, Button, Text, StyleSheet, TouchableOpacity, Touchable } from "react-native"
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useAuth } from "../../hooks/useAuth";

export const ConfirmPhoneScreen = ({ navigation, route }) => {
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberEditable, setPhoneNumberEditable] = useState(true);

    const authProvider = useAuth();

    const { email, password } = route.params;

    const handlePhoneNumberButtonPress = () => {
        setPhoneNumberEditable(false);
        signInWithPhoneNumber(phoneNumber);
    }

    async function signInWithPhoneNumber() {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
            const regInfo = {
                email,
                password,
                phoneNumber
            }
            authProvider.signUp(regInfo).then(success => {
                console.log(success);
                if (success) authProvider.signIn(email, password).then(() => {
                    return auth().signOut();
                })
                    .then(() => {
                        navigation.goBack();
                    });
                // it is not necessary to use `signInWithGoogle`
                // because we use the same email and password to sign up and sign in
                // user sign up with any method should be able to sign in
            });
        } catch (error) {
            console.log(error);
        }
    }

    return <View style={styles.container}>
        <View style={styles.inputField}>
            <View style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                padding: 5,
                fontSize: 40
            }}>
                <View>
                    <TextInput placeholder='Phone Number' value={phoneNumber} onChangeText={setPhoneNumber} editable={phoneNumberEditable} placeholderTextColor="white" selectionColor={"white"} />
                </View>
            </View>
        </View>
        <TouchableOpacity style={phoneNumberEditable ? styles.enabledButton : styles.disabledButton} onPress={handlePhoneNumberButtonPress} disabled={!phoneNumberEditable} >
            <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
        <View style={styles.inputField}>
            <View style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                padding: 5,
                fontSize: 40
            }}>
                <View>
                    <TextInput value={code} onChangeText={setCode} placeholder="OTP" editable={!!confirm} placeholderTextColor="white" selectionColor={"white"} />
                </View>
            </View>
        </View>
        <TouchableOpacity onPress={() => confirmCode()} disabled={!!!confirm} style={!!confirm ? styles.enabledButton : styles.disabledButton} >
            <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
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
    enabledButton: {
        borderRadius: 10,
        backgroundColor: "#F5362E",
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: "center",
        margin: 10,
    },
    disabledButton: {
        borderRadius: 10,
        backgroundColor: "#8f9294",
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
})