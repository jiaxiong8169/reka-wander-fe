import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

TouchableOpacity.defaultProps = { activeOpacity: 0.7 };

const RoundButton = ({ onPress, title, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[
        styles.button,
        backgroundColor && { backgroundColor }
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button:{
        padding: 13,
        borderRadius: 20,
        width: '80%',
        alignSelf: 'center'
    },
    buttonText:{
        color: 'white',
        textAlign: 'center'
    }
});
export default RoundButton;