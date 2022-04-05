import React from 'react';
import { Button, View, Text, StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ModelContent = (props) => {
    return (
        <View style={styles.content}>
            <Text style={styles.contentTitle}>{props.title}</Text>
            <View>
                {props.children}
            </View>
            <Button testID={'close-button'} onPress={props.onPress} title="Close" />
        </View>

    );
};

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
});

export default ModelContent;