import * as React from 'react';
import { View, Text } from 'react-native';

export default function NearByCategoryScreen ({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Spots')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Lol Screen</Text>
        </View>
    );
}