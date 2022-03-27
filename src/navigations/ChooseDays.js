import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Calendar from '../component/CalenderPicker/CalenderPicker';
import Card from '../component/card/card';


const ChooseDays = (props) => {

    return (

        <View style={styles.body}>
            <Card>
                <View style={styles.body_container}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.question}>
                            {props.quest}
                        </Text>
                    </View>
                    <Calendar />
                </View>
            </Card>
        </View>

    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
    },
    body: {
        margin: 10,
    },
    body_container: {
    },
    question: {
        color: '#000000',
        fontSize: 24,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        marginBottom: 10,
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

export default ChooseDays;