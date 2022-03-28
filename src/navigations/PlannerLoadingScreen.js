import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Card from '../component/card/card';
import Indicator from '../component/Indicator/Indicator';

const Loading = (props) => {
    return (
        <View style={styles.body}>
            <Card>
                <View style={{ alignItems: 'center', 
                justifyContent: 'space-between' 
                }}>
                    <Text style={styles.title}>
                        {props.quest}</Text>
                    <Text style={styles.subtitle}>
                        Please wait
                    </Text>
                </View>
                <View style={{ marginHorizontal: '15%' }}>
                    <Indicator />
                </View>
                <View 
                style={{ marginTop: 10 }}
                >

                </View>
            </Card>
        </View>

    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        marginTop: "20%",
        alignItems: 'center',
        marginHorizontal: '8%',
        // justifyContent: 'center',

    },
    body_container: {
        alignItems: 'center',
    },
    title: {
        alignItems: 'center',
        color: '#000000',
        fontSize: 24,
        fontFamily: 'sans-serif-medium',
        fontWeight: '500',
        marginBottom: 40,
        padding: 20,
        textAlign: 'center',
    },
    subtitle: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 23,
        marginBottom: 30,

    },
    button: {
        backgroundColor: 'red',
        width: 150,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    next: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
});

export default Loading;