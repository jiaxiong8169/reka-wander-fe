import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { AppStack, AuthStack } from "../stacks"
import { useAuth } from '../hooks/useAuth';
import { Text, Modal, View, StyleSheet } from 'react-native';

export const Router = () => {

    const { authData, loading, authError } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    if (loading) {
        return <Text>Loading</Text>
    }
    return (
        <NavigationContainer>
            {authData ? <AppStack /> : <AuthStack />}
            <Modal animationType="slide" transparent visible={!!authError} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        {authError}
                    </Text>
                </View>
            </Modal>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "red",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        color: "white"
    }
})