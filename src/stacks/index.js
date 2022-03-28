import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../scenes/login';
import { HomeScreen } from '../scenes/home';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Home Screen" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Sign In Screen" component={SignInScreen} />
        </Stack.Navigator>
    );
};
