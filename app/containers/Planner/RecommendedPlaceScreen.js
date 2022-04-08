import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import Card from '../../components/card/card';
import GradientBackground from '../../components/GradientBackground';

const data=[
{}
];

export default function Recommended({ navigation }) {
    return (
        <GradientBackground>
            <View>
                <Card>
                    <View style={{height: 150, flexDirection: 'row'}}>
                        <Image
                        style={{flex:1, height: undefined, borderRadius:5}}
                        source={require('../../assets/home.jpg')}
                        />

                        
                    </View>
                </Card>
            </View>
        </GradientBackground>
    );
};
