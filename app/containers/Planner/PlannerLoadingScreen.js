import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Card from '../../components/card/card';
import Indicator from '../../components/Indicator/Indicator';
const Loading = (props) => {
    return (
        <View style={styles.body}>
            <Card>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.title}>
                        {props.quest}</Text>
                    <Text style={styles.subtitle}>
                        Please wait
                    </Text>
                    <Indicator />
                </View>
                
                    
                
            </Card>
        </View>

    );
};

const styles = StyleSheet.create({
    body: {
        // flex: 1,
        height: '60%',
        marginTop: "20%",
        alignItems: 'center',
        // marginHorizontal: '8%',
        justifyContent: 'center',

    },
    title: {
        alignItems: 'center',
        color: '#000000',
        fontSize: 24,
        fontFamily: 'sans-serif-medium',
        fontWeight: '500',
        // marginBottom: 40,
        padding: 20,
        textAlign: 'center',
    },
    subtitle: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 23,
        // marginBottom: 30,

    },
});

export default Loading;