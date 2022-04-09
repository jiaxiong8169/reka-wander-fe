import React from "react"
import { Text, View, Button } from "react-native"
import { useAuth } from "../../hooks/useAuth"

export const SpotsScreen = ({ navigation }) => {
    const { signOut } = useAuth()

    return (
        <View>
            <Text>Spots</Text>
            <Button onPress={signOut} title="Logout" />
        </View>
    )
}