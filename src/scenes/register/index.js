import { Link } from '@react-navigation/native';
import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const TextField = (props) => {
    return (
        <View style={styles.inputField}>
            <View style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                padding: 5,
                fontSize: 40
            }}>
                <View>
                    <TextInput placeholderTextColor="white" selectionColor={"white"} style={{ color: "white" }} {...props} />
                </View>
            </View>
        </View>
    )
}

const RegistrationScreen = ({ navigation }) => {

    const auth = useAuth();

    const [regInfo, setRegInfo] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
    })
    const handleButtonPress = () => {
        auth.signUp(regInfo).then(success => {
            if (success) navigation.navigate('Sign In Screen')
        });
    }

    const handleTextChange = (name, text) => {
        setRegInfo((regInfo) => ({ ...regInfo, [name]: text }))
    }

    return (
        <View style={styles.container}>
            <View style={[styles.shape, { flex: 1 }]}></View>
            <View style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
                <Text style={styles.titleStyle}>
                    Register as a Traveller!
                </Text>
            </View>
            <View style={{ flex: 4 }}>
                <ScrollView>
                    <TextField textContentType='username' placeholder="Name" value={regInfo.name} onChangeText={(text) => handleTextChange("name", text)} />
                    <TextField textContentType='emailAddress' placeholder="E-mail" value={regInfo.email} onChangeText={(text) => handleTextChange("email", text)} />
                    <TextField textContentType='password' secureTextEntry={true} placeholder="Password" value={regInfo.password} onChangeText={(text) => handleTextChange("password", text)} />
                    <TextField textContentType='telephoneNumber' placeholder="Phone Number" value={regInfo.phoneNumber} onChangeText={(text) => handleTextChange("phoneNumber", text)} />
                </ScrollView>
            </View>
            <View style={[styles.buttonContainer, { flex: 1 }]}>
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Register account</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'center' }}>
                <Text>
                    {"Already has an account?\t\t"}
                    <Link to={{ screen: "Sign In Screen" }}>
                        <Text>
                            Sign In
                        </Text>
                    </Link>
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
        flex: 1,
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

export default RegistrationScreen;