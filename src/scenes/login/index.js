import { Link } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const SignInScreen = ({ navigation }) => {

    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleButtonPress = () => {
        auth.signIn(email, password);
    }
    return (
        <View style={styles.container}>
            <View style={[styles.shape, { flex: 1 }]}></View>
            <View style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
                <Text style={styles.titleStyle}>
                    Hello Traveller!
                </Text>
            </View>
            <View style={{ flex: 2 }}>
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
            <View style={[styles.buttonContainer, { flex: 1 }]}>
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'center' }}>
                <Text>
                    Sign up with
                </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'center' }}>
                <Text>
                    <Link to={{ screen: "Register Screen" }}>
                        <Text style={styles.otherMethod}>
                            {"Email\t\t"}
                        </Text>
                    </Link>
                    <Text style={styles.otherMethod}>
                        {"Google"}
                    </Text>
                </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'center' }}>
                <Text>
                    Continue as Visitor
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleStyle: { fontSize: 30, color: "white" },
    shape: {
        height: 140,
        width: "100%",
        backgroundColor: "white",
        borderBottomRightRadius: 400,
        borderBottomLeftRadius: 400,
        alignSelf: "center",
    },
    container: {
        flex: 1,
        padding: 20,
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
        // maxWidth: "30%",
        alignSelf: "center",
    },
    button: {
        borderRadius: 20,
        backgroundColor: "#F5362E",
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        shadowColor: "black",
        fontSize: 15
    },
    otherMethod: {
        padding: 3,
    }
})

export default SignInScreen;