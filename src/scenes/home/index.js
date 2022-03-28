import React from "react"
import { Text, Button, View } from "react-native"
import { useAuth } from "../../hooks/useAuth"

export const HomeScreen = () => {
    const auth = useAuth()

    return (
        <View>
            <Text>Welcome, {auth.authData.name}</Text>
            <Button onPress={auth.signOut} title="Logout" />
        </View>
    )
}