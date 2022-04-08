import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

import Calendar from '../../components/CalenderPicker/CalenderPicker';
import Card from '../../components/card/card';

import Model from '../../components/Modal/Modal'

const ChooseDays = (props) => {
    const [isModalVisible, setModalVisible] = useState(true);
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
                    <Model>
                        <Image
                            source={require('../../assets/calender.gif')}
                            style={{ width: 220, height: 200 }} />

                    </Model>
                </View>
            </Card >
            {/* <Button testID={'close-button'} onPress={props.onPress} title="Instructions" /> */}
        </View >

    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
    },
    body: {
        marginBottom: 20,
        marginTop: 30,
        // marginHorizontal: 13,
        width: '100%',
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