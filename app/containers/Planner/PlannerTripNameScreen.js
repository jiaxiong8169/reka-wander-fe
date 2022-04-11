import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
} from 'react-native';

import Card from '../../components/card/card';

const TripName = (props) => {

    const [tripName, setTripName] = useState('My Trip')

    return (
        <View style={styles.body}>
            <Card style={{
                width: '100%'
            }}>
                <View style={styles.body_container}>
                    <Text style={styles.question}>
                        {props.quest}
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={tripName}
                        onChangeText={setTripName}
                        placeholder="Type Your trip name here..."

                    />

                    <View style={{ marginTop: 10 }}>
                        <Image
                            source={require('../../assets/People.png')}
                            style={{
                                padding: 1,
                                aspectRatio: 1,
                                width: '100%',
                                resizeMode: 'contain',
                                alignItems: 'flex-end',
                                height: undefined
                            }}
                        />
                    </View>
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
        marginBottom: 20,
        marginTop: 30,
        width: '100%',
    },
    body_container: {
        alignItems: 'center',
        width: '100%',
    },
    question: {
        color: '#000000',
        fontSize: 24,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#ccc',
    },
});

export default TripName;