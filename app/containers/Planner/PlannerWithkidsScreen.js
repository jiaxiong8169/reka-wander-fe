import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Pressable,
} from 'react-native';
import Card from '../../components/card/card';
import RadioButtonRN from '../../components/multiple_choice/multiplechoice'

const option = [
    { id: 'Yes', label: 'Yes' },
    { id: 'No', label: 'No' },
];

const data = [
    { label: 'Yes' },
    { label: 'No' }
];

const Withkids = (props) => {
    const onPressHandler = () => {
        console.log(formattedEndDate);
    }
// const containerWidth = (Dimensions.get('window').width) * 0.7;
// const containerHeight = (Dimensions.get('window').height) * 0.7;
    return (
        // <ScrollView>
        <View style={styles.body}>
            <Card style={{width: '100%'}}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.question}>
                        {props.quest}
                    </Text>
                </View>
                <View style={{ marginHorizontal: '15%' }}>
                    <RadioButtonRN
                        data={data}
                        box={false}
                        animationTypes={['pulse']}
                        circleSize={18}
                        textColor={'black'}
                        selectedBtn={(e) => console.log(e)}
                    >
                    </RadioButtonRN>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Image
                        source={require('../../assets/kids.png')}
                        style={{
                            padding: 1,
                            aspectRatio: 1,
                            width: '100%',
                            resizeMode: 'contain',
                            // justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            height: undefined
                        }}
                    />
                </View>
            </Card>
        </View>
        // </ScrollView>

    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
    },
    body: {
        // marginBottom: '10%',
        marginBottom: 20,
        marginTop: 30,
        // marginHorizontal: '8%',
        width: '100%',
        // padding: 10,
    },
    body_container: {
        alignItems: 'center',
    },
    question: {
        alignItems: 'center',
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

export default Withkids;